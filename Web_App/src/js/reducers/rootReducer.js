import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import boardReducer from './boardReducer';


const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  board: boardReducer,
});

export default rootReducer;
