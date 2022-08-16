import { StyleSheet, View, FlatList, Text } from "react-native"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import FriendRequestItem from "../components/FriendRequestItem/FriendRequestItem"

export default function FriendRequestScreen() {
    const { user } = useContext(AuthContext)
    return (
        <View style={styles.container}>
            <FlatList
                data={user.requests}
                renderItem={({ item: request }) => (
                    <FriendRequestItem request={request} />
                )}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 2,
        flex: 1,
        backgroundColor: "#fefefe",
    },
})
