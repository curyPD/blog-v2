import DashboardArticle from "./DashboardArticle";
import { useDashboard } from "@/context/DashboardProvider";

export default function DashboardArticles() {
    const { articles, handleSelectArticle, state } = useDashboard();
    return (
        <section>
            <header>
                <button onClick={() => handleSelectArticle("fakeId")}>
                    Add new
                </button>
            </header>
            {articles?.map((a) => {
                return (
                    <DashboardArticle title={a.title} id={a.id} key={a.id} />
                );
            })}
        </section>
    );
}
