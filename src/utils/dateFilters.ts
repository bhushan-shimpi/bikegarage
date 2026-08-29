export type DateFilterType = 'all' | 'today' | 'yesterday' | 'this_week' | 'this_month' | 'custom';

export const filterRecordByDate = (
  recordDate: string | undefined,
  filterType: DateFilterType,
  customDate?: string
): boolean => {
  if (filterType === 'all') return true;
  if (!recordDate) return false;

  const recDateStr = recordDate.slice(0, 10);
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  if (filterType === 'today') {
    return recDateStr === todayStr;
  }

  if (filterType === 'yesterday') {
    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    const yestStr = `${yest.getFullYear()}-${pad(yest.getMonth() + 1)}-${pad(yest.getDate())}`;
    return recDateStr === yestStr;
  }

  if (filterType === 'this_week') {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = `${weekAgo.getFullYear()}-${pad(weekAgo.getMonth() + 1)}-${pad(weekAgo.getDate())}`;
    return recDateStr >= weekAgoStr && recDateStr <= todayStr;
  }

  if (filterType === 'this_month') {
    const monthPrefix = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
    return recDateStr.startsWith(monthPrefix);
  }

  if (filterType === 'custom' && customDate) {
    return recDateStr === customDate;
  }

  return true;
};
