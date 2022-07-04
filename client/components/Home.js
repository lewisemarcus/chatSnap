import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, FlatList } from "react-native"
import { Card } from "react-native-paper"
import { useEffect, useState } from "react"
import axios from "axios"

import { Logs } from "expo"

Logs.enableExpoCliLogging()

const config = { timeout: 1500, baseURL: "http://143.198.237.213:5000" }
const instance = axios.create(config)
export default function Home() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userData = await instance("users", {
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
