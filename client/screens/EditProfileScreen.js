import { useContext, useEffect, useState } from "react"
import {
    Text,
    View,
    Image,
    Pressable,
    StyleSheet,
    TextInput,
    Alert,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { AuthContext } from "../context/AuthContext"
import LoginSVG from "../assets/images/user.png"
import { Platform } from "react-native"
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage"
import FileSystem from "expo-file-system"
export default function EditProfileScreen({ navigation }) {
    const { user, instance, setUser } = useContext(AuthContext)
    const [fullName, setFullName] = useState(user.name)
    const [photo, setPhoto] = useState(null)
    const [imageRef, setImageRef] = useState(null)
    const [storageRef, setStorage] = useState(null)

    const updateUser = async (fullName, email, userImage) => {
        const name = fullName.length > 0 ? fullName : user.name
        const result = await instance.post("updateUser", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": true,
                "Access-Control-Allow-Credentials": true,
            },
            body: { name, email, userImage },
        })
        result.data.userImage = userImage
        setUser(result.data)
        navigation.navigate("My Profile")
    }

    const pickImage = async () => {
        try {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })

            if (!result.cancelled) {
                setPhoto(result.uri)
                const storage = getStorage()
                const imageName =
                    result.uri.split("/")[result.uri.split("/").length - 1]
                setImageRef(ref(storage, imageName))
                setStorage(storage)
            }
        } catch (err) {
            console.error("Image picking error", err)
        }
    }

    const saveProfile = async (imageRef, imageUri) => {
        if (user.userImage) {
            try {
                let userImageRef = ref(storageRef, user.userImage)
                await deleteObject(userImageRef)
            } catch (err) {
                console.error("Error updating profile picture.", err)
            }
        }
        try {
            const image = await fetch(imageUri.replace("file:///", "file:/"))
            const imageBytes = await image.blob()
            const uploaded = await uploadBytes(imageRef, imageBytes)
            if (uploaded.metadata.bucket.length > 0) {
                const userImage = `https://firebasestorage.googleapis.com/v0/b/${
                    uploaded.metadata.bucket
                }/o/${
                    uploaded.metadata.fullPath
                }?alt=media&token=${uploaded.metadata.fullPath.replace(
                    ".jpg",
                    "",
                )}`

                updateUser(fullName, user.email, userImage)
            }
        } catch (err) {
            console.error("Error updating profile picture.", err)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                {photo || user.userImage !== "" ? (
                    <Image
                        source={{ uri: photo || user.userImage }}
                        style={styles.image}
                    />
                ) : (
                    <Image source={LoginSVG} style={styles.image} />
                )}
                <View style={{ marginTop: 50 }}>
                    <Pressable style={styles.editButton} onPress={pickImage}>
                        <Text style={styles.editText}>Change Pic</Text>
                    </Pressable>
                </View>
                <View
                    style={{
                        marginTop: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={styles.profileText}>Edit Username:</Text>
                        <TextInput
                            onChangeText={setFullName}
                            style={styles.profileText}
                            placeholder={user.name}
                        />
                    </View>

                    <Text style={styles.profileText}>{user.email}</Text>
                </View>

                <View style={{ marginTop: 100 }}>
                    <Pressable
                        style={styles.editButton}
                        onPress={() => saveProfile(imageRef, photo)}
                    >
                        <Text style={styles.editText}>Save Profile</Text>
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
        borderRadius: 75,
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
