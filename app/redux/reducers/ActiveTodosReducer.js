import Todo from '../../models/Todo'
import ACTIVE_TODO_ACTIONS from '../actions/ActiveTodoActions'


const activeTodosInitialState = {
  todos: [new Todo('Todo one'), new Todo('Todo two'), new Todo('Todo three')],
  editModeIndex: { index: -1},
}

const activeTodosReducer = (state = activeTodosInitialState, action) => {

    const {todos} = state;
    const {type, payload} = action;

    switch (type) {
      case ACTIVE_TODO_ACTIONS.add_todo:
          return {
            ...state,
            todos: [payload, ...todos]
          }
        break;
      case ACTIVE_TODO_ACTIONS.delete_todo:
          return {
            ...state,
            todos: todos.filter((todo, i) => payload != i)
          }
        break;
      case ACTIVE_TODO_ACTIONS.edit_todo_mode_on:
          return {
            ...state,
            editModeIndex: payload
          }
        break;
      case ACTIVE_TODO_ACTIONS.edit_todo_mode_off:
          return {
            ...state,
            editModeIndex: payload
          }
        break;
      case ACTIVE_TODO_ACTIONS.todo_edited:
          return {
            ...state,
            todos: todos.map((todo, index) => {
              if (index === payload.index) {
                return {
                  ...todo,
                  text: payload.newText
                }
              }
              return todo
            })
          }
        break;
      case ACTIVE_TODO_ACTIONS.todo_completion_toggled:
          return {
            ...state,
            todos: todos.map((todo, index) => {
              if (index === payload.index) {
                return {
                  ...todo,
                  isChecked: !todo.isChecked
                }
              }
              return todo
            })
          }
        break;
      default: return state;

    }
}

export default activeTodosReducer;
