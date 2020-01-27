import React from "react";
import {View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback} from "react-native";

export default function Message() {

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.container}>
                <Text>Message screen</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});