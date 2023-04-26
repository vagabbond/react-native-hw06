import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { collection, addDoc, doc, query, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { fbStore } from "../../firebase/config";

export const Comments = ({ route, navigation }) => {
  const { postId } = route.params;
  const { userName } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [getComments, setGetComments] = useState([]);

  const createComment = async () => {
    send();
    setComment("");
  };

  const send = async () => {
    const data = {
      authorName: userName,
      comment,
    };

    try {
      const postsDocRef = doc(fbStore, "posts", postId);
      await addDoc(collection(postsDocRef, "comments"), data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const loadComments = async () => {
    const postsDocRef = doc(fbStore, "posts", postId);

    const q = await query(collection(postsDocRef, "comments"));

    onSnapshot(q, (data) => {
      setGetComments([]);
      data.forEach((doc) => {
        setGetComments((prevComments) => {
          const newComments = { ...doc.data(), id: doc.id };
          return [...prevComments, newComments];
        });
      });
    });
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.postBody}>
        {getComments.length > 0 ? (
          <>
            <View style={styles.commentList}>
              <FlatList
                data={getComments}
                keyExtractor={(_, indx) => indx.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "space-around",
                      marginBottom: 30,
                    }}
                  >
                    <Text style={styles.title}>{item.authorName}</Text>
                    <View style={styles.comment}>
                      <Text>{item.comment}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </>
        ) : (
          <View style={styles.form}>
            <Text style={styles.title}>No comments yet</Text>
          </View>
        )}

        <View style={styles.form}>
          <View>
            <TextInput
              value={comment}
              onChangeText={(value) => setComment(value)}
              placeholder="Comment"
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={createComment}
          >
            <Text style={styles.postButtonText}>Add comment</Text>
          </TouchableOpacity>
          <View style={styles.registerLink}>
            <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  commentList: {
    marginTop: 30,
    width: "90%",
    flex: 1,
    justifyContent: "center",
  },
  form: {
    width: "90%",
    flex: 1,
    justifyContent: "center",
  },
  postBody: {
    width: "100%",
    alignItems: "center",
    flex: 10,
    borderTopColor: "#E8E8E8",
    borderRadius: 50,
    borderTopWidth: 1,
  },
  registerLink: {
    marginTop: 10,
    alignItems: "center",
  },
  comment: {
    minHeight: 60,
    backgroundColor: "#00000008",
    width: "70%",
    paddingBottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    borderColor: "#E8E8E8",
    backgroundColor: "#00000008",
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
    lineHeight: 24,
  },
  btn: {
    backgroundColor: "#E8E8E8",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  postButtonText: {
    fontWeight: "400",
  },
  title: {
    flex: 1,
    margin: 10,
    fontSize: 20,
  },
});
