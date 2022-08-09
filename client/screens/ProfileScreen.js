import { useContext } from "react"
import { Text, View, Image, Pressable, StyleSheet } from "react-native"
import { AuthContext } from "../context/AuthContext"
import LoginSVG from "../assets/images/user.png"
export default function ProfileScreen({ navigation }) {
    const { user, logout } = useContext(AuthContext)
    const editProfile = () => {
        navigation.navigate("Edit Profile")
    }
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                {user.userImage ? (
                    <Image source={user.userImage} style={styles.image} />
                ) : (
                    <Image source={LoginSVG} style={styles.image} />
                )}
                <View
                    style={{
                        marginTop: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={styles.profileText}>{user.name}</Text>
                    <Text style={styles.profileText}>{user.email}</Text>
                </View>

                <View style={{ marginTop: 100 }}>
                    <Pressable style={styles.editButton} onPress={editProfile}>
                        <Text style={styles.editText}>Edit Profile</Text>
                    </Pressable>
                    <Pressable style={styles.editButton} onPress={logout}>
                        <Text style={styles.editText}>Logout</Text>
                    </Pressable>
                </View>
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
        marginTop: 50,
    },
    editText: {
        fontSize: 25,
    },
    profileText: {
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: "black",
        margin: 10,
    },
    editButton: {
        margin: 5,
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
