import config from '../../config';
import Todo from '../../models/Todo';

const actions = config.todos.actions;

export function addTodo(text) {
  return {
    type: actions.add_todo,
    payload: new Todo({undefined ,text})
  };
};

export function deleteActiveTodo(index) {
  return {
    type: actions.delete_active_todo,
    payload: index
  };
};

export function deleteCompletedTodo(index) {
  return {
    type: actions.delete_completed_todo,
    payload: index
  };
};

export function completeTodo(index) {
  return {
    type: actions.complete_todo,
    payload: {index}
  };
};
