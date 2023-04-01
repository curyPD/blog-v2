import DashboardArticle from "./DashboardArticle";
import DashboardArticlesHeader from "./DashboardArticlesHeader";
import { useDashboard } from "@/context/DashboardProvider";

export default function DashboardArticles() {
    const { articles, state } = useDashboard();

    return (
        <section
            className={`h-full ${
                state.selectedArticleId ? "hidden" : "block"
            } overflow-y-auto min-[480px]:w-80 min-[480px]:border-r min-[480px]:border-zinc-300 md:block lg:w-96`}
        >
            <DashboardArticlesHeader />
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
