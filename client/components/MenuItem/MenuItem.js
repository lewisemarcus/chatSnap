import { useContext } from "react"
import { Text, View, Image, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/core"
import styles from "./styles/MenuStyles"
import { AuthContext } from "../../context/AuthContext"

export default function MenuItem({ option }) {
    const navigation = useNavigation()
    const onPress = () => {
        navigation.navigate(`${option}`)
    }
    const { user } = useContext(AuthContext)
    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            {option === "Friend Requests" && user.requests.length > 0 ? (
                <Pressable style={styles.container} onPress={onPress}>
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>
                            {user.requests.length}
                        </Text>
                    </View>
                    <Text style={styles.text}>{option}</Text>
                </Pressable>
            ) : (
                <Pressable style={styles.container} onPress={onPress}>
                    <Text style={styles.text}>{option}</Text>
                </Pressable>
            )}
        </View>
    )
}
