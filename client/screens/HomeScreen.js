import { StyleSheet, Text, View, FlatList } from "react-native"
import { useContext, useEffect, useState } from "react"

import ChatRoomItem from "../components/ChatRoomItem/ChatRoomItem"
import chatRoomsData from "../assets/dummy-data/ChatRooms"
import { AuthContext } from "../context/AuthContext"

export default function Home() {
    const [users, setUsers] = useState([])
    const { instance, user } = useContext(AuthContext)
    //TODO: replace chatRoomsData with user.chatrooms
    return (
        <View style={styles.container}>
            {/* FlatList enables scrollability */}
            <FlatList
                // TODO: replace chatRoomsData with real data once completed.
                data={chatRoomsData}
                // rename's the item from props to eachChatRoom
                renderItem={({ item: eachChatRoom }) => (
                    <ChatRoomItem chatRoom={eachChatRoom} />
                )}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fefefe",
    },
})
