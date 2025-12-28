import { useTodos } from '../../hooks/useTodos';
import { TodoItem } from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

export function TodoList() {
  const { todos } = useTodos();

  if (todos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>タスクがありません</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
