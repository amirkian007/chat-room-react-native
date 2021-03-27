import { SET_MASSAGES,SET_SOCKET} from '../actions/chat';

const initialState = {
  massages: [],
  socket: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MASSAGES:
      return {
        ...state,
        massages: action.massages
      };
    case SET_SOCKET:
      return {
        ...state,
        socket: action.socket
      };
    default:
      return state;
  }
};
