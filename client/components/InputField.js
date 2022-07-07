import React, { useContext } from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { AuthContext } from "../context/AuthContext"

export default function InputField({
    label,
    icon,
    inputType,
    keyboardType,
    fieldButtonLabel,
    fieldButtonFunction,
}) {
    const {
        setName,
        setEmail,
        setPassword,
        name,
        email,
        password,
        setPasswordConfirm,
        passwordConfirm,
    } = useContext(AuthContext)

    return (
        <View
            style={{
                flexDirection: "row",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
            }}
        >
            {icon}
            {inputType == "password" ? (
                <TextInput
                    name={password}
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={{ flex: 1, paddingVertical: 0, color: "#666" }}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
            ) : inputType == "passwordConfirm" ? (
                <TextInput
                    name={passwordConfirm}
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={{ flex: 1, paddingVertical: 0, color: "#666" }}
                    secureTextEntry={true}
                    onChangeText={setPasswordConfirm}
                />
            ) : label == "Full Name" ? (
                <TextInput
                    name={name}
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={{ flex: 1, paddingVertical: 0, color: "#666" }}
                    onChangeText={setName}
                />
            ) : (
                <TextInput
                    name={email}
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={{ flex: 1, paddingVertical: 0, color: "#666" }}
                    onChangeText={setEmail}
                />
            )}
            <TouchableOpacity onPress={fieldButtonFunction}>
                <View>
                    <Text style={{ color: "#3777f0", fontWeight: "700" }}>
                        {fieldButtonLabel}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
