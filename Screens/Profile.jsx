import { useState, useEffect } from "react";
import { fbStore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { Post } from "./Post";
const backImage = require("../Source/Photo_BG.png");
const profilePhoto = require("../Source/Rectangle22.png");
const buttonImg = require("../Source/add.png");
const data = [];
export const Profile = () => {
  const { userName } = useSelector((state) => state.auth);

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground source={backImage} style={styles.backImg}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.container}>
              <View style={styles.pfotoContainer}>
                <ImageBackground
                  source={profilePhoto}
                  style={{ width: "100%", height: "100%" }}
                ></ImageBackground>
                <TouchableOpacity style={styles.addbutton} activeOpacity={0.5}>
                  <ImageBackground
                    source={buttonImg}
                    style={{ width: "100%", height: "100%" }}
                  ></ImageBackground>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.logoutButton}
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate("Home", { screen: "PostsScreen" })
                }
              >
                <Feather name="log-out" size={24} color="gray" />
              </TouchableOpacity>
              <Text style={styles.title}>{userName}</Text>
              {data.map((el) => (
                <Post
                  key={el.id}
                  img={el.photo}
                  text={el.name}
                  msgs={0}
                  location={el.location}
                />
              ))}
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  logoutButton: {
    marginLeft: 330,
    marginTop: -40,
  },
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 200,
  },
  containerKeyB: {
    justifyContent: "flex-end",
  },
  pfotoContainer: {
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    overflow: "visible",
  },

  addbutton: {
    marginTop: -40,
    left: "90%",
    height: 25,
    width: 25,
    pointerEvents: "auto",
  },
  addButton: {
    backgroundColor: "#FF6C00",
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
  inputLogin: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  inputMailPassw: {
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
  passwShowText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  passwShow: {
    top: -34,
    left: 130,
  },
  registerButton: {
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
