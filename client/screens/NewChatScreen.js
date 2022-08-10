import { View, KeyboardAvoidingView, ScrollView } from "react-native"
import MessageInput from "../components/MessageInput/MessageInput"
import Message from "../components/Message"
import RecipientInput from "../components/RecipientInput/RecipientInput"
import { useContext } from "react"
import { FlatList } from "react-native"
import { AuthContext } from "../context/AuthContext"
export default function NewChatScreen({ navigation }) {
    const { chatroom } = useContext(AuthContext)
    return (
        <KeyboardAvoidingView
            style={{ display: "flex", flex: 1, backgroundColor: "white" }}
        >
            <ScrollView>
                <RecipientInput navigation={navigation} />
            </ScrollView>
            {chatroom && (
                <FlatList
                    data={chatroom.messages.messages}
                    // rename's the item from props to eachChatRoom
                    renderItem={({ item: message }) => (
                        <Message message={message} />
                    )}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    inverted
                    contentContainerStyle={{ flexDirection: "column-reverse" }}
                />
            )}

            <View>
                <MessageInput />
            </View>
        </KeyboardAvoidingView>
    )
}
