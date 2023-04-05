import { useDashboard } from "@/context/DashboardProvider";
import { HiOutlineTrash, HiOutlineArrowUpTray } from "react-icons/hi2";

export default function DashboardEditorFooter() {
    const { handleSubmit, REDUCER_ACTION_TYPE, state, dispatch, lastModified } =
        useDashboard();

    const lastModifiedDate =
        lastModified &&
        new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "short",
        }).format(new Date(lastModified));

    return (
        <div className="sticky bottom-0 z-10 flex items-center gap-6 border-t border-zinc-300 bg-white py-2 px-4">
            {lastModifiedDate && (
                <div
                    aria-label={`Last published ${lastModifiedDate}`}
                    title={`Last published ${lastModifiedDate}`}
                    className="-ml-2 flex cursor-default items-center gap-2 rounded-sm p-3 text-green-800 hover:bg-green-100 hover:text-green-900"
                >
                    <HiOutlineArrowUpTray className="h-4 w-4" />
                    <span className="text-xs font-semibold">
                        {lastModifiedDate}
                    </span>
                </div>
            )}
            <button
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-sm border bg-green-500 py-2 px-5 hover:bg-green-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 lg:gap-4 lg:px-9"
            >
                <HiOutlineArrowUpTray className="h-5 w-5 text-green-100" />
                <span className="text-sm font-semibold text-white lg:text-base">
                    Publish
                </span>
            </button>
            {state.selectedArticleId &&
                state.selectedArticleId !== "fakeId" && (
                    <button
                        onClick={() =>
                            dispatch({
                                type: REDUCER_ACTION_TYPE.STAGE_ARTICLE_DELETE,
                                payload: {
                                    ...state,
                                    articleIdToDelete: state.selectedArticleId,
                                },
                            })
                        }
                        className="group ml-auto flex items-center gap-2 rounded-sm border border-red-700 bg-transparent py-2 px-2 hover:border-red-600 hover:bg-red-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 xs:px-5 lg:gap-4 lg:px-9"
                    >
                        <HiOutlineTrash className="h-5 w-5 text-red-700 group-hover:text-white" />
                        <span className="hidden text-sm text-red-700 group-hover:text-white xs:inline-block lg:text-base">
                            Delete
                        </span>
                    </button>
                )}
        </div>
    );
}
