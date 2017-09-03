import Todo from '../../models/Todo'
import config from '../../config'

let todoFour = new Todo({ 'id': 4, 'text':'Watch Boardwalk Empire'});
todoFour.setType('completed');

let todoFive = new Todo({ 'id': 5, 'text':'Get Netflix'});
todoFive.setType('completed');

const initialState = {
  active: {
    todos: [new Todo({ 'id': 1, 'text':'Go for a walk'}), new Todo({ 'id': 2, 'text':'Meeting at 11 AM'}),
     new Todo({ 'id': 3, 'text':'Coffee in morning'})],
  },
  completed: {
    todos: [todoFour, todoFive],
  }
}

const todosReducer = (state = initialState, action) => {

    const {active, completed} = state;

    const activeTodos = active.todos;
    const completedTodos = completed.todos;

    const {type, payload} = action;

    const actions = config.todos.actions;

    switch (type) {
      case actions.add_todo:
          return {
            ...state,
            active: {
              ...state.active,
              todos: [payload, ...activeTodos]
            }
          }
        break;
      case actions.delete_active_todo:
          return {
            ...state,
            active: {
              ...state.active,
              todos: activeTodos.filter((todo, i) => payload != i),
            }
          }
        break;
        case actions.delete_completed_todo:
            return {
              ...state,
              completed: {
                todos: completedTodos.filter((todo, i) => payload != i)
              }
            }
          break;
      case actions.complete_todo:
          let completedTodo;
          return {
            ...state,
            active: {
              ...state.active,
              todos: activeTodos.map((todo, index) => {
                if (index === payload.index) {
                  completedTodo = todo;
                  return {
                    ...todo,
                    completed: !todo.completed
                  }
                }
                return todo
              }),
            },
            completed: {
              todos: [completedTodo, ...completedTodos]
            }
          }
        break;
      default: return state;
    };
};

export default todosReducer;
