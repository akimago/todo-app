import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { TodoState, TodoAction, Todo } from '../types/todo';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { DEFAULT_CATEGORIES, STORAGE_KEY } from '../constants';

// 初期状態
const initialState: TodoState = {
  todos: [],
  categories: DEFAULT_CATEGORIES,
  filter: 'all',
  selectedCategoryId: null,
  searchQuery: '',
};

// Reducer関数
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { ...state, todos: [...state.todos, newTodo] };
    }

    case 'UPDATE_TODO': {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : todo
        ),
      };
    }

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
            : todo
        ),
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_CATEGORY_FILTER':
      return { ...state, selectedCategoryId: action.payload };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'ADD_CATEGORY': {
      const newCategory = {
        id: crypto.randomUUID(),
        ...action.payload,
      };
      return { ...state, categories: [...state.categories, newCategory] };
    }

    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.payload),
        todos: state.todos.map((todo) =>
          todo.categoryId === action.payload ? { ...todo, categoryId: null } : todo
        ),
      };

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
}

// Context定義
interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Provider コンポーネント
export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // 初回読み込み
  useEffect(() => {
    const savedState = loadFromStorage<TodoState>(STORAGE_KEY);
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: savedState });
    }
  }, []);

  // 状態変更時に保存
  useEffect(() => {
    saveToStorage(STORAGE_KEY, state);
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
