import { http, HttpResponse } from 'msw';

const kpis = [
  { id: 'total-leads',      title: 'Total Leads',      value: '2,847', change: 12.4, changeLabel: 'vs last month' },
  { id: 'conversion-rate',  title: 'Conversion Rate',  value: '68.4',  change: 4.2,  changeLabel: 'vs last month', suffix: '%' },
  { id: 'revenue',          title: 'Revenue',          value: '12,40,000', change: 8.1, changeLabel: 'vs last month', prefix: '₹' },
  { id: 'active-campaigns', title: 'Active Campaigns', value: '24',    change: -2,   changeLabel: 'vs last month' },
];

const leads = [
  { id: 'lead-001', name: 'Aarav Shah',     email: 'aarav.shah@techcorp.in',      phone: '+91 98201 11234', status: 'New',       source: 'Website',        assignedTo: 'Prashant Kumar', createdAt: '2024-03-01T09:00:00Z', value: 45000  },
  { id: 'lead-002', name: 'Priya Mehta',    email: 'priya.mehta@designhub.co',    phone: '+91 91234 56789', status: 'Contacted',  source: 'Referral',       assignedTo: 'Prashant Kumar', createdAt: '2024-03-02T10:30:00Z', value: 72000  },
  { id: 'lead-003', name: 'Rohan Verma',    email: 'rohan.v@startupx.io',         phone: '+91 99876 54321', status: 'Converted',  source: 'LinkedIn',       assignedTo: 'Sneha Joshi',    createdAt: '2024-03-03T11:00:00Z', value: 130000 },
  { id: 'lead-004', name: 'Sneha Iyer',     email: 'sneha.iyer@fintech.com',      phone: '+91 87654 32109', status: 'Lost',       source: 'Cold Call',      assignedTo: 'Prashant Kumar', createdAt: '2024-03-04T14:00:00Z', value: 28000  },
  { id: 'lead-005', name: 'Karan Patel',    email: 'karan.patel@retailco.in',     phone: '+91 93456 78901', status: 'New',        source: 'Website',        assignedTo: 'Rahul Singh',    createdAt: '2024-03-05T09:30:00Z', value: 55000  },
  { id: 'lead-006', name: 'Ananya Nair',    email: 'ananya.n@edutech.org',        phone: '+91 88901 23456', status: 'Contacted',  source: 'Email Campaign', assignedTo: 'Sneha Joshi',    createdAt: '2024-03-06T13:00:00Z', value: 38000  },
  { id: 'lead-007', name: 'Vikram Desai',   email: 'vikram.desai@logisticspro.com', phone: '+91 96321 47890', status: 'Converted', source: 'Referral',      assignedTo: 'Prashant Kumar', createdAt: '2024-03-07T10:00:00Z', value: 95000  },
  { id: 'lead-008', name: 'Meera Krishnan', email: 'meera.k@healthplus.in',       phone: '+91 77890 12345', status: 'New',        source: 'LinkedIn',       assignedTo: 'Rahul Singh',    createdAt: '2024-03-08T11:30:00Z', value: 61000  },
  { id: 'lead-009', name: 'Arjun Sharma',   email: 'arjun.sharma@cloudsol.tech',  phone: '+91 94567 89012', status: 'Contacted',  source: 'Website',        assignedTo: 'Prashant Kumar', createdAt: '2024-03-09T15:00:00Z', value: 83000  },
  { id: 'lead-010', name: 'Divya Reddy',    email: 'divya.reddy@mediaco.in',      phone: '+91 82345 67890', status: 'Lost',       source: 'Cold Call',      assignedTo: 'Sneha Joshi',    createdAt: '2024-03-10T09:00:00Z', value: 22000  },
  { id: 'lead-011', name: 'Nikhil Joshi',   email: 'nikhil.j@autoparts.co',       phone: '+91 91230 45678', status: 'New',        source: 'Referral',       assignedTo: 'Rahul Singh',    createdAt: '2024-03-11T10:00:00Z', value: 47000  },
  { id: 'lead-012', name: 'Pooja Gupta',    email: 'pooja.gupta@fashionx.in',     phone: '+91 98765 43210', status: 'Converted',  source: 'Email Campaign', assignedTo: 'Prashant Kumar', createdAt: '2024-03-12T14:30:00Z', value: 110000 },
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
  http.get('*/leads',       () => HttpResponse.json(leads)),
  http.get('*/campaigns',   () => HttpResponse.json(campaigns)),
  http.get('*/leadSources', () => HttpResponse.json(leadSources)),
  http.get('*/leadTrend',   () => HttpResponse.json(leadTrend)),
];