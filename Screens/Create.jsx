import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { collection, addDoc } from "firebase/firestore";
import { FontAwesome } from "@expo/vector-icons";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { fbStore } from "../firebase/config";

export const Create = ({ navigation }) => {
  const { userId, userName } = useSelector((state) => state.auth);
  const [hasPermission, setHasPermission] = useState(null);
  const [nameLocation, setNameLocation] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [location, setLocation] = useState(null);
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState(null);

  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPicture(uri);
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    }
    console.log("cameraRef", cameraRef);
  };
  const sendPhoto = async () => {
    if (!picture) return;
    uploadPostToServer();
    navigation.navigate("Posts");
    setTitle(null);
    setPicture(null);
    setLocation(null);
    setNameLocation(null);
  };

  const uploadPhotoToServer = async () => {
    const img = await fetch(picture);
    console.log("img", img);
    const file = await img.blob();
    const uniquePostId = Date.now().toString();
    const storage = getStorage();
    const storageRef = ref(storage, `images/post-${uniquePostId}`);
    await uploadBytes(storageRef, file);
    const imgRef = await getDownloadURL(storageRef);
    return imgRef;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    const post = {
      title,
      photo,
      userId,
      userName,
      location,
      nameLocation,
    };

    try {
      const createPost = await addDoc(collection(fbStore, "posts"), post);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      let locationStatus = await Location.requestForegroundPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(locationStatus.status === "granted");
      setHasPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.postImg}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        {picture && (
          <Image
            source={{ uri: picture }}
            style={{ height: 220, width: 220, marginTop: -80 }}
          />
        )}
      </Camera>
      {!picture && (
        <TouchableOpacity style={styles.postImgAdd} onPress={takePicture}>
          <FontAwesome name="camera" size={24} color="white" />
        </TouchableOpacity>
      )}
      {picture && (
        <TouchableOpacity
          style={styles.postImgAdd}
          activeOpacity={0.5}
          onPress={() => {
            setPicture(null);
          }}
        >
          <FontAwesome icon="fa-regular fa-trash" />
        </TouchableOpacity>
      )}
      <View style={styles.postForm}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(value) => setTitle(value)}
          placeholder="Title"
        />

        <TextInput
          style={styles.input}
          value={nameLocation}
          onChangeText={(value) => setNameLocation(value)}
          placeholder="Location"
        />

        <TouchableOpacity style={styles.opacity} onPress={sendPhoto}>
          <View style={styles.btnSend}>
            <Text style={styles.btnTitle}>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  postImg: {
    flex: 3,
    width: "100%",
    height: 600,
    color: "#F6F6F6",

    justifyContent: "center",
    alignItems: "center",
  },
  postForm: {
    flex: 3,
    marginTop: 20,
  },
  opacity: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },

  postImgAdd: {
    display: "flex",
    marginTop: -65,
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 3,
    borderColor: "#ffffff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  btnTitle: {
    fontSize: 18,
    color: "white",
  },
  btnSend: {
    backgroundColor: "#E8E8E8",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  input: {
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 2,
  },
});
