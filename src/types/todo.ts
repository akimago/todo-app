// 優先度
export type Priority = 'high' | 'medium' | 'low';

// フィルター種別
export type FilterType = 'all' | 'completed' | 'active';

// カテゴリ
export interface Category {
  id: string;
  name: string;
  color: string;
}

// TODOアイテム
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  categoryId: string | null;
  dueDate: string | null;  // ISO 8601形式
  createdAt: string;
  updatedAt: string;
}

// 新規作成用（idやタイムスタンプは自動生成）
export type TodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

// 更新用（部分更新を許可）
export type TodoUpdate = Partial<Omit<Todo, 'id' | 'createdAt'>>;

// アプリケーション全体の状態
export interface TodoState {
  todos: Todo[];
  categories: Category[];
  filter: FilterType;
  selectedCategoryId: string | null;
  searchQuery: string;
}

// Reducerアクション
export type TodoAction =
  | { type: 'ADD_TODO'; payload: TodoInput }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: TodoUpdate } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_CATEGORY_FILTER'; payload: string | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Omit<Category, 'id'> }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'LOAD_STATE'; payload: TodoState };
