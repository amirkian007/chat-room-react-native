import "react-native-gesture-handler";
import React, { useState } from "react";
import AppNavigator from "./navigation/AppNavigator";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import chatReducer from "./store/reducers/chat";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.103:3000";

axios.interceptors.request.use(
  async (config) => {
    const response = await AsyncStorage.getItem("userdata");
    const userData = JSON.parse(response);
    if (userData) {
      config.headers.Authorization = "token " + userData.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const rootReducer = combineReducers({
  chat: chatReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
  
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}
