import { auth } from "../firebase/firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import Link from "next/link";

export default function Header() {
    const [user, loading, error] = useAuthState(auth);
    const [signOut, signOutLoading] = useSignOut(auth);

    return (
        <header className="bg-green-200 flex items-center p-3">
            {loading || signOutLoading ? (
                <div>Loading...</div>
            ) : user ? (
                <button onClick={signOut}>Sign Out</button>
            ) : (
                <Link href="/login">Log In</Link>
            )}
            {error && <div className="absolute">Error: {error.message}</div>}
        </header>
    );
}
