import Todo from '../../models/Todo'

const ACTIVE_TODO_ACTIONS = {
  add_todo: 'ADD_TODO_ACTIVE',
  add_todo_action(text) {
    return {
      type: this.add_todo,
      payload: new Todo(text)
    };
  },
  delete_todo: 'DELETE_TODO_ACTIVE',
  delete_todo_action(index) {
    return {
      type: this.delete_todo,
      payload: index
    };
  },
  edit_todo_mode_on: 'EDIT_TODO_MODE_ON_ACTIVE',
  edit_todo_mode_on_action(index) {
    return {
      type: this.edit_todo_mode_on,
      payload: {index}
    };
  },
  edit_todo_mode_off: 'EDIT_TODO_MODE_OFF_ACTIVE',
  edit_todo_mode_off_action() {
    return {
      type: this.edit_todo_mode_off,
      payload: {index: -1}
    };
  },
  todo_edited: 'TODO_EDITED_ACTIVE',
  todo_edited_action(newText, index) {
    return {
      type: this.todo_edited,
      payload: { newText, index}
    };
  },
  todo_completion_toggled: 'TODO_COMPLETION_TOGGLED_ACTIVE',
  todo_completion_toggled_action(index) {
    return {
      type: this.todo_completion_toggled,
      payload: {index}
    };
  },
}

export default ACTIVE_TODO_ACTIONS;
