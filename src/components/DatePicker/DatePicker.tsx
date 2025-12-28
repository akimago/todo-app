import styles from './DatePicker.module.css';

interface Props {
  value: string | null;
  onChange: (date: string | null) => void;
}

export function DatePicker({ value, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    onChange(dateValue ? `${dateValue}T00:00:00.000Z` : null);
  };

  const inputValue = value ? value.split('T')[0] : '';

  return (
    <div className={styles.container}>
      <label className={styles.label}>期限:</label>
      <input
        type="date"
        value={inputValue}
        onChange={handleChange}
        className={styles.input}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className={styles.clearButton}
        >
          ×
        </button>
      )}
    </div>
  );
}
