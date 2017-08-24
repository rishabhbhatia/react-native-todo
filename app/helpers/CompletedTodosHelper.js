import COMPLETED_TODO_ACTIONS from '../redux/actions/CompletedTodoActions';

const completedTodosHelper = {

  onDeleteTodo(index) {
    const {dispatch} = this.props;

    let todo_delete_action = COMPLETED_TODO_ACTIONS.delete_todo_action(index);
    dispatch(todo_delete_action);
  },

}

export default completedTodosHelper;
