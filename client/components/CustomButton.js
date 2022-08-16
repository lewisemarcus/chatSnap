import { Text, TouchableOpacity, View } from "react-native"
import React from "react"

export default function CustomButton({ label, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: "#3777f0",
                padding: 20,
                borderRadius: 10,
                marginBottom: 30,
            }}
        >
            <View>
                <Text
                    style={{
                        textAlign: "center",
                        fontWeight: "700",
                        fontSize: 16,
                        color: "#fff",
                    }}
                >
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
