import { TodoProvider } from '../../contexts/TodoContext';
import { TodoForm } from '../TodoForm/TodoForm';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import { TodoList } from '../TodoList/TodoList';
import styles from './TodoApp.module.css';

export function TodoApp() {
  return (
    <TodoProvider>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>TODO App</h1>
        </header>
        <main className={styles.main}>
          <TodoForm />
          <TodoFilter />
          <TodoList />
        </main>
      </div>
    </TodoProvider>
  );
}
