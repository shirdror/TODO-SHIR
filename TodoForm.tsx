import React, { useState } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="> הזן משימה חדשה..."
        className="flex-1 bg-transparent border-b-2 border-terminal-dim text-terminal-text px-4 py-2 focus:outline-none focus:border-terminal-neon transition-colors placeholder-gray-600"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="border-2 border-terminal-neon text-terminal-neon px-6 py-2 hover:bg-terminal-neon hover:text-terminal-bg transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase font-bold tracking-widest"
      >
        [ הוסף ]
      </button>
    </form>
  );
};