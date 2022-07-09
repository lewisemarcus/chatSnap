import { io } from "socket.io-client"
import { createContext, useEffect } from "react"
import { uri } from "../context/AuthContext"

export const SocketContext = createContext()

const socket = io(uri, {
    path: "/socket.io",
    multiplex: false,
})

export const SocketProvider = ({ children }) => {
    socket.on("connect", () => {
        try {
            socket.send("connected")
        } catch (err) {
            console.log("CONNECTION ERROR: ", err)
        }
    })

    socket.on("message-event", (data) => {
        try {
            console.log(data)
        } catch (err) {
            console.log("MESSAGE EVENT ERROR: ", err)
        }
    })

    const sendMessage = (content) => {
        try {
            console.log("Content", content)
        } catch (err) {
            console.log("SEND MESSAGE ERROR: ", err)
        }
        socket.emit("message-event", JSON.stringify(content))
    }
    return (
        <SocketContext.Provider value={{ socket, sendMessage }}>
            {children}
        </SocketContext.Provider>
    )
}
