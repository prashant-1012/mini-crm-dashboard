import { useForm } from 'react-hook-form';
import type { Lead } from '../leadsTypes';
import type { LeadStatus } from '../../../types/api.types';
import { useEffect } from 'react';

interface AddEditLeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Lead) => void;
  initialData?: Lead | null;
}

const SOURCES = ['Website', 'Referral', 'LinkedIn', 'Email Campaign', 'Cold Call'];
const ASSIGNEES = ['Prashant Kumar', 'Sneha Joshi', 'Rahul Singh'];
const STATUSES: LeadStatus[] = ['New', 'Contacted', 'Converted', 'Lost'];

const STATUS_COLORS: Record<LeadStatus, string> = {
  New: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  Contacted: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  Converted: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  Lost: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
};

const AddEditLeadDrawer = ({ isOpen, onClose, onSubmit, initialData }: AddEditLeadDrawerProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Lead>({
    defaultValues: initialData || {
      status: 'New',
      source: 'Website',
      assignedTo: 'Prashant Kumar',
      value: 0,
    },
  });

  const currentStatus = watch('status');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          name: '',
          email: '',
          phone: '',
          value: 0,
          status: 'New',
          source: 'Website',
          assignedTo: 'Prashant Kumar',
        });
      }
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = (data: Lead) => {
    const leadData = {
      ...data,
      id: initialData?.id || `lead-${Date.now()}`,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      value: Number(data.value),
    };
    onSubmit(leadData);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {initialData ? 'Edit Lead' : 'Add New Lead'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Full Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Contact Number
              </label>
              <input
                {...register('phone', { required: 'Phone number is required' })}
                type="tel"
                className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.phone ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Expected Value (₹)
              </label>
              <input
                {...register('value', { required: 'Value is required', min: { value: 1, message: 'Value must be greater than 0' } })}
                type="number"
                className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                  errors.value ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              />
              {errors.value && <p className="mt-1 text-xs text-red-500">{errors.value.message}</p>}
            </div>

            {/* Status Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Lead Status
              </label>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setValue('status', status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      currentStatus === status
                        ? STATUS_COLORS[status]
                        : 'bg-white dark:bg-gray-900 text-gray-500 border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Source Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Lead Source
              </label>
              <select
                {...register('source')}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                {SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Assigned To Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Assigned To
              </label>
              <select
                {...register('assignedTo')}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                {ASSIGNEES.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </form>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(handleFormSubmit)}
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              {initialData ? 'Update Lead' : 'Create Lead'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditLeadDrawer;
