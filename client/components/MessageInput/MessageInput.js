import React, { useContext, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
} from "react-native"
import { SocketContext } from "../../socket/SocketContext"
import {
    SimpleLineIcons,
    Feather,
    MaterialCommunityIcons,
} from "@expo/vector-icons"
import { AuthContext } from "../../context/AuthContext"
import { useRoute } from "@react-navigation/native"
export default function MessageInput({ navigation }) {
    const [message, setMessage] = useState("")
    const { sendMessage } = useContext(SocketContext)
    const { user, receivers, setReceivers, chatroomId } =
        useContext(AuthContext)
    const route = useRoute()
    const onPress = () => {
        if (message) {
            sendMessage({ user, receivers, message })
            //TODO: once new chatroom is created change to chatroom screen
            if (route.name === "New Chat") {
                navigation.navigate("ChatRoom", { id: chatroomId })
            }
        }
        setMessage("")
        setReceivers([])
    }

    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.inputContainer}>
                <SimpleLineIcons
                    name="emotsmile"
                    size={24}
                    color="grey"
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Say something..."
                />
                <Feather
                    name="camera"
                    size={24}
                    color="grey"
                    style={styles.icon}
                />
                <MaterialCommunityIcons
                    name="microphone-outline"
                    color="grey"
                    size={24}
                    style={styles.icon}
                />
            </View>
            <Pressable onPress={onPress} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Send</Text>
            </Pressable>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 5,
        flexDirection: "row",
    },
    input: {
        flex: 1,
        marginHorizontal: 5,
    },
    icon: {
        marginHorizontal: 5,
    },
    inputContainer: {
        marginRight: 10,
        backgroundColor: "#f2f2f2",
        flex: 1,
        flexDirection: "row",
        color: "white",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#dedede",
        alignItems: "center",
        padding: 5,
    },
    buttonContainer: {
        color: "white",
        width: 40,
        height: 40,
        backgroundColor: "#3777f0",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 12,
    },
})
