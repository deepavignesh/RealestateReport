import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  User,
  Report,
  Purchase,
  mockUsers,
  mockReports,
  mockPurchases,
  ReportStatus,
} from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  reports: Report[];
  purchases: Purchase[];
  login: (email: string, password: string, role: 'buyer' | 'inspector' | 'admin') => boolean;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: 'buyer' | 'inspector') => void;
  buyReport: (reportId: string) => void;
  uploadReport: (data: Omit<Report, 'id' | 'status' | 'downloads' | 'uploadedAt'>) => void;
  updateReportStatus: (reportId: string, status: ReportStatus) => void;
  getMyPurchases: () => Purchase[];
  getMyReports: () => Report[];
  lastPurchasedReportId: string | null;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);
  const [lastPurchasedReportId, setLastPurchasedReportId] = useState<string | null>(null);

  const login = (email: string, _password: string, role: 'buyer' | 'inspector' | 'admin'): boolean => {
    const roleDefaults: Record<string, string> = {
      buyer: 'buyer@demo.com',
      inspector: 'inspector@demo.com',
      admin: 'admin@demo.com',
    };
    const targetEmail = email || roleDefaults[role];
    const user = users.find((u) => u.email === targetEmail && u.role === role);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    const fallback = users.find((u) => u.role === role);
    if (fallback) {
      setCurrentUser(fallback);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setLastPurchasedReportId(null);
  };

  const signup = (name: string, email: string, password: string, role: 'buyer' | 'inspector') => {
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      password,
      role,
      joinedAt: new Date().toISOString().split('T')[0],
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const buyReport = (reportId: string) => {
    if (!currentUser) return;
    const alreadyPurchased = purchases.find(
      (p) => p.buyerId === currentUser.id && p.reportId === reportId
    );
    if (alreadyPurchased) {
      setLastPurchasedReportId(reportId);
      return;
    }
    const newPurchase: Purchase = {
      id: `p${Date.now()}`,
      buyerId: currentUser.id,
      reportId,
      purchasedAt: new Date().toISOString().split('T')[0],
      amount: 500,
    };
    setPurchases((prev) => [...prev, newPurchase]);
    setLastPurchasedReportId(reportId);
  };

  const uploadReport = (data: Omit<Report, 'id' | 'status' | 'downloads' | 'uploadedAt'>) => {
    const newReport: Report = {
      ...data,
      id: `r${Date.now()}`,
      status: 'pending',
      downloads: 0,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setReports((prev) => [...prev, newReport]);
  };

  const updateReportStatus = (reportId: string, status: ReportStatus) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status } : r))
    );
  };

  const getMyPurchases = (): Purchase[] => {
    if (!currentUser) return [];
    return purchases.filter((p) => p.buyerId === currentUser.id);
  };

  const getMyReports = (): Report[] => {
    if (!currentUser) return [];
    return reports.filter((r) => r.inspectorId === currentUser.id);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        reports,
        purchases,
        login,
        logout,
        signup,
        buyReport,
        uploadReport,
        updateReportStatus,
        getMyPurchases,
        getMyReports,
        lastPurchasedReportId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
