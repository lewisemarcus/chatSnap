import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { AuthProvider } from "./context/AuthContext"

import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"

export default function App() {
    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <AuthProvider>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </SafeAreaProvider>
            </AuthProvider>
        )
    }
}
