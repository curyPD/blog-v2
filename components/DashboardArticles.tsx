import DashboardArticle from "./DashboardArticle";
import { useDashboard } from "@/context/DashboardProvider";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function DashboardArticles() {
    const { articles, handleSelectArticle, state } = useDashboard();
    return (
        <section
            className={`h-full ${
                state.selectedArticleId ? "hidden" : "block"
            } lg:block`}
        >
            <header className="sticky top-0 border-b border-zinc-300 bg-white">
                <div className="flex h-11 items-center justify-between px-4">
                    <h2 className="text-sm font-semibold text-zinc-900">
                        Articles
                    </h2>
                    <button onClick={() => handleSelectArticle("fakeId")}>
                        <HiOutlinePencilSquare className="h-5 w-5 text-zinc-500" />
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
                            imageSm={a.imageSm}
                        />
                    );
                }) ?? <div>No articles found</div>}
            </div>
        </section>
    );
}
