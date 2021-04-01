import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/actions/auth";
import { Bubbles} from "react-native-loader";

const Registration = ({ navigation }) => {
  const loading = useSelector((state) => state.auth.loading);
  const error_log = useSelector((state) => state.auth.error);
  const [islogin, setislogin] = useState(true);
  const [email, setemail] = useState(true);
  const [username, setusername] = useState(true);
  const [password, setpassword] = useState(true);
  const [email_error, set_email_error] = useState(null);
  const [name_error, set_name_error] = useState(null);
  const [password_error, set_password_error] = useState(null);
  const [valid, setvalid] = useState(false);
  const [subed, setsubed] = useState(false);
  const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const name_regex = /^[a-zA-Z0-9_]*$/;
  const password_regex = /^[a-zA-Z0-9_×!@#$%^&*)(_+=)-/:;</?>}|{}[\]'"\\,`\s]*$/;
  const dispatch = useDispatch();
  function validateEmail(email) {
    return (
      email_regex.test(String(email).toLowerCase()) && String(email).length > 3
    );
  }
  function validateName(name) {
    return (
      name_regex.test(String(name).toLowerCase()) &&
      String(name).length > 4 &&
      String(name).length < 16
    );
  }
  function validatePassword(password) {
    return (
      password_regex.test(String(password).toLowerCase()) &&
      String(password).length > 8
    );
  }
  const check_for_errors = () => {
    !validateEmail(email)
      ? set_email_error("\n.Email is not valid")
      : set_email_error(null);
    !validatePassword(password)
      ? set_password_error(
          "\n.password has to be more than 8 charechters and made up with valid charcters"
        )
      : set_password_error(null);
    !validateName(username) && !islogin
      ? set_name_error("\n.name has to valid and between 4-16 charechters")
      : set_name_error(null);
  };

  useEffect(() => {
    setvalid(is_form_valid());
  }, [name_error, email_error, password_error]);
  useEffect(() => {
    check_for_errors();
  }, [password, username, email]);
  const does_form_have_errors = () => {
    return (
      (Boolean(email_error) || Boolean(error_log)||
        Boolean(password_error) ||
        (Boolean(name_error) && !islogin)) &&
      subed
    );
  };
  const is_form_valid = () => {
    return (
      !Boolean(email_error) &&
      !Boolean(password_error) &&
      (islogin ? true : !Boolean(name_error))
    );
  };
  const reset_form = () => {
    set_name_error(null);
    set_email_error(null);
    set_password_error(null);
  };
  const submit = () => {
    setsubed(true);
    if (valid) {
      let action = islogin
        ? authActions.login(email, password)
        : authActions.signup(email, password, username);
      dispatch(action);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <View style={styles.inputcontainer}>
          <View>
            <Text style={styles.title}>CHAT ROOM</Text>
          </View>

          {!islogin ? (
            <View style={styles.inputView}>
              <Ionicons
                style={styles.searchIcon}
                name="person-circle-outline"
                size={25}
              />
              <TextInput
                style={styles.inputText}
                placeholder="Name..."
                placeholderTextColor="#fafafa"
                onChangeText={(v) => {
                  setsubed(false);
                  setusername(v);
                }}
              />
            </View>
          ) : null}

          <View style={styles.inputView}>
            <Ionicons style={styles.searchIcon} name="mail-outline" size={25} />
            <TextInput
              inlineImageLeft="search_icon"
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="#fafafa"
              onChangeText={(v) => {
                setsubed(false);
                setemail(v);
              }}
            />
          </View>

          <View style={styles.inputView}>
            <Ionicons
              style={styles.searchIcon}
              name="shield-checkmark-outline"
              size={25}
            />

            <TextInput
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor="#fafafa"
              onChangeText={(v) => {
                setsubed(false);
                setpassword(v);
              }}
              secureTextEntry
            />
          </View>

          {does_form_have_errors() ? (
            <View style={styles.textcolor}>
              <Text style={styles.errtext}>
                {email_error} {password_error} {name_error}{error_log}
              </Text>
            </View>
          ) : null}

          <TouchableOpacity onPress={submit} style={styles.loginBtn}>
            {loading ? (
              <Bubbles size={10} color="#FFF" />
            ) : (
              <Text style={{ color: "white" }}>
                {islogin ? "LOGIN" : "SIGN UP"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              reset_form();
              setislogin(!islogin);
            }}
          >
            <Text style={styles.loginText}>
              {islogin ? "SIGN UP" : "LOGIN"}
            </Text>
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
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputText: {
    color: "white",
    width: "78%",
    padding: 10,
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
  searchIcon: {
    paddingRight: 8,
    color: "white",
  },
  textcolor: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
  },
  errtext: {
    color: "rgba(255, 0, 0,1)",
    fontSize: 13,
    fontWeight: "bold",
  },
});
