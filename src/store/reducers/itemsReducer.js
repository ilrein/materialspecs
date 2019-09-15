import {
  CAPTURE_ITEMS,
} from '../../constants';

function itemsReducer(state = {
  docs: [],
  totalDocs: 0,
}, action) {
  switch (action.type) {
    case CAPTURE_ITEMS:
      return action.payload;
    default:
      return state;
  }
}

export default itemsReducer;
