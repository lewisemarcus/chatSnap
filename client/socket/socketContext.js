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
        } catch (err) {
            console.log("CONNECTION ERROR: ", err)
        }
    })

    socket.on("request-received", (userData) => {
        currentUser = JSON.parse(userData)
        if (user.email === currentUser[0].email) setUser(currentUser[0])
    })

    socket.on("request-sent", (userData) => {
        currentUser = JSON.parse(userData)
        if (user.email === currentUser[0].email) setUser(currentUser[0])
    })
    socket.on("accepted-request", (userData) => {
        currentUser = JSON.parse(userData)
        if (user.email === currentUser[0].email) setUser(currentUser[0])
    })
    socket.on("request-accepted", (userData) => {
        currentUser = JSON.parse(userData)
        if (user.email === currentUser[0].email) setUser(currentUser[0])
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
