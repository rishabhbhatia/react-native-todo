import Todo from '../../models/Todo'

const TODO_ACTIONS = {
  add_todo: 'ADD_TODO',
  add_todo_action(text) {
    return {
      type: this.add_todo,
      payload: new Todo(text)
    };
  },
  delete_active_todo: 'DELETE_ACTIVE_TODO',
  delete_active_todo_action(index) {
    return {
      type: this.delete_active_todo,
      payload: index
    };
  },
  delete_completed_todo: 'DELETE_COMPLETED_TODO',
  delete_completed_todo_action(index) {
    return {
      type: this.delete_completed_todo,
      payload: index
    };
  },
  edit_todo_mode_on: 'EDIT_TODO_MODE_ON',
  edit_todo_mode_on_action(index) {
    return {
      type: this.edit_todo_mode_on,
      payload: {index}
    };
  },
  edit_todo_mode_off: 'EDIT_TODO_MODE_OFF',
  edit_todo_mode_off_action() {
    return {
      type: this.edit_todo_mode_off,
      payload: {index: -1}
    };
  },
  todo_edited: 'TODO_EDITED',
  todo_edited_action(newText, index) {
    return {
      type: this.todo_edited,
      payload: { newText, index}
    };
  },
  todo_completed: 'TODO_COMPLETED',
  todo_completed_action(index) {
    return {
      type: this.todo_completed,
      payload: {index}
    };
  },
}

export default TODO_ACTIONS;
