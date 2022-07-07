import React from "react"
import { SafeAreaView, View, Text, TouchableOpacity, Image } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Phone from "../assets/images/phone.svg"

const StartScreen = ({ navigation }) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
        >
            <View style={{ marginTop: 20 }}>
                <Text
                    style={{
                        fontFamily: "Inter-Bold",
                        fontWeight: "bold",
                        fontSize: 30,
                        color: "#20315f",
                    }}
                >
                    CHATSNAP
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    source={Phone}
                />
            </View>
            <TouchableOpacity
                style={{
                    zIndex: 1,
                    backgroundColor: "#3777f0",
                    padding: 20,
                    width: "90%",
                    borderRadius: 10,
                    marginBottom: 50,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
                onPress={() => navigation.navigate("Login")}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 18,
                            textAlign: "center",
                            fontWeight: "bold",
                            fontFamily: "Roboto-MediumItalic",
                        }}
                    >
                        Login
                    </Text>
                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={22}
                        color="#fff"
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    zIndex: 1,
                    backgroundColor: "#3777f0",
                    padding: 20,
                    width: "90%",
                    borderRadius: 10,
                    marginBottom: 50,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
                onPress={() => navigation.navigate("Register")}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 18,
                            textAlign: "center",
                            fontWeight: "bold",
                            fontFamily: "Roboto-MediumItalic",
                        }}
                    >
                        Register
                    </Text>

                    <MaterialIcons
                        name="arrow-forward-ios"
                        size={22}
                        color="#fff"
                    />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default StartScreen
