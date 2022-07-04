import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, FlatList } from "react-native"
import { Card } from "react-native-paper"
import { useEffect, useState } from "react"
import axios from "axios"
import Constants from "expo-constants"
import { Logs } from "expo"

Logs.enableExpoCliLogging()

const { manifest } = Constants

const uri = `http://${manifest.debuggerHost.split(":").shift()}:5000`
export default function Home() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            try {
                console.log("hi", uri)
                const userData = await axios.get(`${uri}/users`, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                const userList = userData.data
                console.log(userList)
                setUsers(userList)
            } catch (err) {
                console.error(err, "Error getting users.")
            }
        }
        getUsers()
    }, [])

    const renderUsers = (user) => {
        return (
            <Card>
                <Text>{user.username}</Text>
            </Card>
        )
    }
    return (
        <View style={styles.container}>
            <Text>User List</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
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
