import { useContext } from "react"
import { Text, View, Image, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/core"
import styles from "./styles/FriendRequestStyles"
import { AuthContext } from "../../context/AuthContext"

export default function FriendRequestItem({ request }) {
    const navigation = useNavigation()

    const { user, instance } = useContext(AuthContext)

    const acceptFriend = async () => {
        try {
            await instance.post("acceptFriend", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: { userEmail: user.email, contact: request },
            })
            setAccepted("")
        } catch (err) {
            console.error(err, "Error accepting request.")
            setAccepted("")
        }
    }

    const noHandler = () => {
        setAccepted("")
    }

    const onPress = () => {
        Alert.alert(
            "Add Friend?",
            `Do you want to accept ${request}'s request?`,
            [
                {
                    text: "Yes",
                    onPress: acceptFriend,
                },
                {
                    text: "No",
                    onPress: noHandler,
                },
            ],
        )
    }

    return (
        <View style={styles.container}>
            {user.requests.length > 0 ? (
                <Pressable style={styles.container} onPress={onPress}>
                    <Text style={styles.text}>{request}</Text>
                </Pressable>
            ) : (
                <Pressable style={styles.container} onPress={onPress}>
                    <Text style={styles.text}>No friend requests.</Text>
                </Pressable>
            )}
        </View>
    )
}
