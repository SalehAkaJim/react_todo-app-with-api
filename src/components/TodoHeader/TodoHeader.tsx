import React, { FormEvent, useState } from 'react';
import cn from 'classnames';
import { ErrorMessages } from '../../types/ErrorMessages';

type Props = {
  onError: (value: ErrorMessages | null) => void;
  createTodo: (title: string) => void;
  isInputDisabled: boolean;
  activateToggleAll: boolean;
  setLoadingAll: (value: boolean) => void;
  toggleAll: () => void;
};

export const TodoHeader: React.FC<Props> = ({
  onError,
  createTodo,
  isInputDisabled,
  activateToggleAll,
  setLoadingAll,
  toggleAll,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    const todoName = newTodoTitle.trim();

    if (todoName === '') {
      onError(ErrorMessages.emptyTitle);

      return;
    }

    createTodo(todoName);
    setNewTodoTitle('');
  };

  const handleToggleAll = async () => {
    setLoadingAll(true);
    await toggleAll();
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', { active: activateToggleAll })}
        aria-label="mark all"
        onClick={handleToggleAll}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={addTodo}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          disabled={isInputDisabled}
        />
      </form>
    </header>
  );
};