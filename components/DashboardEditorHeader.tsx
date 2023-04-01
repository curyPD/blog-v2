import { useDashboard } from "@/context/DashboardProvider";
import { HiOutlineArrowLeft, HiOutlineXMark } from "react-icons/hi2";

export default function DashboardEditorHeader() {
    const { state, handleCancelSelect } = useDashboard();

    return (
        <header className="sticky top-0 z-10 border-b border-zinc-300 bg-white">
            <div className="flex h-11 items-center gap-4 px-4 lg:h-14 lg:justify-between">
                <button
                    onClick={handleCancelSelect}
                    className="group flex h-9 w-9 items-center justify-center rounded-sm hover:bg-zinc-100 lg:order-last"
                >
                    <HiOutlineArrowLeft className="h-4 w-4 text-zinc-500 group-hover:text-zinc-700 lg:hidden" />
                    <HiOutlineXMark className="hidden h-5 w-5 text-zinc-600 group-hover:text-zinc-700 lg:block" />
                </button>
                <h2
                    className={`text-sm font-semibold lg:text-base ${
                        state.title ? "text-zinc-900" : "text-zinc-500"
                    }`}
                >
                    {state.title || "Untitled"}
                </h2>
            </div>
        </header>
    );
}
