import { SET_USERS,SET_SOCKET,SET_ONLINE_USERS,REMOVE_ONLINE_USERS} from '../actions/chat';

const initialState = {
  massages: [],
  socket: null,
  online_users : []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ONLINE_USERS:
      return {
        ...state,
        online_users:state.online_users.filter(item => item !== action.user) 
      };
    case SET_ONLINE_USERS:
      return {
        ...state,
        online_users: state.online_users.concat(action.user)
      };
    case SET_SOCKET:
      return {
        ...state,
        socket: action.socket
      };
    case SET_USERS:
      return {
        ...state,
        online_users: action.users
      };
    default:
      return state;
  }
};
