import {ClerkProvider} from "@clerk/clerk-react"
import {Routes, Route, BrowserRouter} from "react-router-dom"

// Import our Publishable Key from the .env file
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

//initializing the clerkProvider object, which allows any resources or routes in 'children' to use the clerk components and functions
export default function ClerkProviderWithRoutes({children}) {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <BrowserRouter>{children}</BrowserRouter>
        </ClerkProvider>
    )
}