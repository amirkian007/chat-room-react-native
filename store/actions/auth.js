import { AsyncStorage } from "react-native";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
import axios from "axios";
let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};
export const setloading = (loading) => {
  return { type: SET_LOADING, loading: loading };
};
export const seterror = (error) => {
  return { type: SET_ERROR, error: error };
};

export const authenticate = (userId, token, name, email) => {
  return (dispatch) => {  
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId, 
      token: token,
      name: name, 
      email: email,
    });
  };
};

export const signup = (email, password, name) => {
  return async (dispatch) => {
    dispatch(setloading(true));
    axios
      .put("/auth/signup", {
        name: name,
        email: email,
        password: password,
      })
      .then((e) => {
        console.log(e);
        dispatch(setloading(false));   

       if(e.status === 201){ dispatch(
          authenticate(
            e.data.userId,
            e.data.token,
            e.data.name,  
            e.data.email 
            //  parseInt(e.data.expiresIn) * 1000
          )
        );
        //   const expirationDate = new Date(
        //     new Date().getTime() + parseInt(resData.expiresIn) * 1000
        //   );
        saveDataToStorage(
          e.data.token,
          e.data.userId,
          e.data.name,
          e.data.email
        );}
      })
      .catch((err) => {
        dispatch(setloading(false));
        console.log("error")
        dispatch(seterror("email has allready been token"))
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
            res.data.token,
            res.data.name,
            res.data.email
            //  parseInt(resData.expiresIn) * 1000
          )
        );
        saveDataToStorage(
          res.data.token,
          res.data.userId,
          res.data.name,
          res.data.email
        );
      })
      .catch((err) => {
        console.log(err)
        dispatch(seterror("email and password do not match"))
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

const saveDataToStorage = (token, userId, name, email) => {
  AsyncStorage.setItem(
    "userdata",
    JSON.stringify({
      token: token,
      userId: userId,
      name: name,
      email: email,
      //   expiryDate: expirationDate.toISOString()
    })
  );
};
