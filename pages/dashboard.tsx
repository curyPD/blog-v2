import { useRouter } from "next/router";
import { useUserData } from "@/context/UserDataProvider";
import { useDashboard } from "@/context/DashboardProvider";

import DashboardArticles from "@/components/DashboardArticles";
import DashboardEditor from "@/components/DashboardEditor";

export default function Dashboard() {
    const { userData, userDataLoading } = useUserData();
    const router = useRouter();

    const { state } = useDashboard();
    if (userDataLoading) {
        return <div>Loading...</div>;
    }
    if (!userData) {
        typeof window !== "undefined" && router.push("/");
        return <div>No users here</div>;
    }

    return (
        <main>
            <div className="flex">
                <div
                    className={`${
                        state.selectedArticleId ? "hidden" : "block"
                    } lg:block`}
                >
                    <DashboardArticles />
                </div>
                <div
                    className={`${
                        state.selectedArticleId ? "block" : "hidden"
                    } lg:block`}
                >
                    <DashboardEditor />
                </div>
            </div>
        </main>
    );
}
