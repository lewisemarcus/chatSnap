import React, { useContext, useEffect, useState, memo, useRef } from "react"
import { StyleSheet, FlatList, SafeAreaView } from "react-native"
import Message from "../components/Message"
import { SocketContext } from "../socket/SocketContext"
import MessageInput from "../components/MessageInput"
import { useRoute } from "@react-navigation/core"
import { AuthContext } from "../context/AuthContext"
function ChatRoomScreen({ navigation }) {
    const route = useRoute()
    const chatroomId = route.params.id
    const { user, setReceivers, setUser, setChatroomId } =
        useContext(AuthContext)
    const [messages, setMessages] = useState([])
    const [index, setIndex] = useState(20)
    const { socket } = useContext(SocketContext)
    useEffect(() => {
        return () =>
            socket.emit(
                "chat-opened",
                JSON.stringify({
                    chatroomId: chatroomId,
                    userEmail: user.email,
                }),
            )
    }, [])

    useEffect(() => {
        for (let chatroom of user.chatrooms) {
            if (chatroom.uid === chatroomId) {
                console.log(
                    chatroom.messages.messages[
                        chatroom.messages.messages.length - 1
                    ],
                )

                user.chatrooms[user.chatrooms.indexOf(chatroom)].newMessages = 0

                setMessages(chatroom.messages.messages)
                break
            }
        }
    }, [user.chatrooms])

    useEffect(() => {
        for (let chatroom of user.chatrooms) {
            if (chatroom.uid === chatroomId) {
                setChatroomId(chatroomId)
                setReceivers(
                    chatroom.userEmails.filter((receiver) => {
                        return receiver !== user.email
                    }),
                )
            }
        }
    }, [])
    const onLayout = () => {}
    return (
        <SafeAreaView style={styles.page} onLayout={onLayout}>
            <FlatList
                data={messages.slice(-index)}
                // rename's the item from props to eachChatRoom
                renderItem={({ item: message }) => (
                    <Message message={message} />
                )}
                onEndReached={() => setIndex(index + 20)}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.uid}
                showsHorizontalScrollIndicator={false}
                inverted={true}
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
export default memo(ChatRoomScreen)
