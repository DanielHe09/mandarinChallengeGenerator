//custom-made react hook that allows us to send a request with the clerk token to our backend

import {useAuth} from "@clerk/clerk-react"
const API_BASE = import.meta.env.VITE_API_BASE_URL

export const useApi = () => {
    const {getToken} = useAuth() //a custom clerk hook to get the clerk token
    
    const makeRequest = async(endpoint, options = {}) => {
        const token = await getToken()

        const defaultOptions = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        //get make request and get request from backend
        const response = await fetch(`${API_BASE}/api/${endpoint}`, {
            /*
            the three dots is the spread operators, we combine the two objects by spreading their properties.
            any key-value pairs that are not in 'options' we replace with the ones in 'defaultOptions'
            */
            ...defaultOptions,
            ...options,
        })

        if (!response.ok) {
            //if parsing of response json fails, catches error and returns null
            const errorData = await response.json().catch(() => null)
            if (response.status === 429) {
                throw new Error("Daily quota exceeded")
            }
            throw new Error(errorData?.detail || "An error occurred")
        }

        return response.json()

    }

    //making our useApi() hook flexible for future, this makes the makeRequest function available in other 
    return {makeRequest}

}
