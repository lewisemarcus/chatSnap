import React, { useContext } from "react"
import { View, Text, StyleSheet } from "react-native"
import { AuthContext } from "../../context/AuthContext"

export default function Message({ message }) {
    const { user } = useContext(AuthContext)

    const isMe = message.senderEmail === user.email
    console.log(message)
    return (
        <View
            style={[
                styles.container,
                isMe ? styles.rightContainer : styles.leftContainer,
            ]}
        >
            <Text style={{ color: isMe ? "black" : "white" }}>
                {message.message}
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
