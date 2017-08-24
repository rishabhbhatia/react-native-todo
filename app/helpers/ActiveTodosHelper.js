import ACTIVE_TODO_ACTIONS from '../redux/actions/ActiveTodoActions';

const activeTodosHelper = {

  onAddTodo(todo) {
    const {dispatch} = this.props;

    let add_todo_action = ACTIVE_TODO_ACTIONS.add_todo_action(todo);
    dispatch(add_todo_action);
  },

  onTodoClicked(index) {
    console.log('onTodoClicked', index);
  },

  onDeleteTodo(index) {
    const {dispatch} = this.props;

    let todo_delete_action = ACTIVE_TODO_ACTIONS.delete_todo_action(index);
    dispatch(todo_delete_action);
  },

  onEditTodo(index) {
    const {dispatch} = this.props;

    let edit_todo_mode_on_action = ACTIVE_TODO_ACTIONS.edit_todo_mode_on_action(index);
    dispatch(edit_todo_mode_on_action);
  },

  onTodoEdited(newText, index) {
    const {dispatch} = this.props;

    let edit_todo_mode_off_action = ACTIVE_TODO_ACTIONS.edit_todo_mode_off_action();
    dispatch(edit_todo_mode_off_action);

    let todo_edited_action = ACTIVE_TODO_ACTIONS.todo_edited_action(newText, index);
    dispatch(todo_edited_action);
  },

  onTodoCompletionToggled(index) {
    console.log('onTodoCompletionToggled:', this.props);
    const {dispatch} = this.props;

    let todo_completion_toggled_action = ACTIVE_TODO_ACTIONS.todo_completion_toggled_action(index);
    dispatch(todo_completion_toggled_action);
  },
}

export default activeTodosHelper;
