import React, { useState, useEffect } from 'react';
import { Todo, FilterType } from './types';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoStats } from './components/TodoStats';

const App: React.FC = () => {
  // Initialize state from localStorage safely
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        return JSON.parse(savedTodos);
      }
    } catch (e) {
      console.error("Failed to load todos from localStorage", e);
    }
    return [];
  });

  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);

  // Persistence effect with error handling
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (e) {
      console.error("Failed to save todos to localStorage", e);
    }
  }, [todos]);

  const generateId = () => {
    // Fallback for environments where crypto.randomUUID might not be available
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: generateId(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === FilterType.ACTIVE) return !todo.completed;
    if (filter === FilterType.COMPLETED) return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl border-2 border-terminal-neon p-6 relative shadow-[0_0_10px_rgba(0,255,0,0.1)]">
        {/* Terminal Header Decoration */}
        <div className="absolute top-0 left-0 bg-terminal-neon text-terminal-bg px-2 py-1 text-xs font-bold border-b-2 border-r-2 border-terminal-neon">
          SYS.TODO.EXE
        </div>
        
        <h1 className="text-4xl font-bold text-center text-terminal-neon mb-8 mt-4 tracking-wider uppercase">
          מנהל משימות v1.0
        </h1>

        <div className="space-y-6">
          <TodoForm onAdd={handleAddTodo} />
          
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
          
          <TodoStats
            activeCount={activeCount}
            currentFilter={filter}
            onFilterChange={setFilter}
            onClearCompleted={handleClearCompleted}
            hasCompleted={todos.some(t => t.completed)}
          />
        </div>
      </div>
      
      <footer className="mt-8 text-terminal-dim text-xs">
        &copy; 2024 TERMINAL_SYSTEMS // REACT_CORE_DETECTED
      </footer>
    </div>
  );
};

export default App;