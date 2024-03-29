import { StyleSheet, Text, View, FlatList } from "react-native"
import { useContext, useEffect, useState } from "react"

import ChatRoomItem from "../components/ChatRoomItem/ChatRoomItem"
import { DeleteBtn } from "../components/DeleteBtn/DeleteBtn"
import { AuthContext } from "../context/AuthContext"
import { NewMessageBtn } from "../components/NewMessageBtn/NewMessageBtn"

export default function Home({ navigation }) {
    const { user, setUser, instance, chatroom } = useContext(AuthContext)
    const [selectedChats, setSelected] = useState([])
    const [deleteMode, setDeleteMode] = useState(false)
    const [deleteState, setState] = useState(false)
    const getSelected = (chatroom) => selectedChats.includes(chatroom)
    useEffect(() => {
        if (!deleteState) setSelected([])
    }, [deleteState])

    useEffect(() => {
        return () => {
            setSelected([])
            setDeleteMode(false)
        }
    }, [])

    return (
        <View style={styles.container}>
            {/* FlatList enables scrollability */}
            <FlatList
                data={user.chatrooms}
                // rename's the item from props to eachChatRoom
                renderItem={({ item: eachChatRoom }) => (
                    <ChatRoomItem
                        setState={setState}
                        chatRoom={eachChatRoom}
                        selected={getSelected(eachChatRoom)}
                        selectedChats={selectedChats}
                        setSelected={setSelected}
                        setDeleteMode={setDeleteMode}
                    />
                )}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
            {deleteMode ? (
                <DeleteBtn
                    user={user}
                    selectedChats={selectedChats}
                    setUser={setUser}
                    instance={instance}
                    setState={setState}
                />
            ) : (
                <NewMessageBtn navigation={navigation} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fefefe",
    },
})
