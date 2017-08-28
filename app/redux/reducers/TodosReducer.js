import Todo from '../../models/Todo'
import config from '../../config'

let todoFour = new Todo({ 'id': 4, 'text':'Todo four'});
todoFour.setType('completed');

let todoFive = new Todo({ 'id': 5, 'text':'Todo five'});
todoFive.setType('completed');

const initialState = {
  active: {
    todos: [new Todo({ 'id': 1, 'text':'Todo one'}), new Todo({ 'id': 2, 'text':'Todo two'}),
     new Todo({ 'id': 3, 'text':'Todo three'})],
    editModeIndex: { index: -1},
  },
  completed: {
    todos: [todoFour, todoFive],
  }
}

const todosReducer = (state = initialState, action) => {

    const {active} = state;
    const {completed} = state;

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
      case actions.turn_on_edit_mode:
      console.log('turn_on_edit_mode', state);
      console.log('turn_on_edit_mode', payload);
          return {
            ...state,
            active: {
              ...state.active,
              editModeIndex: payload
            }
          }
        break;
      case actions.turn_off_edit_mode:
          return {
            ...state,
            active: {
              ...state.active,
              editModeIndex: payload
            }
          }
        break;
      case actions.on_todo_edited:
          return {
            ...state,
            active: {
              ...state.active,
              todos: activeTodos.map((todo, index) => {
                if (index === payload.index) {
                  return {
                    ...todo,
                    text: payload.newText
                  }
                }
                return todo
              }),
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
                    isChecked: !todo.isChecked
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

    }
}

export default todosReducer;
