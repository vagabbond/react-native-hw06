import React from "react";

import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../redux/auth/authOperation";

const initialState = {
  email: "",
  password: "",
};
const backImage = require("../Source/Photo_BG.png");

export const Login = ({ navigation }) => {
  const [state, setState] = React.useState(initialState);

  const dispatch = useDispatch();

  const emailHandler = (value) =>
    setState((prevState) => ({ ...prevState, email: value }));
  const passwordHandler = (value) =>
    setState((prevState) => ({ ...prevState, password: value }));

  const onLogin = () => {
    Keyboard.dismiss();

    dispatch(authSignInUser(state));

    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground source={backImage} style={styles.backImg}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.containerKeyB}
          >
            <View style={styles.form}>
              <Text style={styles.title}>Login</Text>
              <View style={styles}>
                <TextInput
                  value={state.email}
                  onChangeText={(value) => emailHandler(value)}
                  placeholder="Email"
                  style={styles.input}
                />
              </View>
              <View style={styles}>
                <TextInput
                  value={state.password}
                  onChangeText={(value) => passwordHandler(value)}
                  placeholder="Password"
                  secureTextEntry={true}
                  style={styles.input}
                />
              </View>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={onLogin}
              >
                <Text style={styles.registerButtonText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.loginLink}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.loginLinkText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  backImg: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
  containerKeyB: {
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  input: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  loginLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  loginLinkText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
});
