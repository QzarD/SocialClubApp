import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button, ActivityIndicator} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import moment from "moment";
import * as firebase from "firebase";
import Fire from "../Fire";

export default function Home(props) {
    const [postsTemp, setPosts] = useState([]);
    const posts=[];


    useEffect(()=>{
        Fire.shared.firestore.collection('posts').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    /*console.log(doc.id, '=>', doc.data());*/
                    let post=doc.data();
                    post.id=doc.id;
                    Fire.shared.firestore
                        .collection("users")
                        .doc(post.uid)
                        .onSnapshot(docUser => {
                            post.user=docUser.data();
                            /*setPosts(oldPosts=>[...oldPosts, post])*/
                            posts.push(post)
                        });
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    },[]);

    const renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Image source={
                    post.user.avatar
                        ? {uri: post.user.avatar}
                        : require("../assets/noImg.png")
                } style={styles.avatar}/>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>
                            <Text style={styles.name}>{post.user.name}</Text>
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                        </View>

                        <Ionicons name="ios-more" size={24} color="#73788B"/>
                    </View>
                    <Text style={styles.post}>{post.text}</Text>
                    <Image source={
                        post.image
                            ? {uri: post.image}
                            : require("../assets/splash.png")
                    } style={styles.postImage} resizeMode="cover"/>
                    <View style={{flexDirection: "row"}}>
                        <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{marginRight: 16}}/>
                        <Ionicons name="ios-chatboxes" size={24} color="#73788B"/>
                    </View>
                </View>
            </View>
        );
    };
    if (posts.length<1){
        return (
            <View style={styles.loading}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large"/>
            </View>
        );
    } else {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Feed</Text>
            </View>
            <View>
                <Button onPress={()=>console.log(posts)} title='hehe'/>
            </View>

            <FlatList
                style={styles.feed}
                data={posts}
                renderItem={({item}) => renderPost(item)}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
    }
}

const styles = StyleSheet.create({
    loading:{
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: {height: 5},
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500"
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }
});