import {
  combineReducers,
} from 'redux';

import userReducer from './userReducer';
import miscReducer from './miscReducer';

const rootReducer = combineReducers({
  userReducer,
  misc: miscReducer,
});

export default rootReducer;
