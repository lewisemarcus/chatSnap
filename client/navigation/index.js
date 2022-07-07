import { FontAwesome, Feather } from "@expo/vector-icons"
import { AuthContext } from "../context/AuthContext"
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useContext, useState, useEffect } from "react"
import {
    Text,
    Image,
    View,
    useWindowDimensions,
    ActivityIndicator,
} from "react-native"
import {
    ChatRoomScreen,
    ModalScreen,
    NotFoundScreen,
    StartScreen,
    HomeScreen,
    LoginScreen,
    RegisterScreen,
} from "../screens/index"
import LinkingConfiguration from "./LinkingConfiguration"

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator()

const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerTitle: HomeHeader }}
            />

            <Stack.Screen
                name="ChatRoom"
                component={ChatRoomScreen}
                options={{ headerTitle: ChatRoomHeader }}
            />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: "Oops!" }}
            />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

const HomeHeader = (props) => {
    const { logout } = useContext(AuthContext)
    const { width } = useWindowDimensions()
    return (
        <View
            style={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width,
                padding: 10,
                alignItems: "center",
            }}
        >
            <Image
                source={{
                    uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
                }}
                style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    marginLeft: -20,
                }}
                //TODO: improve logout function
                onClick={logout}
            />
            <Text
                style={{
                    flex: 1,
                    textAlign: "center",
                    marginLeft: 50,
                    fontWeight: "bold",
                }}
            >
                Chatsnap
            </Text>

            <Feather
                name="user-plus"
                size={30}
                color="black"
                style={{ marginHorizontal: 10 }}
            />
            <Feather
                name="menu"
                size={30}
                color="black"
                style={{ marginHorizontal: 10 }}
            />
        </View>
    )
}

const ChatRoomHeader = (props) => {
    const { width } = useWindowDimensions()
    return (
        <View
            style={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: width - 50,
                alignItems: "center",
            }}
        >
            <Image
                source={{
                    uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
                }}
                style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    marginLeft: -20,
                }}
            />
            <Text
                style={{
                    flex: 1,
                    textAlign: "center",
                    fontWeight: "bold",
                    marginRight: 30,
                }}
            >
                Chatsnap
            </Text>

            <Feather
                name="user-plus"
                size={30}
                color="black"
                style={{ marginRight: 50 }}
            />
        </View>
    )
}

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default function Navigation({ colorScheme }) {
    const { isLoading, token } = useContext(AuthContext)

    //TODO: set loading feature
    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    return (
        <NavigationContainer
            // TODO: for prod
            // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            // white for dev
            theme={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
        >
            {console.log(token)}
            {!token ? <AuthNavigator /> : <RootNavigator />}
        </NavigationContainer>
    )
}
