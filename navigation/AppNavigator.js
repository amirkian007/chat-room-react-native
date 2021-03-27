import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import Registration from "../screens/Reagisteration";

import ChatNavigator from "./ChatNavigator";


const AppNavigator = (props) => {
  const isAuth = useSelector(state => !!state.auth.token);
 // const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
 
  return (
    <NavigationContainer>
      {!isAuth ? <Registration /> :  <ChatNavigator />}
     
    </NavigationContainer>
  );
};

export default AppNavigator;
