import React, { useContext } from "react"
import { View, Text, StyleSheet } from "react-native"
import { AuthContext } from "../../context/AuthContext"

export default function Message({ message }) {
    const { user } = useContext(AuthContext)

    const isMe = message.senderEmail === user.email
    return (
        <View>
            <View
                style={[
                    styles.container,
                    isMe ? styles.rightContainer : styles.leftContainer,
                ]}
            >
                {isMe ? (
                    <Text style={{ color: "black" }}>{message.message}</Text>
                ) : (
                    <View>
                        <Text style={{ color: "white" }}>
                            {message.message}
                        </Text>

                        <Text style={{ color: "white", fontSize: 10 }}>
                            Sent by: {message.senderEmail}
                        </Text>
                    </View>
                )}
            </View>
            <View></View>
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
