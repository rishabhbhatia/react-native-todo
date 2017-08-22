import TODO_ACTIONS from '../actions/TodoActions';

// Define intial state of todos list
const initialState = {
  todos: ['Todo one', 'Todo two', 'Todo three']
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
      default: return state;

    }
}

export default todoReducer;
