import {combineReducers} from 'redux';

const tasksReducer = (state=[], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      state = state.concat(action.payload);
      break;
    case 'DELETE_TASK':
      console.log('hello 3');
      state = state.slice();
      state.splice(action.payload, 1);
      break;
    default:
      console.log('something is wrong');
  }

  return state;

},
reducers = combineReducers({
  tasks: tasksReducer
});

export default reducers;
