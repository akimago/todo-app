import { useState, FormEvent } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { Priority } from '../../types/todo';
import { PrioritySelect } from '../PrioritySelect/PrioritySelect';
import { CategorySelect } from '../CategorySelect/CategorySelect';
import { DatePicker } from '../DatePicker/DatePicker';
import styles from './TodoForm.module.css';

export function TodoForm() {
  const { dispatch, categories } = useTodos();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch({
      type: 'ADD_TODO',
      payload: {
        title: title.trim(),
        description: description.trim() || undefined,
        completed: false,
        priority,
        categoryId,
        dueDate,
      },
    });

    // フォームリセット
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategoryId(null);
    setDueDate(null);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="タスクを入力..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="詳細（任意）"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          rows={2}
        />
      </div>
      <div className={styles.options}>
        <PrioritySelect value={priority} onChange={setPriority} />
        <CategorySelect
          categories={categories}
          value={categoryId}
          onChange={setCategoryId}
        />
        <DatePicker value={dueDate} onChange={setDueDate} />
      </div>
      <button type="submit" className={styles.button}>
        追加
      </button>
    </form>
  );
}
