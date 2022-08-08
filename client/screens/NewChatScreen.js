import { View, KeyboardAvoidingView, ScrollView } from "react-native"
import MessageInput from "../components/MessageInput/MessageInput"
import RecipientInput from "../components/RecipientInput/RecipientInput"
export default function NewChatScreen({ navigation }) {
    return (
        <KeyboardAvoidingView style={{ display: "flex", flex: 1 }}>
            <ScrollView>
                <RecipientInput navigation={navigation} />
            </ScrollView>
            <View>
                <MessageInput />
            </View>
        </KeyboardAvoidingView>
    )
}
