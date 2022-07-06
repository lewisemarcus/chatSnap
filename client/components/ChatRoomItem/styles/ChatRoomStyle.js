import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    text: {
        color: "grey",
    },
    container: {
        flexDirection: "row",
        padding: 10,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 0.5,
        borderColor: "white",
    },
    name: {
        color: "black",
        fontWeight: "bold",
        fontSize: 17,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rightContainer: {
        flex: 1,
        justifyContent: "center",
    },
    badgeText: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
    },
    badgeContainer: {
        backgroundColor: "#1E87F0",
        justifyContent: "center",
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "white",
        position: "absolute",
        left: 40,
    },
})

export default styles
