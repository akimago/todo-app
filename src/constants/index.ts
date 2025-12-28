import { Priority, FilterType, Category } from '../types/todo';

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低',
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
};

export const FILTER_LABELS: Record<FilterType, string> = {
  all: 'すべて',
  completed: '完了',
  active: '未完了',
};

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: '仕事', color: '#3b82f6' },
  { id: 'personal', name: 'プライベート', color: '#8b5cf6' },
  { id: 'shopping', name: '買い物', color: '#ec4899' },
];

export const STORAGE_KEY = 'todo-app-state';
