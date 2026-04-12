export const formatRelativeTime = (date: Date): string => {
  const now        = new Date();
  const diffMs     = now.getTime() - date.getTime();
  const diffSecs   = Math.floor(diffMs / 1000);
  const diffMins   = Math.floor(diffSecs / 60);
  const diffHours  = Math.floor(diffMins / 60);

  if (diffSecs < 10)  return 'just now';
  if (diffSecs < 60)  return `${diffSecs}s ago`;
  if (diffMins < 60)  return `${diffMins}m ago`;
  return `${diffHours}h ago`;
};

export const formatCurrency = (value: number): string =>
  `₹${value.toLocaleString('en-IN')}`;