// Define actions to be performed on a Todo

var TODO_ACTIONS = {
  add_todo: 'ADD_TODO',
  add_todo_action(todo) {
    return {
      type: this.add_todo,
      payload: todo
    };
  },
  delete_todo: 'DELETE_TODO',
  delete_todo_action(index) {
    return {
      type: this.delete_todo,
      payload: index
    };
  },
  edit_todo_mode_on: 'EDIT_TODO_MODE_ON',
  edit_todo_mode_on_action(index) {
    return {
      type: this.edit_todo_mode_on,
      payload: { index }
    };
  },
  edit_todo_mode_off: 'EDIT_TODO_MODE_OFF',
  edit_todo_mode_off_action() {
    return {
      type: this.edit_todo_mode_off,
      payload: { index: -1}
    };
  },
  todo_edited: 'TODO_EDITED',
  todo_edited_action(newText, index) {
    return {
      type: this.todo_edited,
      payload: { newText, index}
    };
  },
}

export default TODO_ACTIONS;
