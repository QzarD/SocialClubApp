import React,{useState, useEffect} from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from "react-native"
import {Ionicons} from '@expo/vector-icons';
import Contants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Fire from '../Fire';
import * as ImagePicker from 'expo-image-picker';

const firebase = require("firebase");
require("firebase/firestore");

export default function Post({navigation}, ...props) {
    const [text, setText]=useState('');
    const [image, setImage]=useState(null);
    const [userState, setUser] = useState({});
    useEffect(()=>{
        getPhotoPermission();
        const user = props.uid || Fire.shared.uid;

        Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                setUser(doc.data());
                console.log(doc.data())
            });
    },[]);
    const getPhotoPermission=async()=>{
        if (Contants.platform.ios){
            const {status}=await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if(status !== 'granted'){
                alert('We need permission to access your camera roll')
            }
        }
    };
    const handlePost=()=>{
        Fire.shared.addPost({text:text.trim(), localUri:image})
            .then(ref=>{
            setText('');
            setImage(null);
            navigation.goBack()
        })
            .catch(err=>{
                alert(err)
            })
    };
    const pickImage=async ()=>{
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowEditing: true,
            aspect: [4,3]
        });
        if (!result.cancelled){
            setImage(result.uri)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name='md-arrow-back' size={24} color='#D8D9D8'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePost}>
                    <Text style={{fontWeight:'500'}}>Post</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Image source={
                    userState.avatar
                        ? {uri: userState.avatar}
                        : require("../assets/noImg.png")}
                       style={styles.avatar} />
                <TextInput
                    autoFocus
                    multiline
                    numberOfLines={4}
                    style={{flex:1}}
                    onChangeText={text=>setText(text)}
                    valur={text}
                placeholder='Want to share something?'/>
            </View>
            <TouchableOpacity style={styles.photo} onPress={pickImage}>
                <Ionicons name='md-camera' size={32} color='#D8D9DB'/>
            </TouchableOpacity>
            <View style={{marginHorizontal: 32, marginTop: 32, height: 150}}>
                <Image source={{uri:image}} style={{width: '100%', height:'100%'}}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:32,
        paddingVertical:12,
        marginTop:26,
        borderBottomWidth:1,
        borderBottomColor:'#D8D9DB'
    },
    inputContainer:{
        margin:32,
        flexDirection: 'row'
    },
    avatar:{
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16
    },
    photo:{
        alignItems:'flex-end',
        marginHorizontal:32
    }
});