import { useContext } from "react"
import {
    StyleSheet,
    FlatList,
    SafeAreaView,
    View,
    Text,
    Pressable,
} from "react-native"
import { AuthContext } from "../context/AuthContext"
export default function SelectContactScreen({ navigation }) {
    const { user, setReceivers } = useContext(AuthContext)
    const addReceiver = (contact) => {
        setReceivers((oldReceivers) => [...oldReceivers, contact])
        navigation.navigate("New Chat")
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={user.contacts}
                renderItem={({ item: contact }) => (
                    <View>
                        <Pressable
                            onPress={() => {
                                addReceiver(contact.email)
                            }}
                            style={styles.button}
                        >
                            <Text style={styles.text}>{contact.email}</Text>
                        </Pressable>
                    </View>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            ></FlatList>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
    },
    button: {
        margin: 15,
        marginLeft: 0,
        borderBottomWidth: 1,
        minWidth: "100%",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        borderColor: "#3777f0",
    },
})
