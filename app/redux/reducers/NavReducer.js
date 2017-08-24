import { NavigationActions } from 'react-navigation';
import AppNavigator from '../../navigation/AppNavigator';

const firstAction = AppNavigator.router.getActionForPathAndParams('ActiveTodos');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

const navReducer = (state = initialNavState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
}

export default navReducer;
