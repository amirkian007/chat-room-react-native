import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import AsyncStorage from "@react-native-community/async-storage";

const Registration = ({ navigation }) => {
  const [islogin, setislogin] = useState(true);
  const [email, setemail] = useState(true);
  const [username, setusername] = useState(true);
  const [password, setpassword] = useState(true);
  const dispatch = useDispatch();

  const submit = () => {
    let action;
    if (islogin) {
      action = authActions.login(email, password);
    } else {
      action = authActions.signup(email, password, username);
    }
    dispatch(action);
  };

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

  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <View style={styles.inputcontainer}>
          <View>
            <Text style={styles.title}>KIAN Chat App</Text>
          </View>
          {!islogin ? (
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Name..."
                placeholderTextColor="#fafafa"
                onChangeText={(v) => {
                  setusername(v);
                }}
              />
            </View>
          ) : null}
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="#fafafa"
              onChangeText={(v) => {
                setemail(v);
              }}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor="#fafafa"
              onChangeText={(v) => {
                setpassword(v);
              }}
            />
          </View>

          <TouchableOpacity onPress={() => submit()} style={styles.loginBtn}>
            <Text style={styles.inputText}>{islogin ? "login" : "signup"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setislogin(!islogin)}>
            <Text style={styles.loginText}>{islogin ? "signup" : "login"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  inputcontainer: {
    height: 200,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputstyle: {
    backgroundColor: "rgba(240, 240, 240,0.5)",
    borderColor: "rgba(247, 247, 247,0.5)",
  },
  inputView: {
    width: "100%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
    paddingLeft: 20,
    justifyContent: "center",
  },
  inputText: {
    color: "white",
  },
  loginText: {
    color: "white",
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 38,
    color: "#fb5b5a",
    marginBottom: 40,
  },
});
