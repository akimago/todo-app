import { Priority } from '../../types/todo';
import { PRIORITY_LABELS } from '../../constants';
import styles from './PrioritySelect.module.css';

interface Props {
  value: Priority;
  onChange: (priority: Priority) => void;
}

export function PrioritySelect({ value, onChange }: Props) {
  const priorities: Priority[] = ['high', 'medium', 'low'];

  return (
    <div className={styles.container}>
      <label className={styles.label}>優先度:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Priority)}
        className={styles.select}
      >
        {priorities.map((priority) => (
          <option key={priority} value={priority}>
            {PRIORITY_LABELS[priority]}
          </option>
        ))}
      </select>
    </div>
  );
}
