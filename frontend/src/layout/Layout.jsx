import "react"
import {SignedIn, SignedOut, UserButton} from "@clerk/clerk-react"
import {Outlet, Link, Navigate} from "react-router-dom"

//layout component is a wrapper for app's main pages, provides a consistent structure like a header and nav bar that appears on multiple pages
export function Layout() {
    {/*layout component returns two things, a header and a navigation bar*/}
    return <div className="app-layout">
        <header className="app-header">
            <div className="header-content">
                <h1>Code Challenge Generator</h1>
                {/*nav bar that is shown if we are signed in*/}
                <nav>
                    <SignedIn>
                        <Link to="/">Generate Challenge</Link>
                        <Link to="/history">History</Link>
                        {/*User Button that is a component i8mported from clerk-react*/}
                        <UserButton/>
                    </SignedIn>
                </nav>
            </div>
        </header>

        {/*main is just the main content of your page, just like a div*/}
        <main classname="app-main">
            {/*if the user is signed out, navigate them to the sign in page */}
            <SignedOut>
                <Navigate to="/sign-in" replace/>
            </SignedOut>
            <SignedIn>
                {/*outlet keyword: "put the content of the current child route here (in App.jsx, this either / or /history)" */}
                <Outlet />
            </SignedIn>
        </main>
    </div>

}