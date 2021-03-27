import { AsyncStorage } from "react-native";

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
import axios from "axios";
let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password, name) => {
  return async (dispatch) => {
    axios
      .put("/auth/signup", {
        name: name,
        email: email,
        password: password,
      })
      .then((e) => {
        console.log(e.data);
        dispatch(
          authenticate(
            e.data.userId,
            e.data.token
            //  parseInt(e.data.expiresIn) * 1000
          )
        );
        //   const expirationDate = new Date(
        //     new Date().getTime() + parseInt(resData.expiresIn) * 1000
        //   );
        saveDataToStorage(e.data.token, e.data.userId);
      })
      .catch((err) => {
        console.log(err);
      });

 
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    axios
      .post("/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(
          authenticate(
              res.data.userId,
              res.data.token
            //  parseInt(resData.expiresIn) * 1000
          )
        );
        saveDataToStorage(res.data.token, res.data.userId);
      })
      .catch((err) => {
        console.log(err);
      });

    // const expirationDate = new Date(
    //   new Date().getTime() + parseInt(resData.expiresIn) * 1000
    // );
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userdata");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userdata",
    JSON.stringify({
      token: token,
      userId: userId,
      //   expiryDate: expirationDate.toISOString()
    })
  );
};
