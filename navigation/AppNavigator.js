import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import Registration from "../screens/Reagisteration";
import * as authActions from "../store/actions/auth";
import ChatNavigator from "./ChatNavigator";
import AsyncStorage from "@react-native-community/async-storage";

const AppNavigator = (props) => {
  const isAuth = useSelector(state => !!state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userdata");
      if (!userData) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId ,name,email } = transformedData;
      dispatch(authActions.authenticate(userId, token,name,email));
    };
    tryLogin();
  }, [dispatch]);
 
  return (
    <NavigationContainer>
      {!isAuth ? <Registration /> :  <ChatNavigator />}
     
    </NavigationContainer>
  );
};

export default AppNavigator;
