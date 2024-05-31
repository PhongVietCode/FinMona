import { useState } from "react"
import { SplashScreen } from "./SplashScreen"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const SplashScreenContainer = () => {
    const [isLoading, setIsLoading] = useState(false)
    return <SplashScreen/>
}