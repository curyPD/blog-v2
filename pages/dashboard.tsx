import { useRouter } from "next/router";
import { useUserData } from "@/context/UserDataProvider";
import { useDashboard } from "@/context/DashboardProvider";
import Message from "@/components/Message";

import DashboardArticles from "@/components/DashboardArticles";
import DashboardEditor from "@/components/DashboardEditor";

export default function Dashboard() {
    const { userData, userDataLoading } = useUserData();
    const router = useRouter();
    const { state, REDUCER_ACTION_TYPE, dispatch } = useDashboard();

    if (userDataLoading) {
        return <div>Loading...</div>;
    }
    if (!userData) {
        typeof window !== "undefined" && router.push("/");
        return <div>No users here</div>;
    }

    return (
        <>
            <Message
                isError={true}
                text={state.errorMessage}
                inProp={state.errorMessageInProp}
                onEntered={() => {
                    setTimeout(() => {
                        dispatch({
                            type: REDUCER_ACTION_TYPE.HIDE_ERROR_MESSAGE,
                        });
                    }, 7000);
                }}
            />
            <Message
                isError={false}
                text={state.successMessage}
                inProp={state.successMessageInProp}
                onEntered={() => {
                    setTimeout(() => {
                        dispatch({
                            type: REDUCER_ACTION_TYPE.HIDE_SUCCESS_MESSAGE,
                        });
                    }, 4000);
                }}
            />
            <main className="h-[calc(100vh-48px)] overflow-hidden md:flex lg:h-[calc(100vh-56px)]">
                <DashboardArticles />
                <DashboardEditor />
            </main>
        </>
    );
}
