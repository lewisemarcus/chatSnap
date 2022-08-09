import Icon from "react-native-vector-icons/Entypo"
import { TouchableOpacity, View } from "react-native"

export const DeleteBtn = ({
    navigation,
    selectedContacts,
    user,
    instance,
    setUser,
}) => {
    const handleDelete = async (selectedContacts) => {
        try {
            user.contacts = user.contacts.filter((contact) => {
                return !selectedContacts.includes(contact.email)
            })
            console.log(user.contacts)
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
                },
            })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <TouchableOpacity
            onPress={() => {
                handleDelete(selectedContacts)
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
