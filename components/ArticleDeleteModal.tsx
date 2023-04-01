import { MouseEvent } from "react";
import { useDashboard } from "@/context/DashboardProvider";
import { HiXMark } from "react-icons/hi2";

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
                className="absolute top-1/2 left-1/2 w-5/6 max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-md border-zinc-200 bg-white shadow-lg"
            >
                <button
                    onClick={() =>
                        dispatch({
                            type: REDUCER_ACTION_TYPE.CANCEL_ARTICLE_DELETE,
                        })
                    }
                    className="absolute top-0 right-0 -translate-x-3 translate-y-3"
                >
                    <HiXMark className="h-5 w-5 text-zinc-600" />
                </button>
                <div className="py-3 px-5 text-sm font-semibold text-zinc-900">
                    Delete article?
                </div>
                <div className="border-y border-zinc-300 px-5 py-4 text-sm text-zinc-900">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">"{state.title}"</span>?
                </div>
                <div className="flex gap-3 py-3 px-5">
                    <button
                        onClick={() =>
                            dispatch({
                                type: REDUCER_ACTION_TYPE.CANCEL_ARTICLE_DELETE,
                            })
                        }
                        className="flex-1 rounded-sm border border-zinc-300 py-1 text-sm font-semibold text-zinc-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() =>
                            handleDeleteArticle(state.articleIdToDelete)
                        }
                        className="flex-1 rounded-sm bg-red-600 py-1 text-sm font-semibold text-white"
                    >
                        Delete now
                    </button>
                </div>
            </div>
        </div>
    );
}
