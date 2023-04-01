import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { useUserData } from "@/context/UserDataProvider";
import {
    HiOutlineArrowLeftOnRectangle,
    HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

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
                className={`flex h-12 items-center gap-4 px-4 ${
                    router.pathname === "/dashboard"
                        ? "text-zinc-200"
                        : "mx-auto max-w-screen-xl text-zinc-900"
                }`}
            >
                <Link
                    className={`mr-auto font-sans text-sm font-bold`}
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
                    <button
                        className="flex items-center gap-2"
                        onClick={signOut}
                    >
                        <span className="text-xs">Sign Out</span>
                        <HiOutlineArrowRightOnRectangle className="h-4 w-4" />
                    </button>
                ) : (
                    <Link className="flex items-center gap-2" href="/login">
                        <span className="text-xs">Log In</span>
                        <HiOutlineArrowLeftOnRectangle className="h-4 w-4" />
                    </Link>
                )}
            </nav>
        </header>
    );
}
