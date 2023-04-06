import DashboardArticle from "./DashboardArticle";
import DashboardArticlesHeader from "./DashboardArticlesHeader";
import { useDashboard } from "@/context/DashboardProvider";

export default function DashboardArticles() {
    const { articles, state, loading, error } = useDashboard();

    return (
        <section
            className={`relative h-full ${
                state.selectedArticleId ? "hidden" : "block"
            } overflow-y-auto xs:w-80 xs:border-r xs:border-zinc-300 md:block lg:w-96`}
        >
            <DashboardArticlesHeader />
            {loading ? (
                <div className="absolute top-1/2 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 text-center text-sm text-zinc-500 lg:text-base">
                    Loading...
                </div>
            ) : error ? (
                <div className="absolute top-1/2 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 text-center text-sm text-zinc-500 lg:text-base">
                    Failed to fetch data. <br /> Try refreshing the page.
                </div>
            ) : articles && articles.length ? (
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
                    })}
                </div>
            ) : (
                <div className="absolute top-1/2 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 text-center text-sm text-zinc-500 lg:text-base">
                    No articles found
                </div>
            )}
        </section>
    );
}
