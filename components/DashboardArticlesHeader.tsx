import { useDashboard } from "@/context/DashboardProvider";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function DashboardArticlesHeader() {
    const { handleSelectArticle } = useDashboard();

    return (
        <header className="sticky top-0 border-b border-zinc-300 bg-white">
            <div className="flex h-11 items-center justify-between px-4 lg:h-14">
                <h2 className="text-sm font-semibold text-zinc-900 lg:text-base">
                    Articles
                </h2>
                <button
                    onClick={() => handleSelectArticle("fakeId")}
                    className="group flex h-9 w-9 items-center justify-center rounded-sm hover:bg-zinc-100"
                >
                    <HiOutlinePencilSquare className="h-5 w-5 text-zinc-500 group-hover:text-zinc-700" />
                </button>
            </div>
        </header>
    );
}
