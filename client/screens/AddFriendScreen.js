import { StyleSheet, Text, View, Pressable, Alert } from "react-native"
import { useState, useContext } from "react"

import SearchInput from "../components/AddFriendMenu/SearchInput"
import { AuthContext } from "../context/AuthContext"
const regex = new RegExp("[a-zA-Z0-9]+@[a-z]+.[a-z]{2,3}")
export default function AddFriendScreen() {
    const { instance, find, setFind, user } = useContext(AuthContext)
    const addFriend = async () => {
        try {
            await instance.post("addFriend", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: { user: user, contact: find },
            })
            setFind("Search for users.")
        } catch (err) {
            console.error(err, "Error getting users.")
            setFind("Search for users.")
        }
    }

    const noHandler = () => {
        setFind("Search for users.")
    }

    return (
        <View style={styles.container}>
            <SearchInput />
            {regex.test(find.email) ? (
                <Pressable
                    style={{
                        zIndex: 1,
                        backgroundColor: "#3777f0",
                        padding: 20,
                        width: "90%",
                        borderRadius: 10,
                        marginBottom: 50,
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                    onPress={() => {
                        if (user.sentRequests.includes(find.email)) {
                            Alert.alert(
                                "Already Sent",
                                `A friend request was already sent to ${find.email}.`,
                                [{ text: "OK", onPress: noHandler }],
                            )
                        } else if (user.requests.includes(find.email)) {
                            Alert.alert(
                                "Already Received",
                                `You've already received a request from ${find.email}.`,
                                [{ text: "OK", onPress: noHandler }],
                            )
                        } else {
                            Alert.alert(
                                "Send Request",
                                `Would you like to send a friend request to ${find.email}?`,
                                [
                                    { text: "YES", onPress: addFriend },
                                    { text: "NO", onPress: noHandler },
                                ],
                            )
                        }
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            id={find.email}
                            style={{
                                color: "white",
                                fontSize: 18,
                                textAlign: "center",
                                fontWeight: "bold",
                                fontFamily: "Roboto-MediumItalic",
                            }}
                        >
                            {find.email}
                        </Text>
                    </View>
                </Pressable>
            ) : (
                <Pressable
                    style={{
                        zIndex: 1,
                        backgroundColor: "#3777f0",
                        padding: 20,
                        width: "90%",
                        borderRadius: 10,
                        marginBottom: 50,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <View
                        style={{
                            textAlign: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 18,
                                alignItems: "center",
                                fontWeight: "bold",
                                fontFamily: "Roboto-MediumItalic",
                            }}
                        >
                            {find}
                        </Text>
                    </View>
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fefefe",
        alignItems: "center",
    },
})
