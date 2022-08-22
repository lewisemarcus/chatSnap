import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { createContext, useState, useEffect, useRef } from "react"
import { Alert } from "react-native"
import axios from "axios"
import Constants from "expo-constants"
import { Platform, LogBox, AppState } from "react-native"
import { WEB_URL, AND_URL } from "@env"
const { manifest } = Constants
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { Logs } from "expo"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
    }),
})

Logs.enableExpoCliLogging()

export let uri
// Checks if on web or on android/ios dev
// if (manifest.debuggerHost !== undefined) uri = AND_URL
if (Platform.OS === "ios" || Platform.OS === "android") uri = AND_URL
//TODO: Change back to WEB_URL for web dev testing
else uri = AND_URL

const config = { timeout: 5000, baseURL: uri }
const instance = axios.create(config)

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [find, setFind] = useState("Search for users.")

    const [receivers, setReceivers] = useState([])
    const [users, setUsers] = useState([])
    const [token, setToken] = useState(null)
    const [name, setName] = useState("")
    const [chatroomId, setChatroomId] = useState("")
    const [chatroom, setChatroom] = useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [user, setUser] = useState({ totalNot: 0 })
    const [notification, setNotification] = useState(null)
    const notificationListener = useRef()
    const responseListener = useRef()

    const noHandler = () => {
        setName("")
        setEmail("")
        setPassword("")
        setPasswordConfirm("")
    }

    async function sendPushNotification(expoPushToken, content) {
        const message = {
            to: expoPushToken,
            sound: "default",
            title: content.title,
            body: content.message,
            data: { chatroomId: content.data },
        }

        await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        })
    }

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])

    useEffect(() => {
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification)
            })

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    //TODO: add response for notification tap
                    console.log(response)
                },
            )

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current,
            )
            Notifications.removeNotificationSubscription(
                responseListener.current,
            )
        }
    }, [])

    useEffect(() => {
        if (user.totalNot) {
            if (user.totalNot <= 0) Notifications.setBadgeCountAsync(0)
            else Notifications.setBadgeCountAsync(user.totalNot)
        }
    }, [user.totalNot])

    const appState = useRef(AppState.currentState)

    useEffect(() => {
        const subscription = AppState.addEventListener(
            "change",
            _handleAppStateChange,
        )
        return () => {
            subscription.remove()
        }
    }, [])

    const _handleAppStateChange = async (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            let userInfo = await AsyncStorage.getItem("user")
            setUser(JSON.parse(userInfo))
            Notifications.setBadgeCountAsync(0)
        }

        appState.current = nextAppState
    }

    const register = async () => {
        try {
            setIsLoading(true)
            if (
                name.length > 0 &&
                email.length > 0 &&
                password.length > 0 &&
                password === passwordConfirm
            ) {
                const userExpoToken =
                    await registerForPushNotificationsAsync().then(
                        (expoToken) => {
                            return expoToken
                        },
                    )

                const registerUser = await instance.post("Register", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": true,
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: { name, email, password, userExpoToken },
                })
                if (registerUser.data) {
                    const token = registerUser.data[0]
                    const userInfo = registerUser.data[1]

                    setUser(userInfo)
                    setToken(token)
                    AsyncStorage.setItem("token", token)
                    AsyncStorage.setItem("name", userInfo.name)
                    AsyncStorage.setItem("user", JSON.stringify(userInfo))
                    setIsLoading(false)
                } else setIsLoading(false)
            } else {
                Alert.alert(
                    "Missing Credentials",
                    "Please enter all required credentials.",
                    [{ text: "OK", onPress: noHandler }],
                )
                throw "Please enter all credentials."
            }
        } catch (err) {
            setIsLoading(false)
            console.warn("Error adding user: ", err)
        }
    }

    const login = async () => {
        try {
            setIsLoading(true)
            if (email.length > 0 && password.length > 0) {
                const loginUser = await instance.post("Login", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": true,
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: { email, password },
                })
                if (loginUser.data) {
                    const token = loginUser.data[0]
                    const userInfo = loginUser.data[1]

                    setUser(userInfo)
                    setToken(token)
                    AsyncStorage.setItem("token", token)
                    AsyncStorage.setItem("name", userInfo.name)
                    AsyncStorage.setItem("user", JSON.stringify(userInfo))
                    setIsLoading(false)
                } else setIsLoading(false)
            } else {
                Alert.alert(
                    "Missing/Incorrect Credentials",
                    "Please enter the correct email and password.",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                setEmail("")
                                noHandler()
                            },
                        },
                    ],
                )
                throw "Please enter an email and password."
            }
        } catch (err) {
            setIsLoading(false)
            console.warn("Error logging in:", err)
        }
    }
    const logout = async () => {
        setIsLoading(true)
        setToken(null)
        AsyncStorage.removeItem("token")
        AsyncStorage.removeItem("name")
        AsyncStorage.removeItem("user")
        setIsLoading(false)
        setUser({ totalNot: 0 })
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem("token")
            let username = await AsyncStorage.getItem("name")
            let userInfo = await AsyncStorage.getItem("user")
            setToken(userToken)
            setName(username)

            if (!JSON.parse(userInfo)) setUser({ totalNot: 0 })
            else setUser(JSON.parse(userInfo))

            setIsLoading(false)
        } catch (err) {
            console.warn(`IsLoggedIn error: ${err}`)
        }
    }

    useEffect(() => {
        if (user != null)
            if (Object.keys(user).length !== 0)
                AsyncStorage.setItem("user", JSON.stringify(user))
    }, [user])

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                users,
                find,
                setFind,
                setUsers,
                login,
                logout,
                register,
                isLoading,
                token,
                setUser,
                setName,
                setEmail,
                setPassword,
                name,
                email,
                password,
                passwordConfirm,
                setPasswordConfirm,
                user,
                instance,
                receivers,
                setReceivers,
                chatroomId,
                setChatroomId,
                chatroom,
                setChatroom,
                sendPushNotification,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const registerForPushNotificationsAsync = async () => {
    let token
    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!")
            return
        }
        token = (await Notifications.getExpoPushTokenAsync()).data
    } else {
        alert("Must use physical device for Push Notifications")
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        })
    }
    return token
}
