import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        color: "black",
        fontSize: 30,
    },
    container: {
        border: "1px solid black",
        flexDirection: "row",
        padding: 10,
        borderRadius: 25,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    badgeText: {
        color: "black",
        textAlign: "center",
        fontSize: 12,
        fontWeight: "700",
    },
    badgeContainer: {
        backgroundColor: "white",
        justifyContent: "center",
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#F0F0F0",
        position: "absolute",
        right: 40,
    },
})

export default styles
