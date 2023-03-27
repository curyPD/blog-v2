import { ArticleType } from "@/types";
import { useDashboard } from "@/context/DashboardProvider";
import { HiOutlineChevronRight } from "react-icons/hi2";

type DashboardArticlePropsType = Pick<ArticleType, "title" | "id"> & {
    isSelected: boolean;
};

export default function DashboardArticle({
    title,
    id,
    isSelected,
}: DashboardArticlePropsType) {
    const { handleSelectArticle } = useDashboard();

    return (
        <article
            onClick={() => handleSelectArticle(id)}
            className={`px-2 py-3 cursor-pointer hover:bg-zinc-200 flex items-center gap-3 justify-between mb-1 last:mb-0 rounded ${
                isSelected ? "bg-blue-600" : "bg-white"
            }`}
        >
            <p
                className={`text-sm truncate ${
                    isSelected ? "text-white" : "text-zinc-800"
                }`}
            >
                {title}
            </p>
            <HiOutlineChevronRight
                className={`w-4 h-4 ${
                    isSelected ? "text-zinc-200" : "text-zinc-400"
                }`}
            />
        </article>
    );
}
