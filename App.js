import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import * as firebase from 'firebase';
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Loading from "./screens/Loading";

/*
var firebaseConfig = {
    apiKey: "AIzaSyDHZ6a_6K_ZCO5K351Yg-Bk279HZrQoECU",
    authDomain: "socialclub-e188d.firebaseapp.com",
    databaseURL: "https://socialclub-e188d.firebaseio.com",
    projectId: "socialclub-e188d",
    storageBucket: "socialclub-e188d.appspot.com",
    messagingSenderId: "34217809878",
    appId: "1:34217809878:web:34c9fd142b7fdd2def3677",
    measurementId: "G-28N5X9D0RV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();*/

const AppStack = createStackNavigator({
  Home: Home
});

const AuthStack = createStackNavigator({
  Login: Login,
    Signup: Signup
});

export default createAppContainer(
    createSwitchNavigator(
        {
          Loading: Loading,
          App: AppStack,
          Auth: AuthStack
        },
        {
          initialRouteName: "Loading"
        }
    )
);