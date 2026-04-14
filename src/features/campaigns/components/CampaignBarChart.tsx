import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { Campaign } from '../campaignsTypes';
import ChartTooltip from '../../../components/ui/ChartTooltip';
import ChartCard from '../../../components/ui/ChartCard';

interface CampaignBarChartProps {
  data: Campaign[];
  isLoading: boolean;
}

// Skeleton placeholder shown while data loads
const BarChartSkeleton = () => (
  <div className="h-72 flex items-end gap-3 px-4">
    {[60, 90, 45, 75, 55].map((h, i) => (
      <div
        key={i}
        className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-t animate-pulse"
        style={{ height: `${h}%` }}
      />
    ))}
  </div>
);

const CampaignBarChart = ({ data, isLoading }: CampaignBarChartProps) => (
  <ChartCard
    title="Campaign Performance"
    subtitle="Leads generated vs conversions per campaign"
  >
    {isLoading ? (
      <BarChartSkeleton />
    ) : (
      <div className="h-52 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4} barCategoryGap="30%">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'transparent' }} />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }}
            />
            <Bar dataKey="leads"     name="Leads"      fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="converted" name="Converted"  fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}
  </ChartCard>
);

export default CampaignBarChart;