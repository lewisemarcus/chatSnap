import React, { useContext } from "react"
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native"

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"

import LoginSVG from "../assets/images/login.svg"
import GoogleSVG from "../assets/images/google.svg"
import FacebookSVG from "../assets/images/facebook.svg"
import TwitterSVG from "../assets/images/twitter.svg"
import CustomButton from "../components/CustomButton"
import InputField from "../components/InputField"
import { AuthContext } from "../context/AuthContext"

const LoginScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext)

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={LoginSVG}
                        style={{
                            width: 300,
                            height: 300,
                            transform: [{ rotate: "-5deg" }],
                        }}
                    />
                </View>

                <Text
                    style={{
                        fontFamily: "Roboto-Medium",
                        fontSize: 28,
                        fontWeight: "500",
                        color: "#333",
                        marginBottom: 30,
                    }}
                >
                    Login
                </Text>

                <InputField
                    label={"Email ID"}
                    icon={
                        <MaterialIcons
                            name="alternate-email"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    keyboardType="email-address"
                />

                <InputField
                    label={"Password"}
                    icon={
                        <Ionicons
                            name="ios-lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                    fieldButtonLabel={"Forgot?"}
                    fieldButtonFunction={() => {}}
                />

                <CustomButton
                    label={"Login"}
                    onPress={() => {
                        login()
                    }}
                />

                <Text
                    style={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: 30,
                    }}
                >
                    Or, login with ...
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 30,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {}}
                        style={{
                            borderColor: "#ddd",
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}
                    >
                        <View>
                            <Image
                                source={GoogleSVG}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {}}
                        style={{
                            borderColor: "#ddd",
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}
                    >
                        <View>
                            <Image
                                source={FacebookSVG}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {}}
                        style={{
                            borderColor: "#ddd",
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}
                    >
                        <View>
                            <Image
                                source={TwitterSVG}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginBottom: 30,
                    }}
                >
                    <Text>New to the app?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                    >
                        <View>
                            <Text
                                style={{ color: "#3777f0", fontWeight: "700" }}
                            >
                                Register
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen
