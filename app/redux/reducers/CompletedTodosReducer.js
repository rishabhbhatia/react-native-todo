import Todo from '../../models/Todo'
import COMPLETED_TODO_ACTIONS from '../actions/CompletedTodoActions'


let todoFour = new Todo('Todo four');
todoFour.setType('completed');

let todoFive = new Todo('Todo five');
todoFive.setType('completed');

const completedTodosInitialState = {
  todos: [todoFour, todoFive],
}

const completedTodosReducer = (state = completedTodosInitialState, action) => {

    console.log('completedTodosReducer', state);
    console.log('completedTodosReducer', action);

    const {todos} = state;
    const {type, payload} = action;

    switch (type) {
      case COMPLETED_TODO_ACTIONS.delete_todo:
        return {
          ...state,
          todos: todos.filter((todo, i) => payload != i)
        }
      break
      default: return state;
    }
}

export default completedTodosReducer;
