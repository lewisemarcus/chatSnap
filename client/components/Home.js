import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, FlatList } from "react-native"
import { Card } from "react-native-paper"
import { useEffect, useState } from "react"

export default function Home() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userData = await fetch("http://127.0.0.1:5000//members", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                console.log(userData)
                const userList = await userData.json()
                console.log(userList.members)
                setUsers(userList.members)
            } catch (err) {
                console.error(err, "Error getting users.")
            }
        }
        getUsers()
    }, [])

    const renderUsers = (user) => {
        return (
            <Card>
                <Text>{user}</Text>
            </Card>
        )
    }
    return (
        <View style={styles.container}>
            <Text>User List</Text>
            <FlatList
                data={users}
                // item is a property of renderItem
                renderItem={({ item }) => {
                    return renderUsers(item)
                }}
                keyExtractor={(user) => `${user}`}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eddfdf",
    },
})
