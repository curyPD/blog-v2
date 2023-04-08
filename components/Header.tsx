import Link from "next/link";
import Image from "next/image";
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
                    className={`mr-auto flex items-center gap-3 focus:outline-none focus-visible:ring-1 ${
                        router.pathname === "/dashboard"
                            ? "focus-visible:ring-white focus-visible:ring-offset-zinc-900"
                            : "focus-visible:ring-zinc-900 focus-visible:ring-offset-white"
                    } focus-visible:ring-offset-2`}
                    href="/"
                >
                    <Image
                        src={
                            router.pathname === "/dashboard"
                                ? "/logo-light.png"
                                : "/logo.png"
                        }
                        alt="Polyglot Dream logo"
                        width={56}
                        height={56}
                        className="h-6 w-auto"
                    />
                    <span className="hidden text-sm font-extrabold xs:inline lg:text-base">
                        Polyglot Dream
                    </span>
                </Link>
                {userData?.role.admin && (
                    <Link
                        className={`text-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 ${
                            router.pathname === "/dashboard"
                                ? "hover:text-white focus-visible:ring-white focus-visible:ring-offset-zinc-900"
                                : "hover:text-zinc-600 focus-visible:ring-zinc-900 focus-visible:ring-offset-white"
                        } focus-visible:ring-offset-2 lg:text-sm`}
                        href="/dashboard"
                    >
                        Dashboard
                    </Link>
                )}

                {userDataLoading || signOutLoading ? (
                    <div className="text-xs lg:text-sm">Loading...</div>
                ) : userData ? (
                    <button
                        className={`text-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 ${
                            router.pathname === "/dashboard"
                                ? "hover:text-white focus-visible:ring-white focus-visible:ring-offset-zinc-900"
                                : "hover:text-zinc-600 focus-visible:ring-zinc-900 focus-visible:ring-offset-white"
                        } focus-visible:ring-offset-2 lg:text-sm`}
                        onClick={signOut}
                    >
                        Sign Out
                    </button>
                ) : (
                    <Link
                        className={`text-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 ${
                            router.pathname === "/dashboard"
                                ? "hover:text-white focus-visible:ring-white focus-visible:ring-offset-zinc-900"
                                : "hover:text-zinc-600 focus-visible:ring-zinc-900 focus-visible:ring-offset-white"
                        } focus-visible:ring-offset-2 lg:text-sm`}
                        href="/login"
                    >
                        Log In
                    </Link>
                )}
            </nav>
        </header>
    );
}
