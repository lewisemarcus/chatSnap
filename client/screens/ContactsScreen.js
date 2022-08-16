import { useContext, useState, useEffect } from "react"
import {
    StyleSheet,
    FlatList,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import { AuthContext } from "../context/AuthContext"
import { DeleteBtn } from "../components/DeleteBtn/DeleteBtn"

export default function ContactsScreen({ navigation }) {
    const { user, instance, setUser } = useContext(AuthContext)
    const [selectedContacts, setSelected] = useState([])
    const [deleteMode, setDeleteMode] = useState(false)

    useEffect(() => {
        return () => {
            setSelected([])
            setDeleteMode(false)
        }
    }, [])
    const onLongPress = (contact) => {
        if (selectedContacts.length) {
            setSelected(
                selectedContacts.filter((chosen) => chosen != contact.email),
            )
        } else setSelected([...selectedContacts, contact.email])
        setDeleteMode(true)
    }
    const getSelected = (contact) => selectedContacts.includes(contact.email)
    const onPress = (contact) => {
        if (selectedContacts.length) return onLongPress(contact)
    }
    useEffect(() => {}, [user.contacts.length])

    useEffect(() => {
        if (!selectedContacts.length) setDeleteMode(false)
    }, [selectedContacts.length])
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={user.contacts}
                renderItem={({ item: contact }) => (
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onPress(contact)}
                            onLongPress={() => onLongPress(contact)}
                        >
                            <Text style={styles.text}>{contact.email}</Text>
                            {getSelected(contact) && (
                                <View style={styles.overlay}></View>
                            )}
                        </TouchableOpacity>
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
            {deleteMode && (
                <View style={{ position: "absolute", bottom: -500, right: 10 }}>
                    <DeleteBtn
                        selectedContacts={selectedContacts}
                        user={user}
                        setUser={setUser}
                        instance={instance}
                    />
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
    },
    overlay: {
        position: "absolute",

        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    text: {
        fontSize: 20,
    },
    button: {
        margin: 15,
        marginTop: 0,
        marginLeft: 0,
        borderBottomWidth: 1,
        minWidth: "100%",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        borderColor: "#3777f0",
    },
})
