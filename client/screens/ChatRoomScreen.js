import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, FlatList, SafeAreaView } from "react-native"
import Message from "../components/Message"

import MessageInput from "../components/MessageInput"
import { useRoute } from "@react-navigation/core"
import { AuthContext } from "../context/AuthContext"
export default function ChatRoomScreen({ navigation }) {
    const route = useRoute()
    const chatroomId = route.params.id
    const { user, setReceivers } = useContext(AuthContext)
    const [messages, setMessages] = useState([])
    useEffect(() => {
        for (let chatroom of user.chatrooms) {
            if (chatroom.uid === chatroomId) {
                setMessages(chatroom.messages)
                break
            }
        }
    }, [user.chatrooms])
    useEffect(() => {
        for (let chatroom of user.chatrooms) {
            if (chatroom.uid === chatroomId) {
                setReceivers(
                    chatroom.userEmails.filter((receiver) => {
                        return receiver !== user.email
                    }),
                )
            }
        }
    }, [])
    return (
        <SafeAreaView style={styles.page}>
            <FlatList
                data={messages}
                // rename's the item from props to eachChatRoom
                renderItem={({ item: message }) => (
                    <Message message={message} />
                )}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                inverted
                contentContainerStyle={{ flexDirection: "column-reverse" }}
            />
            <MessageInput />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#fefefe",
        flex: 1,
    },
})
