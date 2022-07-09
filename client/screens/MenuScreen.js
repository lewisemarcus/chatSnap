import { StyleSheet, View, FlatList } from "react-native"
import { useContext, useEffect, useState } from "react"

import MenuItem from "../components/MenuItem/MenuItem"
const options = ["Friend Requests", "Settings"]
export default function MenuScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={options}
                renderItem={({ item: option }) => <MenuItem option={option} />}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 2,
        flex: 1,
        backgroundColor: "#fefefe",
    },
})
