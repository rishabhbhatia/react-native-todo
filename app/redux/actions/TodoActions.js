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
  }
}

export default TODO_ACTIONS;
