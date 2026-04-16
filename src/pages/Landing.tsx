import { Link } from 'react-router-dom';
import {
  Shield,
  CheckCircle,
  Lock,
  Zap,
  ArrowRight,
  Star,
  FileSearch,
  TrendingUp,
} from 'lucide-react';
import Navbar from '../components/Navbar';

const features = [
  {
    icon: Shield,
    title: 'Verified Inspectors',
    description:
      'Every report is created by a certified and background-checked property inspector.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Lock,
    title: 'Secure Purchase',
    description:
      'Your transactions are encrypted and protected. Your data stays private.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Zap,
    title: 'Instant Access',
    description:
      'Download your purchased reports immediately after payment. No waiting.',
    color: 'bg-amber-50 text-amber-600',
  },
];

const stats = [
  { value: '2,400+', label: 'Reports Sold' },
  { value: '180+', label: 'Verified Inspectors' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '50+', label: 'Cities Covered' },
];

const testimonials = [
  {
    name: 'Jennifer M.',
    role: 'First-time Homebuyer',
    text: 'SureReport saved me from purchasing a property with significant foundation issues. The detailed report was worth every penny.',
    stars: 5,
  },
  {
    name: 'Robert K.',
    role: 'Real Estate Investor',
    text: 'I use SureReport for every acquisition. The quality of inspection reports is consistently excellent.',
    stars: 5,
  },
  {
    name: 'Emily T.',
    role: 'Property Developer',
    text: 'Reliable, fast, and professional. The marketplace makes finding the right report effortless.',
    stars: 5,
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <CheckCircle className="w-4 h-4" />
              Trusted by 10,000+ property buyers
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
              Buy Verified Property{' '}
              <span className="text-blue-600">Reports</span>{' '}
              Instantly
            </h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed">
              Access comprehensive, inspector-certified property reports before you buy.
              Make informed decisions with complete transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/marketplace"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5"
              >
                Browse Reports
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-base border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
              >
                <FileSearch className="w-4 h-4" />
                List Your Reports
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Choose SureReport?
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              The smarter way to evaluate properties before investing.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${f.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500 text-lg">Three simple steps to property clarity.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Browse the Marketplace',
                desc: 'Search reports by location, property type, or price range.',
                icon: FileSearch,
              },
              {
                step: '02',
                title: 'Purchase a Report',
                desc: 'Securely buy any report for a flat fee of $500.',
                icon: Lock,
              },
              {
                step: '03',
                title: 'Make Informed Decisions',
                desc: 'Download the full report and invest with confidence.',
                icon: TrendingUp,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative text-center">
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-blue-400 tracking-widest">STEP {item.step}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What Our Users Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make Smarter Property Decisions?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of buyers and inspectors on the SureReport platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              Browse Reports
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-bold text-gray-900">
                Sure<span className="text-blue-600">Report</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              &copy; 2024 SureReport Marketplace. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
