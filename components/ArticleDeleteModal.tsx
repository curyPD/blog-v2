import { MouseEvent } from "react";
import { useDashboard } from "@/context/DashboardProvider";
import { HiOutlineXMark } from "react-icons/hi2";

export default function ArticleDeleteModal() {
    const { state, REDUCER_ACTION_TYPE, dispatch, handleDeleteArticle } =
        useDashboard();
    return (
        <div
            onClick={() => {
                dispatch({
                    type: REDUCER_ACTION_TYPE.CANCEL_ARTICLE_DELETE,
                });
            }}
            className="absolute z-30 h-full w-full bg-zinc-600/50"
        >
            <div
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                }}
                className="absolute top-1/2 left-1/2 w-5/6 max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-md border-zinc-200 bg-white shadow-lg lg:max-w-2xl"
            >
                <div className="flex items-center justify-between py-2 px-5">
                    <p className="text-sm font-semibold text-zinc-900 lg:text-base">
                        Delete article?
                    </p>
                    <button
                        onClick={() =>
                            dispatch({
                                type: REDUCER_ACTION_TYPE.CANCEL_ARTICLE_DELETE,
                            })
                        }
                        className="group group flex h-9 w-9 items-center justify-center rounded-sm hover:bg-zinc-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900"
                    >
                        <HiOutlineXMark className="h-5 w-5 text-zinc-600 lg:h-6 lg:w-6" />
                    </button>
                </div>
                <div className="border-y border-zinc-300 px-5 py-4 text-sm text-zinc-900 lg:text-base">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                        &quot;{state.title}&quot;
                    </span>
                    ?
                </div>
                <div className="flex gap-3 py-3 px-5">
                    <button
                        onClick={() =>
                            dispatch({
                                type: REDUCER_ACTION_TYPE.CANCEL_ARTICLE_DELETE,
                            })
                        }
                        className="flex-1 rounded-sm border border-zinc-300 py-1 text-sm font-semibold text-zinc-500 hover:bg-zinc-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 lg:text-base"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() =>
                            handleDeleteArticle(state.articleIdToDelete)
                        }
                        className="flex-1 rounded-sm bg-red-600 py-1 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 lg:text-base"
                    >
                        Delete now
                    </button>
                </div>
            </div>
        </div>
    );
}
