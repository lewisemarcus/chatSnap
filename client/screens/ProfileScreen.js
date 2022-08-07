import { useContext } from "react"
import { Text, View, Image, Pressable, StyleSheet } from "react-native"
import { AuthContext } from "../context/AuthContext"
import LoginSVG from "../assets/images/user.png"
export default function ProfileScreen() {
    const { user, logout } = useContext(AuthContext)
    console.log(typeof LoginSVG)
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                {user.userImage ? (
                    <Image source={user.userImage} style={styles.image} />
                ) : (
                    <Image source={LoginSVG} style={styles.image} />
                )}
                <Pressable style={styles.editButton}>
                    <Text style={styles.editText}>Update Photo</Text>
                </Pressable>
                <Pressable style={styles.editButton} onPress={logout}>
                    <Text style={styles.editText}>Logout</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 2,
        flex: 1,
        backgroundColor: "#fefefe",
    },
    profile: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        margin: 5,
        width: 150,
        height: 150,
    },
    editText: {
        fontSize: 25,
    },
    editButton: {
        backgroundColor: "white",
        width: 200,
        height: 50,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
})
