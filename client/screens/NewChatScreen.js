import { View, KeyboardAvoidingView } from "react-native"
import { useEffect, useRef, useState } from "react"
import MessageInput from "../components/MessageInput/MessageInput"
import RecipientInput from "../components/RecipientInput/RecipientInput"
export default function NewChatScreen({ navigation }) {
    const messageRef = useRef()
    const [ref, setRef] = useState()
    useEffect(() => {
        setRef(messageRef)
    }, [])
    return (
        <KeyboardAvoidingView>
            <View>
                <RecipientInput messageRef={ref} />
            </View>

            <View style={{ marginTop: 500 }} ref={messageRef}>
                <MessageInput />
            </View>
        </KeyboardAvoidingView>
    )
}
