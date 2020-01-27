import React from "react";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import * as firebase from 'firebase';
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Loading from "./screens/Loading";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {Ionicons} from '@expo/vector-icons';
import Message from "./screens/Message";
import Post from "./screens/Post";
import Notification from "./screens/Notification";
import Profile from "./screens/Profile";
import {firebaseConfig} from "./config";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const AppContainer = createStackNavigator({
        default: createBottomTabNavigator({
                Home: {
                    screen: Home,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name='ios-home' size={24} color={tintColor}/>
                    }
                },
                Message: {
                    screen: Message,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name='ios-chatboxes' size={24} color={tintColor}/>
                    }
                },
                Post: {
                    screen: Post,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name='ios-add-circle' size={48} color='#E9446A'
                                                               style={{
                                                                   shadowColor: '#E9446A',
                                                                   shadowOffset: {width: 0, height: 0},
                                                                   shadowRadius: 10,
                                                                   shadowOpacity: 0.3
                                                               }}/>
                    }
                },
                Notification: {
                    screen: Notification,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name='ios-notifications' size={24} color={tintColor}/>
                    }
                },
                Profile: {
                    screen: Profile,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Ionicons name='ios-person' size={24} color={tintColor}/>
                    }
                }
            },
            {
                defaultNavigationOptions: {
                    tabBarOnPress: ({navigation, defaultHandler}) => {
                        if (navigation.state.key === 'Post') {
                            navigation.navigate('postModal')
                        } else {
                            defaultHandler()
                        }
                    }
                }
            },
            {
                tabBarOptions: {
                    activeTintColor: 'black',
                    inactiveTintColor: '#a8a8a8',
                    showLabel: false
                }
            }),
        postModal: {
            screen: Post
        }
    },
    {
        mode: 'modal',
        headerMode: 'none',
        //initialRouteName:'postModal'
    });

const AuthStack = createStackNavigator({
    Login: Login,
    Signup: Signup
});

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: Loading,
            App: AppContainer,
            Auth: AuthStack
        },
        {
            initialRouteName: "Loading"
        }
    )
);