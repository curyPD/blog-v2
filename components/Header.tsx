import Link from "next/link";
import { auth } from "../firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { useUserData } from "@/context/UserDataProvider";

export default function Header() {
    const { userData, userDataLoading } = useUserData();
    const [signOut, signOutLoading] = useSignOut(auth);

    return (
        <header className="bg-green-200 flex items-center justify-between p-3">
            <div className="flex items-center gap-4">
                <Link href="/">Home</Link>
                {userData?.role.admin && (
                    <Link href="/dashboard">Dashboard</Link>
                )}
            </div>
            {userDataLoading || signOutLoading ? (
                <div>Loading...</div>
            ) : userData ? (
                <button onClick={signOut}>Sign Out</button>
            ) : (
                <Link href="/login">Log In</Link>
            )}
        </header>
    );
}
