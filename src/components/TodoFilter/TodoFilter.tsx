import { useTodos } from '../../hooks/useTodos';
import { FilterType } from '../../types/todo';
import { FILTER_LABELS } from '../../constants';
import styles from './TodoFilter.module.css';

export function TodoFilter() {
  const { filter, selectedCategoryId, searchQuery, categories, stats, dispatch } = useTodos();

  const filterTypes: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className={styles.container}>
      {/* 検索 */}
      <div className={styles.searchRow}>
        <input
          type="text"
          placeholder="検索..."
          value={searchQuery}
          onChange={(e) =>
            dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
          }
          className={styles.searchInput}
        />
      </div>

      {/* フィルター */}
      <div className={styles.filterRow}>
        {/* 状態フィルター */}
        <div className={styles.filterButtons}>
          {filterTypes.map((type) => (
            <button
              key={type}
              className={`${styles.filterButton} ${filter === type ? styles.active : ''}`}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: type })}
            >
              {FILTER_LABELS[type]}
            </button>
          ))}
        </div>

        {/* カテゴリフィルター */}
        <select
          value={selectedCategoryId || ''}
          onChange={(e) =>
            dispatch({
              type: 'SET_CATEGORY_FILTER',
              payload: e.target.value || null,
            })
          }
          className={styles.categorySelect}
        >
          <option value="">すべてのカテゴリ</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* 統計 */}
      <div className={styles.stats}>
        <span className={styles.stat}>全体: {stats.total}</span>
        <span className={styles.stat}>完了: {stats.completed}</span>
        <span className={styles.stat}>未完了: {stats.active}</span>
        {stats.overdue > 0 && (
          <span className={`${styles.stat} ${styles.overdue}`}>期限切れ: {stats.overdue}</span>
        )}
      </div>
    </div>
  );
}
