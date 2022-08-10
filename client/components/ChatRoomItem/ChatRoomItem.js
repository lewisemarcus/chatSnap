import React, { useContext, useEffect } from "react"
import { Text, View, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/core"
import styles from "./styles/ChatRoomStyle"
import LoginSVG from "../../assets/images/user.png"
import GroupJPG from "../../assets/images/group.jpg"
import { AuthContext } from "../../context/AuthContext"
export default function ChatRoomItem({
    chatRoom,
    selected,
    selectedChats,
    setSelected,
    setDeleteMode,
    setState,
}) {
    const navigation = useNavigation()
    const { user, setChatroomId, setReceivers } = useContext(AuthContext)
    const onPress = () => {
        if (selectedChats.length) return onLongPress(chatRoom)
        navigation.navigate("ChatRoom", { id: chatRoom.uid })
    }
    const onLongPress = (chatRoom) => {
        if (selectedChats.includes(chatRoom)) {
            setSelected(selectedChats.filter((chat) => chat != chatRoom))
        } else {
            setSelected([...selectedChats, chatRoom])
        }
        setDeleteMode(true)
        setState(true)
    }
    chatRoom.userEmails = chatRoom.userEmails.filter((email) => {
        return email != user.email
    })
    chatRoom.userImages = chatRoom.userImages.filter((image) => {
        return user.userImage != image
    })
    useEffect(() => {
        setChatroomId(chatRoom.uid)
        setReceivers([])
        return () => setChatroomId("")
    }, [])
    useEffect(() => {
        if (selectedChats.length == 0) setDeleteMode(false)
    }, [selectedChats])

    return (
        chatRoom.messages.length > 0 && (
            <TouchableOpacity
                style={styles.container}
                onLongPress={() => onLongPress(chatRoom)}
                onPress={onPress}
            >
                {chatRoom.userImages.length == 0 ? (
                    chatRoom.userEmails.length > 1 ? (
                        <Image source={GroupJPG} style={styles.image} />
                    ) : (
                        <Image source={LoginSVG} style={styles.image} />
                    )
                ) : chatRoom.userEmails.length == 1 ? (
                    chatRoom.userImages[0] !== "" ? (
                        <Image
                            source={chatRoom.userImages[0]}
                            style={styles.image}
                        />
                    ) : (
                        <Image source={LoginSVG} style={styles.image} />
                    )
                ) : (
                    <Image source={GroupJPG} style={styles.image} />
                )}

                {chatRoom.newMessages && (
                    <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>
                            {chatRoom.newMessages}
                        </Text>
                    </View>
                )}
                {chatRoom &&
                    chatRoom.userEmails &&
                    chatRoom.messages.length > 0 && (
                        <View style={styles.rightContainer}>
                            <View style={styles.row}>
                                <Text style={styles.name}>
                                    {chatRoom.userEmails.toString(", ")}
                                </Text>

                                <Text style={styles.text}>
                                    {
                                        chatRoom.messages[
                                            chatRoom.messages.length - 1
                                        ].createdAt.$date
                                    }
                                </Text>
                            </View>
                            {user.email ==
                            chatRoom.messages[chatRoom.messages.length - 1]
                                .senderEmail ? (
                                <Text numberOfLines={1} style={styles.text}>
                                    You:{" "}
                                    {
                                        chatRoom.messages[
                                            chatRoom.messages.length - 1
                                        ].message
                                    }
                                </Text>
                            ) : (
                                <Text numberOfLines={1} style={styles.text}>
                                    {
                                        chatRoom.messages[
                                            chatRoom.messages.length - 1
                                        ].senderEmail
                                    }
                                    :{" "}
                                    {
                                        chatRoom.messages[
                                            chatRoom.messages.length - 1
                                        ].message
                                    }
                                </Text>
                            )}
                        </View>
                    )}
                {selected && <View style={styles.overlay}></View>}
            </TouchableOpacity>
        )
    )
}
