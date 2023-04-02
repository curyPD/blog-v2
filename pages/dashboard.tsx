import { useRouter } from "next/router";
import { useUserData } from "@/context/UserDataProvider";

import DashboardArticles from "@/components/DashboardArticles";
import DashboardEditor from "@/components/DashboardEditor";

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

    return (
        <main className="h-[calc(100vh-48px)] overflow-hidden md:flex lg:h-[calc(100vh-56px)]">
            <DashboardArticles />
            <DashboardEditor />
        </main>
    );
}
