import Icon from "react-native-vector-icons/Entypo"
import { TouchableOpacity } from "react-native"

export const DeleteBtn = ({
    selectedContacts = [],
    instance,
    setUser,
    user,
    selectedChats = [],
}) => {
    const handleDelete = async (selectedContacts, selectedChats) => {
        try {
            if (selectedContacts !== undefined)
                user.contacts = user.contacts.filter((contact) => {
                    return !selectedContacts.includes(contact.email)
                })
            if (selectedChats !== undefined)
                user.chatrooms = user.chatrooms.filter((chatroom) => {
                    if (!selectedChats.includes(chatroom))
                        return (chatroom.messages.length = 0)
                })

            setUser(user)
            await instance.post("updateUser", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": true,
                    "Access-Control-Allow-Credentials": true,
                },
                body: {
                    name: user.name,
                    email: user.email,
                    userImage: user.userImage,
                    contacts: user.contacts,
                    chatrooms: user.chatrooms,
                    otherUsers: selectedContacts,
                },
            })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <TouchableOpacity
            onPress={() => {
                handleDelete(selectedContacts, selectedChats)
            }}
            style={{
                position: "absolute",
                width: 65,
                height: 65,
                borderRadius: 32.5,
                backgroundColor: "red",
                bottom: 40,
                right: 20,
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Icon name="trash" size={30} color="#fefefe" />
        </TouchableOpacity>
    )
}

DeleteBtn.defaultProps = {
    selectedChats: [],
    selectedContacts: [],
}
