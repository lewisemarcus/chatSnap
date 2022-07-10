import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    text: {
        color: "#3777f0",
        fontWeight: "bolder",
        fontSize: 30,
    },
    container: {
        border: "2px solid white",
        flexDirection: "row",
        padding: 10,
        justifyContent: "center",
        backgroundColor: "#e5e5e5",
    },
    badgeText: {
        color: "#1E87F0",
        textAlign: "center",
        fontSize: 12,
        fontWeight: "bolder",
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
