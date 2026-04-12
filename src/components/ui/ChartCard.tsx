interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard = ({ title, subtitle, children, className = '' }: ChartCardProps) => (
  <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-4 ${className}`}>
    <div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
    {children}
  </div>
);

export default ChartCard;