//function that allows us to send a request with the clerk token to our backend

import {useAuth} from "@clerk/clerk-react"

export const useApi = () => {
    const {getToken} = useAuth() //a custom clerk hook to get the clerk token
    
    const makeRequest = async(endpoint, options = {}) => {
        const token = await getToken()

        const defaultOptions = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ${token}'
            }
        }

        const response = await fetch('http://localhost:8000/api/${endpoint}', {
            /*
            the three dots is the spread operators, we combine the two objects by spreading their properties.
            any key-value pairs that are not in 'options' we replace with the ones in 'defaultOptions'
            */
            ...defaultOptions,
            ...options,
        })
    }

}
