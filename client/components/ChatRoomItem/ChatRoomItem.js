import React, { useContext } from "react"
import { Text, View, Image, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/core"
import styles from "./styles/ChatRoomStyle"

export default function ChatRoomItem({ chatRoom }) {
    const navigation = useNavigation()
    const onPress = () => {
        navigation.navigate("ChatRoom", { id: chatRoom.uid })
    }
    console.log(chatRoom.userEmails)
    return (
        <Pressable style={styles.container} onPress={onPress}>
            {/* TODO: add image upload function for users on settings page, add default image */}
            {/* <Image
                source={{
                    uri: user.imageUri,
                }}
                style={styles.image}
            /> */}

            {chatRoom.newMessages && (
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
                </View>
            )}
            {chatRoom && chatRoom.userEmails && (
                <View style={styles.rightContainer}>
                    <View style={styles.row}>
                        <Text style={styles.name}>
                            {chatRoom.userEmails[0]}
                        </Text>
                        <Text style={styles.text}>
                            {
                                chatRoom.messages[chatRoom.messages.length - 1]
                                    .createdAt.$date
                            }
                        </Text>
                    </View>
                    <Text numberOfLines={1} style={styles.text}>
                        {
                            chatRoom.messages[chatRoom.messages.length - 1]
                                .message
                        }
                    </Text>
                </View>
            )}
        </Pressable>
    )
}
