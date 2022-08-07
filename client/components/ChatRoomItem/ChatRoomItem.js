import React, { useContext } from "react"
import { Text, View, Image, Pressable, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/core"
import styles from "./styles/ChatRoomStyle"
import LoginSVG from "../../assets/images/user.png"
export default function ChatRoomItem({ chatRoom }) {
    const navigation = useNavigation()
    const onPress = () => {
        navigation.navigate("ChatRoom", { id: chatRoom.uid })
    }
    chatRoom.userEmails.pop()

    return (
        <Pressable style={styles.container} onPress={onPress}>
            {/* TODO: add image upload function for users on settings page, add default image */}
            {chatRoom.userImages ? (
                <FlatList
                    data={chatRoom.userImages}
                    renderItem={({ item: userImage }) => (
                        <Image source={userImage} style={styles.image} />
                    )}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            ) : (
                <FlatList
                    data={chatRoom.userEmails}
                    renderItem={() => (
                        <Image source={LoginSVG} style={styles.image} />
                    )}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            )}

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
