import React, { useContext } from "react"
import { Text, View, Image, Pressable, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/core"
import styles from "./styles/ChatRoomStyle"
import LoginSVG from "../../assets/images/user.png"
import { AuthContext } from "../../context/AuthContext"
export default function ChatRoomItem({ chatRoom }) {
    const navigation = useNavigation()
    const { user } = useContext(AuthContext)
    const onPress = () => {
        navigation.navigate("ChatRoom", { id: chatRoom.uid })
    }
    chatRoom.userEmails = chatRoom.userEmails.filter((email) => {
        return email != user.email
    })
    chatRoom.userImages = chatRoom.userImages.filter((image) => {
        return user.userImage != image
    })
    console.log()
    console.log(">>>here", chatRoom.userImages)
    return (
        <Pressable style={styles.container} onPress={onPress}>
            {chatRoom.userImages.length == 0 ? (
                <FlatList
                    data={chatRoom.userEmails}
                    renderItem={({ item: userImage }) => (
                        <Image source={LoginSVG} style={styles.image} />
                    )}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            ) : (
                <FlatList
                    data={chatRoom.userImages}
                    renderItem={({ item: userImage }) => {
                        return userImage !== "" ? (
                            <Image
                                source={{ uri: userImage }}
                                style={styles.image}
                            />
                        ) : (
                            <Image source={LoginSVG} style={styles.image} />
                        )
                    }}
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
                    {user.email ==
                    chatRoom.messages[chatRoom.messages.length - 1]
                        .senderEmail ? (
                        <Text numberOfLines={1} style={styles.text}>
                            You:{" "}
                            {
                                chatRoom.messages[chatRoom.messages.length - 1]
                                    .message
                            }
                        </Text>
                    ) : (
                        <Text numberOfLines={1} style={styles.text}>
                            {
                                chatRoom.messages[chatRoom.messages.length - 1]
                                    .senderEmail
                            }
                            :{" "}
                            {
                                chatRoom.messages[chatRoom.messages.length - 1]
                                    .message
                            }
                        </Text>
                    )}
                </View>
            )}
        </Pressable>
    )
}
