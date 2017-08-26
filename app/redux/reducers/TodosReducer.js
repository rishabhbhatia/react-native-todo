import Todo from '../../models/Todo'
import TODO_ACTIONS from '../actions/TodoActions'


let todoFour = new Todo('Todo four');
todoFour.setType('completed');

let todoFive = new Todo('Todo five');
todoFive.setType('completed');

const initialState = {
  active: {
    todos: [new Todo('Todo one'), new Todo('Todo two'), new Todo('Todo three')],
    editModeIndex: { index: -1},
  },
  completed: {
    todos: [todoFour, todoFive],
  }
}

const todosReducer = (state = initialState, action) => {

    console.log('todosReducer', state);

    const {active} = state;
    const {completed} = state;

    const activeTodos = active.todos;
    const completedTodos = completed.todos;

    const {type, payload} = action;

    switch (type) {
      case TODO_ACTIONS.add_todo:
          return {
            ...state,
            active: {
              ...state.active,
              todos: [payload, ...activeTodos]
            }
          }
        break;
      case TODO_ACTIONS.delete_active_todo:
          return {
            ...state,
            active: {
              ...state.active,
              todos: activeTodos.filter((todo, i) => payload != i),
            }
          }
        break;
        case TODO_ACTIONS.delete_completed_todo:
            return {
              ...state,
              completed: {
                todos: completedTodos.filter((todo, i) => payload != i)
              }
            }
          break;
      case TODO_ACTIONS.edit_todo_mode_on:
          return {
            ...state,
            active: {
              ...state.active,
              editModeIndex: payload
            }
          }
        break;
      case TODO_ACTIONS.edit_todo_mode_off:
          return {
            ...state,
            active: {
              ...state.active,
              editModeIndex: payload
            }
          }
        break;
      case TODO_ACTIONS.todo_edited:
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
      case TODO_ACTIONS.todo_completed: // change logic // delete todo from active todos and add to completed todos

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
