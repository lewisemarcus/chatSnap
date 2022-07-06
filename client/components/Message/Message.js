import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function Message({ chat }) {
    const blue = "#3777f0"
    const grey = "#f2f2f2"
    const myId = "u1"

    const isMe = chat.user.id === myId

    return (
        <View
            style={[
                styles.container,
                isMe ? styles.rightContainer : styles.leftContainer,
            ]}
        >
            <Text style={{ color: isMe ? "black" : "white" }}>
                {chat.content}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3777f0",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: "65%",
    },
    leftContainer: {
        backgroundColor: "#3777f0",
        marginLeft: 10,
        marginRight: "auto",
    },
    rightContainer: {
        backgroundColor: "#f2f2f2",
        marginLeft: "auto",
        marginRight: 10,
    },
    text: {
        color: "white",
    },
})
