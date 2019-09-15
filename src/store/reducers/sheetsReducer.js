import {
  CAPTURE_SHEETS,
} from '../../constants';

function sheetsReducer(state = {
  docs: [],
  totalDocs: 0,
}, action) {
  switch (action.type) {
    case CAPTURE_SHEETS:
      return action.payload;
    default:
      return state;
  }
}

export default sheetsReducer;
