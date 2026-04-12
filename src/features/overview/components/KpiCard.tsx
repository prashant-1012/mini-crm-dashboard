import type { KpiCard as KpiCardType } from '../overviewTypes';

interface KpiCardProps {
  data: KpiCardType;
}

const TrendIndicator = ({ change }: { change: number }) => {
  const isPositive = change >= 0;
  return (
    <div className={['flex items-center gap-1 text-sm font-medium', isPositive ? 'text-emerald-500' : 'text-red-500'].join(' ')}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width={16} height={16} className={isPositive ? '' : 'rotate-180'}>
        <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
      </svg>
      <span>{Math.abs(change)}%</span>
    </div>
  );
};

const KpiCard = ({ data }: KpiCardProps) => {
  const { title, value, change, changeLabel, prefix, suffix } = data;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-4 hover:shadow-md dark:hover:shadow-gray-800 transition-shadow duration-200">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
        {prefix && <span className="text-xl font-semibold text-gray-500 dark:text-gray-400 mr-1">{prefix}</span>}
        {value}
        {suffix && <span className="text-xl font-semibold text-gray-500 dark:text-gray-400 ml-1">{suffix}</span>}
      </p>
      <div className="flex items-center gap-2">
        <TrendIndicator change={change} />
        <span className="text-sm text-gray-400 dark:text-gray-500">{changeLabel}</span>
      </div>
    </div>
  );
};

export default KpiCard;