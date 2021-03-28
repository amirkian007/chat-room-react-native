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
      const { token, userId } = transformedData;
      // const expirationDate = new Date(expiryDate);
      // if (expirationDate <= new Date() || !token || !userId) {
      //   // props.navigation.navigate('Auth');
      //   dispatch(authActions.setDidTryAL());
      //   return;
      // }
      //  const expirationTime = expirationDate.getTime() - new Date().getTime();
      // props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token, 20));
    };
    tryLogin();
  }, [dispatch]);
 // const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
 
  return (
    <NavigationContainer>
      {!isAuth ? <Registration /> :  <ChatNavigator />}
     
    </NavigationContainer>
  );
};

export default AppNavigator;
