import { useContext, useMemo } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { filterTodos } from '../utils/todoFilters';

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  const { state, dispatch } = context;

  // フィルタリング済みTODOリスト
  const filteredTodos = useMemo(() => {
    return filterTodos(
      state.todos,
      state.filter,
      state.selectedCategoryId,
      state.searchQuery
    );
  }, [state.todos, state.filter, state.selectedCategoryId, state.searchQuery]);

  // 統計情報
  const stats = useMemo(() => ({
    total: state.todos.length,
    completed: state.todos.filter((t) => t.completed).length,
    active: state.todos.filter((t) => !t.completed).length,
    overdue: state.todos.filter((t) => {
      if (!t.dueDate || t.completed) return false;
      return new Date(t.dueDate) < new Date();
    }).length,
  }), [state.todos]);

  return {
    todos: filteredTodos,
    allTodos: state.todos,
    categories: state.categories,
    filter: state.filter,
    selectedCategoryId: state.selectedCategoryId,
    searchQuery: state.searchQuery,
    stats,
    dispatch,
  };
}
