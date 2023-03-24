import { useRouter } from "next/router";
import { useUserData } from "@/context/UserDataProvider";
import { useDashboard } from "@/hooks/useDashboard";
// import Tiptap from "@/components/TipTap";
// import { ArticleType } from "@/types";

export default function Dashboard() {
    const { userData, userDataLoading } = useUserData();
    const router = useRouter();
    const { state, handleTitleChange } = useDashboard();

    // if (userDataLoading) {
    //     return <div>Loading...</div>;
    // }
    // if (!userData) {
    //     typeof window !== "undefined" && router.push("/");
    //     return <div>No users here</div>;
    // }

    return (
        <main>
            <h1>Dashboard</h1>
            <input
                type="text"
                className="border border-black"
                value={state.title}
                onChange={handleTitleChange}
            />
        </main>
    );
}
