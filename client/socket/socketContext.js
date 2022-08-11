import { io } from "socket.io-client"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext, uri } from "../context/AuthContext"
import { Alert } from "react-native"
export const SocketContext = createContext()

const socket = io(uri, {
    path: "/socket.io",
    multiplex: false,
})

export const SocketProvider = ({ children }) => {
    const { setUser, user, sendPushNotification } = useContext(AuthContext)
    const [sentMessage, setSentMessage] = useState(false)

    useEffect(() => {
        socket.on("connect", () => {
            try {
                socket.send("connected")
            } catch (err) {
                Alert.alert(`Connection Error: ${err}`)
            }
        })
        return () => socket.off("connect")
    })

    const sendNotification = async (user) => {
        await sendPushNotification(user.expoToken, {
            title: `New Friend Request`,
            message: `You've received a request from: ${
                user.requests[user.request.length - 1]
            }`,
        })
    }

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            let count = 0
            if (count == 0)
                socket.on("request-received" + user._id.$oid, (userData) => {
                    let currentUser = JSON.parse(userData)
                    sendNotification()
                    currentUser[0].totalNot = (user.totalNot || 0) + 1
                    setUser(currentUser[0])
                    count = 1
                })
            return () => socket.off("request-received" + user._id.$oid)
        }
    })
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            socket.on("request-sent" + user._id.$oid, (userData) => {
                let currentUser = JSON.parse(userData)

                setUser(currentUser[0])
            })
            return () => socket.off("request-sent" + user._id.$oid)
        }
    })
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            socket.on("accepted-request" + user._id.$oid, (userData) => {
                let currentUser = JSON.parse(userData)
                currentUser[0].totalNot = (user.totalNot || 0) - 1
                setUser(currentUser[0])
            })
            return () => socket.off("accepted-request" + user._id.$oid)
        }
    })

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            socket.on("request-accepted" + user._id.$oid, (userData) => {
                let currentUser = JSON.parse(userData)
                setUser(currentUser[0])
            })
            return () => socket.off("request-accepted" + user._id.$oid)
        }
    })
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            socket.on("message-received" + user.email, (data) => {
                try {
                    for (let recipient of data.recipients) {
                        if (user._id.$oid === recipient._id.$oid) {
                            setUser(recipient)
                            sendPushNotification(user.expoToken, {
                                title: data.sender,
                                message: data.message,
                            })
                        }
                    }
                } catch (err) {
                    Alert.alert(`Error receiving messages: ${err}`)
                }
            })
            return () => socket.off("message-received" + user.email)
        }
    })
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            socket.on("sent-message" + user._id.$oid, (data) => {
                try {
                    setUser(JSON.parse(data.user)[0])
                } catch (err) {
                    Alert.alert(`Error sending message: ${err}`)
                }
            })
            return () => socket.off("sent-message" + user._id.$oid)
        }
    })

    const sendMessage = (content) => {
        try {
            setSentMessage(!sentMessage)
            socket.emit("message-sent", JSON.stringify(content))
        } catch (err) {
            Alert.alert(`Error sending message: ${err}`)
        }
    }
    return (
        <SocketContext.Provider value={{ socket, sendMessage }}>
            {children}
        </SocketContext.Provider>
    )
}
