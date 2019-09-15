import {
  combineReducers,
} from 'redux';

import userReducer from './userReducer';
import miscReducer from './miscReducer';
import itemsReducer from './itemsReducer';
import sheetsReducer from './sheetsReducer';

const rootReducer = combineReducers({
  userReducer,
  misc: miscReducer,
  items: itemsReducer,
  sheets: sheetsReducer,
});

export default rootReducer;
