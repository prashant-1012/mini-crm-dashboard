import { http, HttpResponse } from 'msw';

const kpis = [
  { id: 'total-leads',      title: 'Total Leads',      value: '2,847', change: 12.4, changeLabel: 'vs last month' },
  { id: 'conversion-rate',  title: 'Conversion Rate',  value: '68.4',  change: 4.2,  changeLabel: 'vs last month', suffix: '%' },
  { id: 'revenue',          title: 'Revenue',          value: '12,40,000', change: 8.1, changeLabel: 'vs last month', prefix: '₹' },
  { id: 'active-campaigns', title: 'Active Campaigns', value: '24',    change: -2,   changeLabel: 'vs last month' },
];


const campaigns = [
  { id: 'camp-001', name: 'Summer Sale',     status: 'Active',    leads: 320, converted: 87,  spent: 45000, revenue: 182000 },
  { id: 'camp-002', name: 'Product Launch',  status: 'Active',    leads: 514, converted: 203, spent: 98000, revenue: 410000 },
  { id: 'camp-003', name: 'Brand Awareness', status: 'Paused',    leads: 178, converted: 34,  spent: 32000, revenue: 76000  },
  { id: 'camp-004', name: 'Referral Drive',  status: 'Completed', leads: 267, converted: 119, spent: 18000, revenue: 263000 },
  { id: 'camp-005', name: 'Email Blast Q1',  status: 'Completed', leads: 412, converted: 156, spent: 12000, revenue: 318000 },
];

const leadSources = [
  { source: 'Website',        count: 430 },
  { source: 'Referral',       count: 280 },
  { source: 'LinkedIn',       count: 195 },
  { source: 'Email Campaign', count: 167 },
  { source: 'Cold Call',      count: 98  },
];

const leadTrend = [
  { month: 'Oct', newLeads: 112, converted: 38 },
  { month: 'Nov', newLeads: 145, converted: 52 },
  { month: 'Dec', newLeads: 98,  converted: 41 },
  { month: 'Jan', newLeads: 167, converted: 63 },
  { month: 'Feb', newLeads: 203, converted: 88 },
  { month: 'Mar', newLeads: 178, converted: 74 },
];

// http.get tells MSW: "intercept GET requests to this URL
// and return this response instead of hitting a real server"
export const handlers = [
  http.get('*/kpis',        () => HttpResponse.json(kpis)),
  http.get('*/campaigns',   () => HttpResponse.json(campaigns)),
  http.get('*/leadSources', () => HttpResponse.json(leadSources)),
  http.get('*/leadTrend',   () => HttpResponse.json(leadTrend)),
];