import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, FileUp, MapPin, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const PROPERTY_TYPES = ['Residential', 'Commercial', 'Industrial', 'Land'] as const;

const PLACEHOLDER_IMAGES = [
  'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export default function UploadReport() {
  const { currentUser, uploadReport } = useApp();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [form, setForm] = useState({
    address: '',
    city: '',
    state: '',
    propertyType: 'Residential' as typeof PROPERTY_TYPES[number],
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.address.trim()) e.address = 'Property address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state.trim()) e.state = 'State is required';
    if (!form.description.trim() || form.description.length < 20)
      e.description = 'Description must be at least 20 characters';
    if (!fileSelected) e.file = 'Please select a PDF file';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const randomImage = PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)];
    uploadReport({
      address: form.address,
      city: form.city,
      state: form.state,
      propertyType: form.propertyType,
      description: form.description,
      price: 500,
      inspectorId: currentUser!.id,
      inspectorName: currentUser!.name,
      image: randomImage,
    });
    setSubmitted(true);
    setTimeout(() => navigate('/inspector/reports'), 2000);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Report Submitted!</h2>
          <p className="text-gray-500 text-sm">
            Your report has been submitted for admin review. It will appear in the marketplace once approved.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
            <CheckCircle className="w-3.5 h-3.5" />
            Status: Pending Approval
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload New Report</h1>
        <p className="text-gray-500 text-sm mt-1">
          Submit a verified property inspection report to the marketplace
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-blue-800">Earn $450 per sale</p>
          <p className="text-xs text-blue-600 mt-0.5">
            Reports are reviewed within 24 hours. You earn $450 for every purchase of your approved report.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                Property Address
              </span>
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="e.g. 123 Main Street"
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.address ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="e.g. Austin"
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.city ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                placeholder="e.g. TX"
                maxLength={2}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.state ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-gray-400" />
                Property Type
              </span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm({ ...form, propertyType: type })}
                  className={`py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all duration-150 ${
                    form.propertyType === type
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the property and what the inspection covers (at least 20 characters)"
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
            />
            <div className="flex justify-between mt-1">
              {errors.description ? (
                <p className="text-xs text-red-500">{errors.description}</p>
              ) : (
                <span />
              )}
              <p className="text-xs text-gray-400">{form.description.length} chars</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload PDF Report</label>
            <label
              className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                fileSelected
                  ? 'border-emerald-400 bg-emerald-50'
                  : errors.file
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setFileSelected(e.target.files !== null && e.target.files.length > 0)}
              />
              {fileSelected ? (
                <>
                  <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
                  <p className="text-sm font-medium text-emerald-700">File selected</p>
                  <p className="text-xs text-emerald-500 mt-0.5">Ready to submit</p>
                </>
              ) : (
                <>
                  <FileUp className="w-8 h-8 text-gray-300 mb-2" />
                  <p className="text-sm font-medium text-gray-600">Click to upload PDF</p>
                  <p className="text-xs text-gray-400 mt-0.5">PDF files only, max 50MB</p>
                </>
              )}
            </label>
            {errors.file && <p className="text-xs text-red-500 mt-1">{errors.file}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-150 shadow-sm"
          >
            <Upload className="w-4 h-4" />
            Submit Report for Review
          </button>
        </form>
      </div>
    </div>
  );
}
