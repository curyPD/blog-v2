import { ArticleType } from "@/types";
import { useDashboard } from "@/context/DashboardProvider";
import { HiOutlineChevronRight } from "react-icons/hi2";

type DashboardArticlePropsType = Pick<
    ArticleType,
    "title" | "id" | "imageSm"
> & {
    isSelected: boolean;
};

export default function DashboardArticle({
    title,
    id,
    imageSm,
    isSelected,
}: DashboardArticlePropsType) {
    const { handleSelectArticle } = useDashboard();

    return (
        <article
            onClick={() => handleSelectArticle(id)}
            className={`mb-1 flex cursor-pointer items-center gap-3 rounded px-2 py-3 last:mb-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 ${
                isSelected ? "bg-blue-600" : "bg-white hover:bg-zinc-100"
            }`}
            tabIndex={0}
        >
            <img src={imageSm} className="h-9 w-14 object-cover" alt="" />
            <p
                className={`truncate text-sm lg:text-base ${
                    isSelected ? "text-white" : "text-zinc-800"
                }`}
            >
                {title}
            </p>
            <HiOutlineChevronRight
                className={`ml-auto h-4 w-4 lg:h-5 lg:w-5 ${
                    isSelected ? "text-zinc-200" : "text-zinc-400"
                }`}
            />
        </article>
    );
}
