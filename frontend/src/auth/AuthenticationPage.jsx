import "react"
import {SignIn, SignUp, SignedIn, SignedOut} from "@clerk/clerk-react"

export function AuthenticationPage() {
    return <div className="auth-container">

        {/* renders only if Clerk checks the user is not signed in */}
        <SignedOut>
            <SignIn routing="path" path="/sign-in" />
            <SignUp routing="path" path="/sign-up" />
        </SignedOut>

        {/* renders only if Clerk checks the user is signed in */}
        <SignedIn>
            <div className="redirect-message">
                <p>You are already signed in!</p>
            </div>
        </SignedIn>    
    </div>

}