import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { useUserData } from "@/context/UserDataProvider";

export default function Header() {
    const { userData, userDataLoading } = useUserData();
    const [signOut, signOutLoading] = useSignOut(auth);

    const router = useRouter();

    return (
        <header
            className={
                router.pathname === "/dashboard" ? "bg-zinc-900" : "bg-white"
            }
        >
            <nav
                className={`h-12 px-4 flex items-center gap-4 ${
                    router.pathname === "/dashboard"
                        ? "text-zinc-300"
                        : "mx-auto max-w-screen-xl text-zinc-900"
                }`}
            >
                <Link
                    className={`text-sm font-sans font-bold mr-auto`}
                    href="/"
                >
                    Polyglot Dream
                </Link>
                {userData?.role.admin && (
                    <Link className="text-xs" href="/dashboard">
                        Dashboard
                    </Link>
                )}

                {userDataLoading || signOutLoading ? (
                    <div className="text-xs">Loading...</div>
                ) : userData ? (
                    <button className="text-xs" onClick={signOut}>
                        Sign Out
                    </button>
                ) : (
                    <Link className="text-xs" href="/login">
                        Log In
                    </Link>
                )}
            </nav>
        </header>
    );
}
