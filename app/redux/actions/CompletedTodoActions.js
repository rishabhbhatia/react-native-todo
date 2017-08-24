import Todo from '../../models/Todo'

const COMPLETED_TODO_ACTIONS = {
  delete_todo: 'DELETE_TODO_COMPLETED',
  delete_todo_action(index) {
    return {
      type: this.delete_todo,
      payload: index
    };
  },
}

export default COMPLETED_TODO_ACTIONS;
