import TODO_ACTIONS from '../redux/actions/TodoActions';

const todosHelper = {

  onAddTodo(todo) {
    const {dispatch} = this.props;

    let add_todo_action = TODO_ACTIONS.add_todo_action(todo);
    dispatch(add_todo_action);
  },

  onTodoClicked(index) {
    console.log('onTodoClicked', index);
  },

  onDeleteActiveTodo(index) {
    const {dispatch} = this.props;

    let delete_active_todo_action = TODO_ACTIONS.delete_active_todo_action(index);
    dispatch(delete_active_todo_action);
  },

  onDeleteCompletedTodo(index) {
    const {dispatch} = this.props;

    let delete_completed_todo_action = TODO_ACTIONS.delete_completed_todo_action(index);
    dispatch(delete_completed_todo_action);
  },

  onEditTodo(index) {
    const {dispatch} = this.props;

    let edit_todo_mode_on_action = TODO_ACTIONS.edit_todo_mode_on_action(index);
    dispatch(edit_todo_mode_on_action);
  },

  onTodoEdited(newText, index) {
    const {dispatch} = this.props;

    let edit_todo_mode_off_action = TODO_ACTIONS.edit_todo_mode_off_action();
    dispatch(edit_todo_mode_off_action);

    let todo_edited_action = TODO_ACTIONS.todo_edited_action(newText, index);
    dispatch(todo_edited_action);
  },

  onTodoCompleted(index) {
    const {dispatch} = this.props;

    let todo_completed_action = TODO_ACTIONS.todo_completed_action(index);
    dispatch(todo_completed_action);

    setTimeout(() => {
      let delete_active_todo_action = TODO_ACTIONS.delete_active_todo_action(index);
      dispatch(delete_active_todo_action);
    }, 300);
  },
}

export default todosHelper;
