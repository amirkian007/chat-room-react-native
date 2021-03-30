export const SET_MASSAGES = "SET_MASSAGES";
export const SET_SOCKET = "SET_SOCKET";
export const SET_ONLINE_USERS = "SET_ONLINE_USERS";
export const REMOVE_ONLINE_USERS = "REMOVE_ONLINE_USERS";
export const SET_USERS = "SET_USERS";
export const SET_DRAWER = "SET_DRAWER";

export const setsocket = (socket) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: SET_SOCKET, socket: socket});
  };
};
export const setonlineusers = (user) => {
  return (dispatch) => {
    dispatch({ type: SET_ONLINE_USERS, user: user});
  };
};
export const removeonlineuser = (user) => {

  return (dispatch) => {
    dispatch({ type: REMOVE_ONLINE_USERS, user: user});
  };
};
export const setusers = (users) => {

  return (dispatch) => {
    dispatch({ type: SET_USERS, users: users});
  };
};
export const isdrawer_open = (isdrawer_open) => {

  return (dispatch) => {
    dispatch({ type: SET_DRAWER, isdrawer_open: isdrawer_open});
  };
};