import { Todo, FilterType } from '../types/todo';

export function filterTodos(
  todos: Todo[],
  filter: FilterType,
  categoryId: string | null,
  searchQuery: string
): Todo[] {
  return todos
    .filter((todo) => {
      // 状態フィルター
      if (filter === 'completed' && !todo.completed) return false;
      if (filter === 'active' && todo.completed) return false;
      return true;
    })
    .filter((todo) => {
      // カテゴリフィルター
      if (categoryId && todo.categoryId !== categoryId) return false;
      return true;
    })
    .filter((todo) => {
      // 検索フィルター
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          todo.title.toLowerCase().includes(query) ||
          todo.description?.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      // 優先度でソート（高 > 中 > 低）
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
}
