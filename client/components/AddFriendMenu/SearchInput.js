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
import { AuthContext } from "../../context/AuthContext"

export default function SearchInput() {
    const [search, setSearch] = useState("")
    const { instance, setFind, user } = useContext(AuthContext)
    const findUser = async () => {
        try {
            if (user.email !== search) {
                const userData = await instance.post("user", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: { email: search },
                })
                const userList = userData.data
                if (userList[0] !== undefined) setFind(userList[0])
                else setFind("No user found with this email.")
            } else setFind("Cannot add self.")
            setSearch("")
        } catch (err) {
            console.error(err, "Error getting users.")
            setSearch("")
        }
    }
    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search by a user's email..."
                />
            </View>
            <Pressable onPress={findUser} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Search</Text>
            </Pressable>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 5,
        flexDirection: "row",
        width: "100%",
    },
    input: {
        flex: 1,
        marginHorizontal: 5,
        width: "90%",
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
        width: 50,
        height: 50,
        backgroundColor: "#3777f0",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 12,
    },
})
