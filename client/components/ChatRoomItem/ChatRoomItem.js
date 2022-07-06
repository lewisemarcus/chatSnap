import React from "react"
import { Text, View, Image, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/core"
import styles from "./styles/ChatRoomStyle"

export default function ChatRoomItem({ chatRoom }) {
    const user = chatRoom.users[1]
    const navigation = useNavigation()
    const onPress = () => {
        navigation.navigate("ChatRoom", { id: chatRoom.id })
    }

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Image
                source={{
                    uri: user.imageUri,
                }}
                style={styles.image}
            />

            {chatRoom.newMessages && (
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
                </View>
            )}

            <View style={styles.rightContainer}>
                <View style={styles.row}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.text}>
                        {chatRoom.lastMessage.createdAt}
                    </Text>
                </View>
                <Text numberOfLines={1} style={styles.text}>
                    {chatRoom.lastMessage.content}
                </Text>
            </View>
        </Pressable>
    )
}
