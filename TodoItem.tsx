import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    } else {
      // If empty, cancel edit or delete? Let's cancel edit and revert
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={`group flex items-center gap-3 p-3 border border-terminal-dim hover:border-terminal-neon transition-colors ${
        todo.completed ? 'opacity-60' : 'opacity-100'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => onToggle(todo.id)}
        className="text-terminal-neon font-bold focus:outline-none whitespace-nowrap"
        aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
      >
        {todo.completed ? '[ V ]' : '[   ]'}
      </button>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full bg-black text-terminal-neon border-none focus:ring-0 p-0 font-mono"
          />
        ) : (
          <span
            className={`block truncate cursor-pointer select-none ${
              todo.completed ? 'line-through text-terminal-dim' : ''
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
        <button
          onClick={() => setIsEditing(true)}
          className="text-xs text-terminal-neon hover:underline px-1"
          disabled={todo.completed}
        >
          [ערוך]
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-xs text-red-500 hover:text-red-400 hover:underline px-1"
        >
          [מחק]
        </button>
      </div>
    </li>
  );
};