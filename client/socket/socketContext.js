import { io } from "socket.io-client"
import { createContext, useContext, useEffect } from "react"
import { AuthContext, uri } from "../context/AuthContext"

export const SocketContext = createContext()

const socket = io(uri, {
    path: "/socket.io",
    multiplex: false,
})

export const SocketProvider = ({ children }) => {
    const { setUser, user } = useContext(AuthContext)

    socket.on("connect", () => {
        try {
            socket.send("connected")
            socket.join("chatroom")
        } catch (err) {
            console.log("CONNECTION ERROR: ", err)
        }
    })
    if (user._id !== undefined) {
        socket.on("request-received" + user._id.$oid, (userData) => {
            let currentUser = JSON.parse(userData)
            setUser(currentUser[0])
        })

        socket.on("request-sent" + user._id.$oid, (userData) => {
            let currentUser = JSON.parse(userData)
            setUser(currentUser[0])
        })
        socket.on("accepted-request" + user._id.$oid, (userData) => {
            let currentUser = JSON.parse(userData)
            setUser(currentUser[0])
        })

        socket.on("request-accepted" + user._id.$oid, (userData) => {
            let currentUser = JSON.parse(userData)
            setUser(currentUser[0])
        })

        for (let chatroom of user.chatrooms) {
            socket.on("message-received" + chatroom.uid.toString(), (data) => {
                try {
                    for (let recipient of data.recipients) {
                        if (user._id.$oid === recipient._id.$oid)
                            setUser(recipient)
                    }
                } catch (err) {
                    console.log("MESSAGE EVENT ERROR: ", err)
                }
            })
        }

        socket.on("sent-message" + user._id.$oid, (data) => {
            try {
                console.log("hello there")
                setUser(JSON.parse(data)[0])
            } catch (err) {
                console.log("MESSAGE EVENT ERROR: ", err)
            }
        })
    }

    const sendMessage = (content) => {
        try {
            console.log("Content>", content)
            socket.to("chatroom").emit("message-sent", JSON.stringify(content))
        } catch (err) {
            console.log("SEND MESSAGE ERROR: ", err)
        }
    }
    return (
        <SocketContext.Provider value={{ socket, sendMessage }}>
            {children}
        </SocketContext.Provider>
    )
}
