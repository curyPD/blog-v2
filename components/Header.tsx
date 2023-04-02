import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { useUserData } from "@/context/UserDataProvider";
// import {
//     HiOutlineArrowLeftOnRectangle,
//     HiOutlineArrowRightOnRectangle,
// } from "react-icons/hi2";

export default function Header() {
    const { userData, userDataLoading } = useUserData();
    const [signOut, signOutLoading] = useSignOut(auth);

    const router = useRouter();
    return (
        <header
            className={
                router.pathname === "/dashboard"
                    ? "bg-zinc-900"
                    : "border-b border-zinc-200 bg-white"
            }
        >
            <nav
                className={`flex h-12 items-center gap-4 px-4 lg:h-14 lg:gap-5 ${
                    router.pathname === "/dashboard"
                        ? "text-zinc-200"
                        : "container mx-auto text-zinc-900 xs:px-6 lg:px-9 xl:max-w-screen-xl 2xl:px-0"
                }`}
            >
                <Link
                    className={`mr-auto font-sans text-sm font-extrabold tracking-tight lg:text-base`}
                    href="/"
                >
                    Polyglot Dream
                </Link>
                {userData?.role.admin && (
                    <Link className="text-xs lg:text-sm" href="/dashboard">
                        Dashboard
                    </Link>
                )}

                {userDataLoading || signOutLoading ? (
                    <div className="text-xs lg:text-sm">Loading...</div>
                ) : userData ? (
                    <button
                        className="flex items-center gap-2"
                        onClick={signOut}
                    >
                        <span className="text-xs lg:text-sm">Sign Out</span>
                        {/* <HiOutlineArrowRightOnRectangle className="h-4 w-4" /> */}
                    </button>
                ) : (
                    <Link className="flex items-center gap-2" href="/login">
                        <span className="text-xs lg:text-sm">Log In</span>
                        {/* <HiOutlineArrowLeftOnRectangle className="h-4 w-4" /> */}
                    </Link>
                )}
            </nav>
        </header>
    );
}
