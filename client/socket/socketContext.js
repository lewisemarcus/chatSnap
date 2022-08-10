import { io } from "socket.io-client"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext, uri } from "../context/AuthContext"

export const SocketContext = createContext()

const socket = io(uri, {
    path: "/socket.io",
    multiplex: false,
})
console.log(Object.keys(socket))
export const SocketProvider = ({ children }) => {
    const { setUser, user, setChatroom } = useContext(AuthContext)
    const [sentMessage, setSentMessage] = useState(false)

    useEffect(() => {
        socket.on("connect", () => {
            try {
                socket.send("connected")
            } catch (err) {
                console.log("CONNECTION ERROR: ", err)
            }
        })
        return () => socket.off("connect")
    })

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            let count = 0
            if (count == 0)
                socket.on("request-received" + user._id.$oid, (userData) => {
                    let currentUser = JSON.parse(userData)

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
                            console.log(5, user.email)
                            setUser(recipient)
                        }
                    }
                } catch (err) {
                    console.log("MESSAGE EVENT ERROR: ", err)
                }
            })
            return () => socket.off("message-received" + user.email)
        }
    })
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            socket.on("sent-message" + user._id.$oid, (data) => {
                try {
                    console.log(6, user.email)
                    setUser(JSON.parse(data.user)[0])
                } catch (err) {
                    console.log("MESSAGE EVENT ERROR: ", err)
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
            console.log("SEND MESSAGE ERROR: ", err)
        }
    }
    return (
        <SocketContext.Provider value={{ socket, sendMessage }}>
            {children}
        </SocketContext.Provider>
    )
}
