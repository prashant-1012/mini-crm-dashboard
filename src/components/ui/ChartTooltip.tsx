import type { TooltipContentProps } from 'recharts';

// Recharts passes these props to any custom tooltip component.
// ValueType and NameType are Recharts' own generic types for
// the value and name fields in tooltip payload.
type CustomTooltipProps = TooltipContentProps<number, string>;

const ChartTooltip = ({ active, payload, label }: Partial<CustomTooltipProps>) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-sm">
            {label && (
                <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</p>
            )}
            {payload.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span>{entry.name}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {typeof entry.value === 'number'
                            ? entry.value.toLocaleString('en-IN')
                            : entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ChartTooltip;