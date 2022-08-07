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

    socket.on("request-received" + user.id, (userData) => {
        currentUser = JSON.parse(userData)
        console.log(currentUser)
        if (user.email === currentUser[0].email) setUser(currentUser[0])
    })

    socket.on("request-sent" + user.id, (userData) => {
        currentUser = JSON.parse(userData)
        console.log(currentUser)
        if (user.email === currentUser[0].email) setUser(currentUser[0])
    })
    socket.on("accepted-request" + user.id, (userData) => {
        currentUser = JSON.parse(userData)
        console.log(currentUser[0].email, user.email)
        if (user.email === currentUser[0].email) setUser(currentUser[0])
    })
    socket.on("request-accepted" + user.id, (userData) => {
        currentUser = JSON.parse(userData)
        console.log(currentUser[0].email, user.email, 2)
        if (user.email === currentUser[0].email) setUser(currentUser[0])
    })

    // for (let chatroom of user.chatrooms)
    socket.on("message-received", (data) => {
        try {
            console.log("data>", data)
        } catch (err) {
            console.log("MESSAGE EVENT ERROR: ", err)
        }
    })
    socket.on("sent-message", (data) => {
        try {
            console.log("data>", data)
        } catch (err) {
            console.log("MESSAGE EVENT ERROR: ", err)
        }
    })

    const sendMessage = (content) => {
        try {
            console.log("Content>", content)
            socket.emit("message-sent", JSON.stringify(content))
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
