import { FontAwesome, Feather } from "@expo/vector-icons"
import { AuthContext } from "../context/AuthContext"
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from "@react-navigation/native"
import { HeaderBackButton } from "@react-navigation/elements"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useContext } from "react"
import {
    Text,
    Image,
    View,
    useWindowDimensions,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from "react-native"
import {
    ChatRoomScreen,
    ModalScreen,
    NotFoundScreen,
    StartScreen,
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    AddFriendScreen,
    MenuScreen,
    FriendRequestScreen,
    NewChatScreen,
    SelectContactScreen,
    ProfileScreen,
    ContactsScreen,
    EditProfileScreen,
} from "../screens/index"
import LoginSVG from "../assets/images/user.png"

import { useNavigation } from "@react-navigation/core"
/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator()

const RootNavigator = () => {
    const { setReceivers } = useContext(AuthContext)
    const navigation = useNavigation()
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
                options={{
                    headerTitle: ChatRoomHeader,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginRight: 40, marginLeft: 0 }}
                            onPress={() => {
                                navigation.navigate("Home")
                            }}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="New Chat"
                component={NewChatScreen}
                options={{
                    headerShown: true,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <HeaderBackButton
                            style={{ marginRight: 40, marginLeft: 0 }}
                            onPress={() => {
                                setReceivers([])
                                navigation.navigate("Home")
                            }}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="Select Contact"
                component={SelectContactScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="Add A Friend"
                component={AddFriendScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="My Profile"
                component={ProfileScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="Edit Profile"
                component={EditProfileScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="Menu"
                component={MenuScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="Friend Requests"
                component={FriendRequestScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="Settings"
                component={MenuScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="Contacts"
                component={ContactsScreen}
                options={{ headerShown: true }}
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
    const { user } = useContext(AuthContext)
    const { width } = useWindowDimensions()
    const navigation = useNavigation()
    const addFriendHandler = () => {
        navigation.navigate("Add A Friend")
    }
    const menuHandler = () => {
        try {
            navigation.navigate("Menu")
        } catch (err) {
            console.log("crashed", err)
        }
    }
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
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate("My Profile")
                }}
            >
                {user.userImage ? (
                    <Image
                        source={{ uri: user.userImage }}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 30,
                            marginLeft: -20,
                        }}
                    />
                ) : (
                    <Image
                        source={LoginSVG}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 30,
                            marginLeft: -20,
                        }}
                    />
                )}
            </TouchableWithoutFeedback>
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
            <TouchableWithoutFeedback onPress={addFriendHandler}>
                <Feather
                    name="user-plus"
                    size={30}
                    color="black"
                    style={{ marginHorizontal: 10 }}
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={menuHandler}>
                <Feather
                    name="menu"
                    size={30}
                    color="black"
                    style={{ marginHorizontal: 10 }}
                />
            </TouchableWithoutFeedback>
        </View>
    )
}

const ChatRoomHeader = (props) => {
    const { user } = useContext(AuthContext)
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
            {user.userImage === "" ? (
                <Image
                    source={LoginSVG}
                    style={{
                        width: 30,
                        height: 30,
                        borderRadius: 30,
                        marginLeft: -20,
                    }}
                />
            ) : (
                <Image
                    source={{
                        uri: user.userImage,
                    }}
                    style={{
                        width: 30,
                        height: 30,
                        borderRadius: 30,
                        marginLeft: -20,
                    }}
                />
            )}
            <Text
                style={{
                    flex: 1,
                    textAlign: "center",
                    fontWeight: "bold",
                    marginRight: 30,
                }}
            >
                Chats
            </Text>
            <Feather
                name="menu"
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
            {!token ? <AuthNavigator /> : <RootNavigator />}
        </NavigationContainer>
    )
}
