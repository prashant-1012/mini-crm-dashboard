import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Dot,
} from 'recharts';
import type { LeadTrendData } from '../campaignsTypes';
import ChartTooltip from '../../../components/ui/ChartTooltip';
import ChartCard from '../../../components/ui/ChartCard';

interface LeadTrendLineProps {
  data: LeadTrendData[];
  isLoading: boolean;
}

const LineSkeleton = () => (
  <div className="h-72 flex flex-col justify-end gap-2 px-4">
    <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
    <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5" />
    <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/5" />
  </div>
);

const LeadTrendLine = ({ data, isLoading }: LeadTrendLineProps) => (
  <ChartCard
    title="Leads Over Time"
    subtitle="New leads vs conversions — last 6 months"
    className="col-span-full"
  >
    {isLoading ? (
      <LineSkeleton />
    ) : (
      <div className="h-52 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} />
            <Line
              type="monotone"
              dataKey="newLeads"
              name="New Leads"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={<Dot r={4} fill="#3b82f6" />}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="converted"
              name="Converted"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={<Dot r={4} fill="#10b981" />}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
  </ChartCard>
);

export default LeadTrendLine;