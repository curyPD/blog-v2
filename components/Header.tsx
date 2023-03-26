import Link from "next/link";
import { auth } from "../firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { useUserData } from "@/context/UserDataProvider";

export default function Header() {
    const { userData, userDataLoading } = useUserData();
    const [signOut, signOutLoading] = useSignOut(auth);

    return (
        <header>
            <nav className="h-10 mx-auto max-w-screen-xl px-3 flex items-center gap-4">
                <Link className="text-sm text-black font-bold mr-auto" href="/">
                    Polyglot Dream
                </Link>
                {userData?.role.admin && (
                    <Link className="text-xs text-black" href="/dashboard">
                        Dashboard
                    </Link>
                )}

                {userDataLoading || signOutLoading ? (
                    <div className="text-xs text-neutral-400">Loading...</div>
                ) : userData ? (
                    <button className="text-xs text-black" onClick={signOut}>
                        Sign Out
                    </button>
                ) : (
                    <Link className="text-xs text-black" href="/login">
                        Log In
                    </Link>
                )}
            </nav>
        </header>
    );
}
