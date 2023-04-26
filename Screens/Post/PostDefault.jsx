import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { fbStore } from "../../firebase/config";
import { collection, query, onSnapshot } from "firebase/firestore";

export const Posts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const q = query(collection(fbStore, "posts"));

    onSnapshot(q, (data) => {
      setPosts([]);
      data.forEach((doc) => {
        setPosts((prevPosts) => {
          const newPost = { ...doc.data(), id: doc.id };
          return [...prevPosts, newPost];
        });
      });
    });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (posts.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <FlatList
        data={posts}
        keyExtractor={(_, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 380, height: 280 }}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.title}>{item.userName}</Text>
            <View style={styles.con}>
              <View>
                <TouchableOpacity
                  style={styles.cont}
                  onPress={() =>
                    navigation.navigate("Coments", { postId: item.id })
                  }
                >
                  <Octicons name="feed-discussion" size={24} color="black" />
                  <Text style={{ margin: 10 }}>Comments</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.cont}
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      latitude: item.location.latitude,
                      longitude: item.location.longitude,
                    })
                  }
                >
                  <Text style={{ margin: 10 }}>{item.nameLocation}</Text>
                  <Octicons name="location" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  con: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "85%",
  },
  cont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    padding: 10,
  },
  title: {
    alignSelf: "flex-start",
    marginTop: 8,
    marginLeft: 40,
    fontWeight: "500",
    fontSize: 16,
  },
});
