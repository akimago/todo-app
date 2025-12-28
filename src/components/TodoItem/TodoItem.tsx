import { useState } from 'react';
import { Todo } from '../../types/todo';
import { useTodos } from '../../hooks/useTodos';
import { formatDueDate, isOverdue } from '../../utils/dateUtils';
import { PRIORITY_LABELS, PRIORITY_COLORS } from '../../constants';
import { PrioritySelect } from '../PrioritySelect/PrioritySelect';
import { CategorySelect } from '../CategorySelect/CategorySelect';
import { DatePicker } from '../DatePicker/DatePicker';
import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
}

export function TodoItem({ todo }: Props) {
  const { dispatch, categories } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate);
  const [editCategoryId, setEditCategoryId] = useState(todo.categoryId);

  const category = categories.find((c) => c.id === todo.categoryId);
  const overdue = todo.dueDate && !todo.completed && isOverdue(todo.dueDate);

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
  };

  const handleDelete = () => {
    if (window.confirm('このタスクを削除しますか？')) {
      dispatch({ type: 'DELETE_TODO', payload: todo.id });
    }
  };

  const handleSave = () => {
    if (!editTitle.trim()) return;

    dispatch({
      type: 'UPDATE_TODO',
      payload: {
        id: todo.id,
        updates: {
          title: editTitle.trim(),
          description: editDescription.trim() || undefined,
          priority: editPriority,
          dueDate: editDueDate,
          categoryId: editCategoryId,
        },
      },
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate);
    setEditCategoryId(todo.categoryId);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={styles.item}>
        <div className={styles.editForm}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className={styles.editInput}
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className={styles.editTextarea}
            placeholder="詳細（任意）"
            rows={2}
          />
          <div className={styles.editOptions}>
            <PrioritySelect value={editPriority} onChange={setEditPriority} />
            <CategorySelect
              categories={categories}
              value={editCategoryId}
              onChange={setEditCategoryId}
            />
            <DatePicker value={editDueDate} onChange={setEditDueDate} />
          </div>
          <div className={styles.editActions}>
            <button onClick={handleSave} className={styles.saveButton}>
              保存
            </button>
            <button onClick={handleCancel} className={styles.cancelButton}>
              キャンセル
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className={styles.checkbox}
      />
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <span className={styles.title}>{todo.title}</span>
        </div>
        {todo.description && (
          <div className={styles.description}>{todo.description}</div>
        )}
        <div className={styles.meta}>
          <span
            className={styles.priority}
            style={{ color: PRIORITY_COLORS[todo.priority] }}
          >
            {PRIORITY_LABELS[todo.priority]}
          </span>
          {category && (
            <span
              className={styles.category}
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </span>
          )}
          {todo.dueDate && (
            <span className={`${styles.dueDate} ${overdue ? styles.overdue : ''}`}>
              {formatDueDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={() => setIsEditing(true)} className={styles.editButton}>
          編集
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          削除
        </button>
      </div>
    </div>
  );
}
