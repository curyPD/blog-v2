import DashboardArticle from "./DashboardArticle";
import { useDashboard } from "@/context/DashboardProvider";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function DashboardArticles() {
    const { articles, handleSelectArticle, state } = useDashboard();
    return (
        <section className="h-full">
            <header className="border-b border-zinc-300 bg-white sticky top-0">
                <div className="h-11 flex items-center justify-between px-4">
                    <h2 className="font-semibold text-zinc-900 text-sm">
                        Articles
                    </h2>
                    <button onClick={() => handleSelectArticle("fakeId")}>
                        <HiOutlinePencilSquare className="text-zinc-500 w-5 h-5" />
                    </button>
                </div>
            </header>
            <div className="p-2">
                {articles?.map((a) => {
                    return (
                        <DashboardArticle
                            title={a.title}
                            id={a.id}
                            isSelected={state.selectedArticleId === a.id}
                            key={a.id}
                        />
                    );
                }) ?? <div>No articles found</div>}
            </div>
        </section>
    );
}
