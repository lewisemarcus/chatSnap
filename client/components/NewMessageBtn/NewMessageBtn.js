import Icon from "react-native-vector-icons/Entypo"
import { TouchableOpacity, View } from "react-native"

export const NewMessageBtn = ({ navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("New Chat")
            }}
            style={{
                position: "absolute",
                width: 65,
                height: 65,
                borderRadius: 32.5,
                backgroundColor: "#3777f0",
                bottom: 40,
                right: 20,
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Icon name="new-message" size={30} color="#fefefe" />
        </TouchableOpacity>
    )
}
