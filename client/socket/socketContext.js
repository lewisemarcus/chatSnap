import { io } from "socket.io-client"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext, uri } from "../context/AuthContext"

export const SocketContext = createContext()

const socket = io(uri, {
    path: "/socket.io",
    multiplex: false,
})

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
    }, [])

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            let count = 0
            if (count == 0)
                socket.on("request-received" + user._id.$oid, (userData) => {
                    let currentUser = JSON.parse(userData)
                    setUser(currentUser[0])
                    count = 1
                })
        }
    })
    useEffect(() => {
        let count = 0
        if (Object.keys(user).length > 0) {
            if (count == 0)
                socket.on("request-sent" + user._id.$oid, (userData) => {
                    let currentUser = JSON.parse(userData)
                    setUser(currentUser[0])
                    count = 1
                })
        }
    })
    useEffect(() => {
        if (Object.keys(user).length > 0) {
            let count = 0
            if (count == 0)
                socket.on("accepted-request" + user._id.$oid, (userData) => {
                    let currentUser = JSON.parse(userData)
                    setUser(currentUser[0])
                    count = 1
                })
        }
    })

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            socket.on("request-accepted" + user._id.$oid, (userData) => {
                let currentUser = JSON.parse(userData)
                setUser(currentUser[0])
            })
        }
    })

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            socket.on("sent-message" + user._id.$oid, (data) => {
                try {
                    setUser(JSON.parse(data.user)[0])
                } catch (err) {
                    console.log("MESSAGE EVENT ERROR: ", err)
                }
            })
        }
    }, [sentMessage])
    useEffect(() => {
        let count = 0
        if (Object.keys(user).length > 0) {
            socket.on("message-received" + user.email, (data) => {
                if (count == 0)
                    try {
                        for (let recipient of data.recipients) {
                            if (user._id.$oid === recipient._id.$oid) {
                                setUser(recipient)
                            }
                        }
                        count = 1
                    } catch (err) {
                        console.log("MESSAGE EVENT ERROR: ", err)
                    }
            })
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
