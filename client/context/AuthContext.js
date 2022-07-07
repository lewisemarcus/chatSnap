import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { createContext, useState, useEffect } from "react"
import { Alert } from "react-native"
import axios from "axios"
import Constants from "expo-constants"
const { manifest } = Constants
let uri
// Checks if on web or on android/ios dev
if (manifest.debuggerHost !== undefined)
    uri = `http://${manifest.debuggerHost.split(":").shift()}:5000`
else uri = "http://127.0.0.1:5000"

const config = { timeout: 5000, baseURL: uri }
const instance = axios.create(config)

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [user, setUser] = useState({})

    const noHandler = () => {
        setName("")
        setEmail("")
        setPassword("")
        setPasswordConfirm("")
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
                const registerUser = await instance.post("Register", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": true,
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: { name, email, password },
                })
                if (registerUser.data) {
                    const token = registerUser.data[0]
                    const userInfo = registerUser.data[1]
                    setUser(userInfo)
                    setToken(token)
                    AsyncStorage.setItem("token", token)
                    setIsLoading(false)
                } else setIsLoading(false)
            } else {
                Alert.alert(
                    "Missing Credentials",
                    "Please enter all required credentials.",
                    [{ text: "OK", onPress: () => noHandler() }],
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
                    setIsLoading(false)
                } else setIsLoading(false)
            } else {
                Alert.alert(
                    "Missing/Incorrect Credentials",
                    "Please enter the correct email and password.",
                    [{ text: "OK", onPress: () => noHandler() }],
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
        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userToken = AsyncStorage.getItem("token")
            if (typeof userToken == "object") setToken(await userToken)
            if (typeof userToken == "string") setToken(userToken)
            setIsLoading(false)
        } catch (err) {
            console.warn(`IsLoggedIn error: ${err}`)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                register,
                isLoading,
                token,
                setName,
                setEmail,
                setPassword,
                name,
                email,
                password,
                passwordConfirm,
                setPasswordConfirm,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
