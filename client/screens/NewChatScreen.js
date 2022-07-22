import { SafeAreaView, View } from "react-native"
import MessageInput from "../components/MessageInput/MessageInput"
import RecipientInput from "../components/RecipientInput/RecipientInput"
export default function NewChatScreen({ navigation }) {
    return (
        <SafeAreaView>
            <View>
                <RecipientInput />
            </View>

            <View style={{ marginTop: 300 }}>
                <MessageInput />
            </View>
        </SafeAreaView>
    )
}
