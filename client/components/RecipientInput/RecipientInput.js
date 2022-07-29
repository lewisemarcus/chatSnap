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
                return contact.email
                    .toUpperCase()
                    .includes(recipient.toUpperCase())
            })
            setContacts(matches)
        } else setContacts([])
    }, [recipient])
    const onPress = () => {
        //TODO: create contact page for this onPress function.
        console.log("hi")
    }

    const addReceiver = (contact) => {
        setReceiver(contact)
        setRecipient("")
    }
    console.log(receiver)
    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    {receiver && (
                        <Pressable
                            style={{
                                backgroundColor: "white",
                                padding: 3,
                                borderRadius: 10,
                            }}
                        >
                            <Text>
                                {receiver}{" "}
                                <Text style={{ color: "red" }}>X</Text>
                            </Text>
                        </Pressable>
                    )}
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
                {searchedContacts.length != 0 && (
                    <View
                        style={{
                            maxHeight: 300,
                            minHeight: 300,
                            marginLeft: 40,
                            marginTop: 10,
                            borderRadius: 10,
                            backgroundColor: "white",
                        }}
                    >
                        <FlatList
                            data={searchedContacts}
                            renderItem={({ item: eachContact }) => (
                                <Pressable
                                    onPress={() => {
                                        addReceiver(eachContact.email)
                                    }}
                                >
                                    <View
                                        style={{
                                            height: 50,
                                            borderColor: "#3777f0",
                                            borderWidth: 1,
                                            borderLeftWidth: 0,
                                            borderRightWidth: 0,
                                            borderTopWidth: 0,
                                            borderRadius: 10,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text ref={receiverRef}>
                                            {eachContact.email}
                                        </Text>
                                    </View>
                                </Pressable>
                            )}
                        />
                    </View>
                )}
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
