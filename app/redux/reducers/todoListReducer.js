import TODO_ACTIONS from '../actions/TodoActions'
import Todo from '../../models/Todo'

// Define intial state of todos list
const initialState = {
  todos: [new Todo('Todo one'), new Todo('Todo two'), new Todo('Todo three')],
  editModeIndex: { index: -1}
}

const todoReducer = (state = initialState, action) => {

    const {todos} = state;
    const {type, payload} = action;

    switch (type) {
      case TODO_ACTIONS.add_todo:
          return {
            ...state,
            todos: [payload, ...todos]
          }
        break;
      case TODO_ACTIONS.delete_todo:
          return {
            ...state,
            todos: todos.filter((todo, i) => payload != i)
          }
        break;
      case TODO_ACTIONS.edit_todo_mode_on:
          return {
            ...state,
            editModeIndex: payload
          }
        break;
      case TODO_ACTIONS.edit_todo_mode_off:
          return {
            ...state,
            editModeIndex: payload
          }
        break;
      case TODO_ACTIONS.todo_edited:
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
      case TODO_ACTIONS.todo_completion_toggled:
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

export default todoReducer;
