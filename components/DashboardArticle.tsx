import { ArticleType } from "@/types";
import { useDashboard } from "@/context/DashboardProvider";

type DashboardArticlePropsType = Pick<ArticleType, "title" | "id">;

export default function DashboardArticle({
    title,
    id,
}: DashboardArticlePropsType) {
    const { handleSelectArticle } = useDashboard();

    return (
        <article>
            <p>{title}</p>
            <button onClick={() => handleSelectArticle(id)}>📝</button>
        </article>
    );
}
