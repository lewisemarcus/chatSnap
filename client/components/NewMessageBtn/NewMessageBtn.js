import Icon from "react-native-vector-icons/Entypo"
import { TouchableHighlight, View } from "react-native"

export const NewMessageBtn = ({ navigation }) => {
    return (
        <TouchableHighlight
            onPress={() => {
                console.log("hi")
                navigation.navigate("New Chat")
            }}
        >
            <View
                style={{
                    position: "absolute",
                    width: 65,
                    height: 65,
                    borderRadius: "50%",
                    backgroundColor: "#3777f0",
                    bottom: 40,
                    right: 20,
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Icon name="new-message" size={30} color="#fefefe" />
            </View>
        </TouchableHighlight>
    )
}
