import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { AuthProvider } from "./context/AuthContext"
import { SocketProvider } from "./socket/SocketContext"
import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"
import firebaseConfig from "./firebaseConfig"
import { initializeApp } from "firebase/app"

initializeApp(firebaseConfig)
export default function App() {
    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <SafeAreaProvider>
                <AuthProvider>
                    <SocketProvider>
                        <Navigation colorScheme={colorScheme} />
                        <StatusBar />
                    </SocketProvider>
                </AuthProvider>
            </SafeAreaProvider>
        )
    }
}
