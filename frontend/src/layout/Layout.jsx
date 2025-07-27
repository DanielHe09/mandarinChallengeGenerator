import "react"
import {SignedIn, SignedOut, UserButton} from "@clerk/clerk-react"
import {Outlet, Link, Navigate} from "react-router-dom"

export function Layout() {
    return <div className="app-layout">
        <header className="app-header">
            <div className="header-content">
                <h1>Code Challenge Generator</h1>
                <nav>
                    {/*nav bar that is shown if we are signed in*/}
                    <SignedIn>
                        <Link to="/">Generate Challenge</Link>
                        <Link to="/history">History</Link>
                        {/*User Button that is a component i8mported from clerk-react*/}
                        <UserButton/>
                    </SignedIn>
                </nav>
            </div>
        </header>

        <main classname="app-main">
            <SignedOut>
                <Navigate to="/sign-in" replace/>
            </SignedOut>
            <SignedIn>
                <Outlet />
            </SignedIn>
        </main>
    </div>

}