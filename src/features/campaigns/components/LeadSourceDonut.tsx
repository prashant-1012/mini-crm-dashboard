import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { LeadSourceData } from '../campaignsTypes';
import ChartTooltip from '../../../components/ui/ChartTooltip';
import ChartCard from '../../../components/ui/ChartCard';

interface LeadSourceDonutProps {
  data: LeadSourceData[];
  isLoading: boolean;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

const DonutSkeleton = () => (
  <div className="h-72 flex items-center justify-center">
    <div className="w-44 h-44 rounded-full border-[24px] border-gray-200 dark:border-gray-700 animate-pulse" />
  </div>
);

const LeadSourceDonut = ({ data, isLoading }: LeadSourceDonutProps) => {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <ChartCard
      title="Lead Source Breakdown"
      subtitle={isLoading ? '' : `${total.toLocaleString('en-IN')} total leads`}
    >
      {isLoading ? (
        <DonutSkeleton />
      ) : (
        <ResponsiveContainer width="100%" height={288}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="source"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default LeadSourceDonut;