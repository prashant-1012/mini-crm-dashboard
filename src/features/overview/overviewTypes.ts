// This describes the shape of one KPI card's data.
// Every property is required — TypeScript will error
// if the API returns an object missing any of these.
export interface KpiCard {
  id: string;
  title: string;
  value: string;
  change: number;    // e.g. 12.4 means +12.4%, -3.2 means -3.2%
  changeLabel: string; // e.g. "vs last month"
  prefix?: string;   // optional — e.g. "₹" for revenue
  suffix?: string;   // optional — e.g. "%" for conversion rate
}

// This is the full shape of what the API returns for the overview page.
export interface OverviewState {
  kpis: KpiCard[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}