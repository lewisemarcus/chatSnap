import React, { useState, useContext } from "react"
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native"

//import DatePicker from "react-native-date-picker"

import InputField from "../components/InputField"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import RegistrationSVG from "../assets/images/login.svg"
import GoogleSVG from "../assets/images/google.svg"
import FacebookSVG from "../assets/images/facebook.svg"
import TwitterSVG from "../assets/images/twitter.svg"
import CustomButton from "../components/CustomButton"
import { AuthContext } from "../context/AuthContext"

const RegisterScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dobLabel, setDobLabel] = useState("Date of Birth")
    const { register } = useContext(AuthContext)
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 25 }}
            >
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={RegistrationSVG}
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
                    Register
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
                        <Image
                            source={GoogleSVG}
                            style={{ width: 24, height: 24 }}
                        />
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
                        <Image
                            source={FacebookSVG}
                            style={{ width: 24, height: 24 }}
                        />
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
                        <Image
                            source={TwitterSVG}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                </View>

                <Text
                    style={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: 30,
                    }}
                >
                    Or, register with email ...
                </Text>

                <InputField
                    label={"Full Name"}
                    icon={
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                />

                <InputField
                    label={"Email"}
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
                />

                <InputField
                    label={"Confirm Password"}
                    icon={
                        <Ionicons
                            name="ios-lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="passwordConfirm"
                />

                <View
                    style={{
                        flexDirection: "row",
                        borderBottomColor: "#ccc",
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 30,
                    }}
                >
                    <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="#666"
                        style={{ marginRight: 5 }}
                    />
                    <TouchableOpacity onPress={() => setOpen(true)}>
                        <View>
                            <Text
                                style={{
                                    color: "#666",
                                    marginLeft: 5,
                                    marginTop: 5,
                                }}
                            >
                                {dobLabel}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* TODO: make working date picker if we want DOB. */}
                {/* <DatePicker
                    modal
                    open={open}
                    date={date}
                    maximumDate={new Date("2005-01-01")}
                    minimumDate={new Date("1980-01-01")}
                    locale="en"
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        setDobLabel(date.toDateString())
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                /> */}

                <CustomButton label={"Register"} onPress={() => register()} />

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginBottom: 30,
                    }}
                >
                    <Text>Already registered?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                    >
                        <View>
                            <Text
                                style={{ color: "#3777f0", fontWeight: "700" }}
                            >
                                Login
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen
