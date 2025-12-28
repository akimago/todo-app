import { Category } from '../../types/todo';
import styles from './CategorySelect.module.css';

interface Props {
  categories: Category[];
  value: string | null;
  onChange: (categoryId: string | null) => void;
}

export function CategorySelect({ categories, value, onChange }: Props) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>カテゴリ:</label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className={styles.select}
      >
        <option value="">なし</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
