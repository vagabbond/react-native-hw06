import React from "react";
import ProfileElement from "../../Elements/ProfileElement";
const avatar = require('../../Source/Rectangle22.png');
import { Text, FlatList, View, Image, TouchableOpacity,  StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Feather, EvilIcons } from '@expo/vector-icons'; 

const PostList = ({navigation , route}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      if (route.params) {
        setPosts((prevState) => [...prevState, route.params]);
      }
    }, [route.params]);
  
    return (<>
 
      <View style={ { flex: 1,
      justifyContent: "center" } }>
      <ProfileElement avatar= { avatar } name="Natali Romanova" email="email@example.com" />
        <FlatList 
        data= { posts }
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({item}) => (
          <View
            style={{
              marginBottom: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photoi }}
              style={{ width: 380, height: 280, borderRadius: 15 }}
            />
            <Text style={ styles.posText }>{ item.title }</Text>
            <View style={ {display:'flex', justifyContent: 'space-between', flexDirection: "row", width: "85%"} }>
            
            <TouchableOpacity style={ styles.info } onPress={ () => navigation.navigate("Comments") }>
              <Feather name="message-circle" size={18} color="gray" />
              <Text>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.info } onPress={ ()=> navigation.navigate("Map", { location: item.location }) }>
               <EvilIcons name="location" size={24} color="gray" />
               <Text style={ styles.infolink }>{item.inputRegion}</Text>
             </TouchableOpacity>
             </View>
          </View>
          
    )}
        >
        </FlatList>
      </View >
      </>
    );

  };

  const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 400,        
        justifyContent: "flex-start",
        padding: 10
    },
    postImg:{
        flex: 4,
        width: '100%',
        height: '100%',
        borderRadius: 15,
        overflow: "hidden",
    },
    posText:{
       alignSelf: "flex-start",
       marginTop: 8,
       marginLeft: 40,
       fontWeight: "500",
       fontSize: 16,
    },
    info:{
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 5,
      padding: 10
    },
    infolink:{
      textDecorationLine: "underline",
    },
    infoContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
    }
});

export default PostList;