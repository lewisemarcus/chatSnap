import React, { useContext, useEffect, useState, useRef } from "react"
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    Keyboard,
} from "react-native"

import { AuthContext } from "../../context/AuthContext"

export default function RecipientInput() {
    const [recipient, setRecipient] = useState("")
    const [searchedContacts, setContacts] = useState([])
    const { user, setReceiver, receiver } = useContext(AuthContext)
    const inputRef = useRef()
    const receiverRef = useRef()
    useEffect(() => {
        if (recipient.length != 0) {
            let matches = user.contacts.filter((contact) => {
                return contact.email.includes(recipient)
            })
            setContacts(matches)
        } else setContacts([])
    }, [recipient])
    const onPress = () => {
        //TODO: create contact page for this onPress function.
        console.log("hi")
    }

    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={recipient}
                        onChangeText={setRecipient}
                        placeholder="Recipient"
                        ref={inputRef}
                        onLayout={() => {
                            inputRef.current.focus()
                        }}
                    />
                </View>
                <View>
                    {searchedContacts.length != 0 && (
                        <FlatList
                            data={searchedContacts}
                            renderItem={({ item: eachContact }) => (
                                <Pressable
                                    onPress={() => {
                                        setReceiver(
                                            receiverRef.current.textContent,
                                        )
                                        setRecipient("")
                                    }}
                                >
                                    <Text ref={receiverRef}>
                                        {eachContact.email}
                                    </Text>
                                </Pressable>
                            )}
                        />
                    )}
                </View>
            </View>
            <Pressable onPress={onPress} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>+</Text>
            </Pressable>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 5,
        flexDirection: "row",
    },
    container: {
        width: "85%",
        flexDirection: "column",
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
        display: "flex",
        color: "white",
        flexDirection: "column",
        width: 40,
        height: 40,
        backgroundColor: "#3777f0",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        marginTop: -7,
        marginRight: 1,
        color: "white",
        fontSize: 30,
    },
})
