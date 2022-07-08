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
            console.log("connected")
        } catch (err) {
            console.log("ERROR: ", err)
        }
    })

    const sendMessage = () => {
        socket.on("message", (msg) => {
            console.log("message  sent: ", msg)
        })
    }
    return (
        <SocketContext.Provider value={{ socket, sendMessage }}>
            {children}
        </SocketContext.Provider>
    )
}
