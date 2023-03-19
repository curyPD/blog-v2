import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUserData } from "@/context/UserDataProvider";

export default function Dashboard() {
    const { userData, userDataLoading } = useUserData();

    const router = useRouter();

    if (userDataLoading) {
        return <div>Loading...</div>;
    }
    if (!userData) {
        typeof window !== "undefined" && router.push("/");
        return <div>No users here</div>;
    }
    return <div>Dashboard</div>;
}
