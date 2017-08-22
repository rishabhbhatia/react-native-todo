// Define actions to be performed on a Todo

var TODO_ACTIONS = {
  add_todo: 'ADD_TODO',
  add_todo_action(todo) {
    return {
      type: this.add_todo,
      payload: todo
    };
  },
}

export default TODO_ACTIONS;
