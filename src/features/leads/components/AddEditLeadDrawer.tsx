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

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
        className={`fixed inset-0 bg-black/60 transition-opacity z-[9999] backdrop-blur-sm ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-xl bg-white dark:bg-gray-900 shadow-2xl z-[10000] transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {initialData ? 'Edit Lead' : 'Create New Lead'}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {initialData ? 'Update lead information and status' : 'Fill in the details to add a new sales lead'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all rounded-lg hover:shadow-md active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Name */}
              <div className="col-span-1">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Full Name
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  className={`w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-4 transition-all ${
                    errors.name ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500/10 focus:border-blue-500'
                  }`}
                  placeholder="e.g. Rahul Sharma"
                />
                {errors.name && <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="col-span-1">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
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
                  className={`w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-4 transition-all ${
                    errors.email ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500/10 focus:border-blue-500'
                  }`}
                  placeholder="name@company.com"
                />
                {errors.email && <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.email.message}</p>}
              </div>

              {/* Contact */}
              <div className="col-span-1">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Contact Number
                </label>
                <input
                  {...register('phone', { required: 'Phone number is required' })}
                  type="tel"
                  className={`w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-4 transition-all ${
                    errors.phone ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500/10 focus:border-blue-500'
                  }`}
                  placeholder="+91 98XXX XXXXX"
                />
                {errors.phone && <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.phone.message}</p>}
              </div>

              {/* Value */}
              <div className="col-span-1">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Expected Value (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">₹</span>
                  <input
                    {...register('value', { required: 'Value is required', min: { value: 1, message: 'Value must be greater than 0' } })}
                    type="number"
                    className={`w-full pl-7 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-4 transition-all ${
                      errors.value ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500/10 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.value && <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.value.message}</p>}
              </div>
            </div>

            {/* Status Tags - Full Width */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Lead Status
              </label>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {STATUSES.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setValue('status', status)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 flex items-center justify-center gap-1.5 flex-1 sm:flex-none ${
                      currentStatus === status
                        ? `${STATUS_COLORS[status]} ring-2 ${STATUS_COLORS[status].split(' ')[0].replace('bg-', 'ring-')}/20`
                        : 'bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      status === 'New' ? 'bg-blue-500' : 
                      status === 'Contacted' ? 'bg-amber-500' : 
                      status === 'Converted' ? 'bg-emerald-500' : 'bg-red-500'
                    }`} />
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-2">
              {/* Source Dropdown */}
              <div className="col-span-1">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Lead Source
                </label>
                <div className="relative">
                  <select
                    {...register('source')}
                    className="w-full appearance-none px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    {SOURCES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Assigned To Dropdown */}
              <div className="col-span-1">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Assigned To
                </label>
                <div className="relative">
                  <select
                    {...register('assignedTo')}
                    className="w-full appearance-none px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    {ASSIGNEES.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 flex justify-end gap-3 rounded-b-xl sm:rounded-none">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
            >
              Discard
            </button>
            <button
              onClick={handleSubmit(handleFormSubmit)}
              className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md shadow-blue-500/20 transition-all active:scale-95"
            >
              {initialData ? 'Save Changes' : 'Create Lead'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditLeadDrawer;
