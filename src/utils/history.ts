import type { ReportData } from './reportGenerator';

const STORAGE_KEY = 'astro-review-history';

export function saveReport(report: ReportData): void {
  const history = getReports();
  history.unshift(report);
  if (history.length > 50) history.length = 50;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getReports(): ReportData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function deleteReport(id: string): void {
  const history = getReports().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
