import React from 'react';
import { FilterType } from '../types';

interface TodoStatsProps {
  activeCount: number;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

export const TodoStats: React.FC<TodoStatsProps> = ({
  activeCount,
  currentFilter,
  onFilterChange,
  onClearCompleted,
  hasCompleted,
}) => {
  return (
    <div className="border-t-2 border-terminal-dim pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
      <div className="text-terminal-dim">
        <span>{activeCount}</span> משימות נותרו
      </div>

      <div className="flex gap-2">
        <FilterButton
          label="הכל"
          isActive={currentFilter === FilterType.ALL}
          onClick={() => onFilterChange(FilterType.ALL)}
        />
        <FilterButton
          label="לביצוע"
          isActive={currentFilter === FilterType.ACTIVE}
          onClick={() => onFilterChange(FilterType.ACTIVE)}
        />
        <FilterButton
          label="הושלם"
          isActive={currentFilter === FilterType.COMPLETED}
          onClick={() => onFilterChange(FilterType.COMPLETED)}
        />
      </div>

      <div className="w-full sm:w-auto text-left sm:text-right">
        {hasCompleted && (
          <button
            onClick={onClearCompleted}
            className="text-red-500 hover:text-red-400 text-xs uppercase tracking-wider hover:underline"
          >
            [ נקה שהושלמו ]
          </button>
        )}
      </div>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 border transition-all duration-200 ${
        isActive
          ? 'border-terminal-neon text-terminal-neon bg-terminal-neon/10'
          : 'border-transparent text-terminal-dim hover:text-terminal-text hover:border-terminal-dim'
      }`}
    >
      {label}
    </button>
  );
};