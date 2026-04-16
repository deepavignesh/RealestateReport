export type ReportStatus = 'pending' | 'approved' | 'rejected';
export type UserRole = 'buyer' | 'inspector' | 'admin';

export interface Report {
  id: string;
  address: string;
  city: string;
  state: string;
  propertyType: 'Residential' | 'Commercial' | 'Industrial' | 'Land';
  description: string;
  price: number;
  status: ReportStatus;
  inspectorId: string;
  inspectorName: string;
  image: string;
  uploadedAt: string;
  downloads: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string;
  joinedAt: string;
}

export interface Purchase {
  id: string;
  buyerId: string;
  reportId: string;
  purchasedAt: string;
  amount: number;
}

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'buyer@demo.com',
    role: 'buyer',
    password: 'password',
    joinedAt: '2024-01-15',
  },
  {
    id: 'u2',
    name: 'Marcus Williams',
    email: 'inspector@demo.com',
    role: 'inspector',
    password: 'password',
    joinedAt: '2023-11-20',
  },
  {
    id: 'u3',
    name: 'Sarah Chen',
    email: 'admin@demo.com',
    role: 'admin',
    password: 'password',
    joinedAt: '2023-06-01',
  },
  {
    id: 'u4',
    name: 'David Park',
    email: 'david@demo.com',
    role: 'buyer',
    password: 'password',
    joinedAt: '2024-02-10',
  },
  {
    id: 'u5',
    name: 'Linda Torres',
    email: 'linda@demo.com',
    role: 'inspector',
    password: 'password',
    joinedAt: '2023-09-05',
  },
];

export const mockReports: Report[] = [
  {
    id: 'r1',
    address: '142 Oakwood Drive',
    city: 'Austin',
    state: 'TX',
    propertyType: 'Residential',
    description:
      'Comprehensive structural and systems inspection of this 4-bedroom single-family home. Covers foundation, roof, HVAC, electrical, plumbing, and all major systems.',
    price: 500,
    status: 'approved',
    inspectorId: 'u2',
    inspectorName: 'Marcus Williams',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadedAt: '2024-03-01',
    downloads: 12,
  },
  {
    id: 'r2',
    address: '830 Maple Street',
    city: 'Denver',
    state: 'CO',
    propertyType: 'Residential',
    description:
      'Full pre-purchase inspection report for this charming 3-bedroom craftsman. Detailed analysis of all visible and accessible areas including attic and crawl space.',
    price: 500,
    status: 'approved',
    inspectorId: 'u5',
    inspectorName: 'Linda Torres',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadedAt: '2024-03-05',
    downloads: 8,
  },
  {
    id: 'r3',
    address: '2210 Commerce Blvd',
    city: 'Dallas',
    state: 'TX',
    propertyType: 'Commercial',
    description:
      'Professional commercial property inspection covering all structural elements, mechanical systems, fire suppression, ADA compliance, and environmental considerations.',
    price: 500,
    status: 'approved',
    inspectorId: 'u2',
    inspectorName: 'Marcus Williams',
    image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadedAt: '2024-03-08',
    downloads: 5,
  },
  {
    id: 'r4',
    address: '77 Hillcrest Lane',
    city: 'Portland',
    state: 'OR',
    propertyType: 'Residential',
    description:
      'Thorough inspection of this renovated 5-bedroom colonial. Special focus on recent renovation work quality, permits verification, and updated systems assessment.',
    price: 500,
    status: 'approved',
    inspectorId: 'u5',
    inspectorName: 'Linda Torres',
    image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadedAt: '2024-03-10',
    downloads: 15,
  },
  {
    id: 'r5',
    address: '5501 Industrial Park Way',
    city: 'Phoenix',
    state: 'AZ',
    propertyType: 'Industrial',
    description:
      'Industrial facility inspection including loading docks, warehouse structure, electrical capacity, environmental compliance, and mechanical systems review.',
    price: 500,
    status: 'approved',
    inspectorId: 'u2',
    inspectorName: 'Marcus Williams',
    image: 'https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadedAt: '2024-03-12',
    downloads: 3,
  },
  {
    id: 'r6',
    address: '18 Sunset Ridge Road',
    city: 'Nashville',
    state: 'TN',
    propertyType: 'Residential',
    description:
      'New construction inspection for this 2,800 sq ft modern home. Covers framing, insulation, drywall quality, systems installation, and code compliance.',
    price: 500,
    status: 'approved',
    inspectorId: 'u5',
    inspectorName: 'Linda Torres',
    image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadedAt: '2024-03-14',
    downloads: 9,
  },
  {
    id: 'r7',
    address: '340 Greenview Avenue',
    city: 'Charlotte',
    state: 'NC',
    propertyType: 'Residential',
    description:
      'Pre-listing inspection for a well-maintained 3-bedroom townhouse. Comprehensive assessment to identify any issues before going to market.',
    price: 500,
    status: 'pending',
    inspectorId: 'u2',
    inspectorName: 'Marcus Williams',
    image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadedAt: '2024-04-01',
    downloads: 0,
  },
  {
    id: 'r8',
    address: '910 Riverside Court',
    city: 'Miami',
    state: 'FL',
    propertyType: 'Commercial',
    description:
      'Retail space inspection covering structural integrity, electrical systems, plumbing, HVAC, accessibility compliance, and overall condition assessment.',
    price: 500,
    status: 'pending',
    inspectorId: 'u5',
    inspectorName: 'Linda Torres',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadedAt: '2024-04-03',
    downloads: 0,
  },
  {
    id: 'r9',
    address: '225 Pinecrest Drive',
    city: 'Seattle',
    state: 'WA',
    propertyType: 'Land',
    description:
      'Raw land assessment including soil quality, drainage evaluation, environmental hazards review, utility access, and zoning compliance documentation.',
    price: 500,
    status: 'approved',
    inspectorId: 'u2',
    inspectorName: 'Marcus Williams',
    image: 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadedAt: '2024-03-18',
    downloads: 6,
  },
  {
    id: 'r10',
    address: '4820 Harbor View Terrace',
    city: 'San Diego',
    state: 'CA',
    propertyType: 'Residential',
    description:
      'Luxury home inspection for this oceanfront 6-bedroom estate. Detailed evaluation of all premium systems, pool, guest house, and coastal-specific concerns.',
    price: 500,
    status: 'approved',
    inspectorId: 'u5',
    inspectorName: 'Linda Torres',
    image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
    uploadedAt: '2024-03-20',
    downloads: 18,
  },
];

export const mockPurchases: Purchase[] = [
  {
    id: 'p1',
    buyerId: 'u1',
    reportId: 'r1',
    purchasedAt: '2024-03-15',
    amount: 500,
  },
  {
    id: 'p2',
    buyerId: 'u1',
    reportId: 'r4',
    purchasedAt: '2024-03-22',
    amount: 500,
  },
];

export const mockTransactions = mockPurchases.map((p) => {
  const report = mockReports.find((r) => r.id === p.reportId);
  const buyer = mockUsers.find((u) => u.id === p.buyerId);
  return {
    ...p,
    reportAddress: report?.address ?? '',
    buyerName: buyer?.name ?? '',
    inspectorName: report?.inspectorName ?? '',
  };
});
