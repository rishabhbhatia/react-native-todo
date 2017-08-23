import TODO_ACTIONS from '../actions/TodoActions';

// Define intial state of todos list
const initialState = {
  todos: ['Todo one', 'Todo two', 'Todo three'],
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
          todos[payload.index] = payload.newText;
          return {
            ...state,
            todos
          }
        break;
      default: return state;

    }
}

export default todoReducer;
