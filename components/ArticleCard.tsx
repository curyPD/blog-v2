import Link from "next/link";
import Image from "next/image";
import { ArticleType } from "@/types";

type ArticleCardPropsType = Pick<
    ArticleType,
    "id" | "title" | "imageMd" | "content" | "created"
>;

export default function ArticleCard({
    id,
    title,
    imageMd,
    content,
    created,
}: ArticleCardPropsType) {
    const firstParagraph: string = content.slice(
        0,
        content.indexOf("</p>") + 4
    );

    const createdDate = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(created));

    return (
        <article>
            <Link href={`/articles/${id}`}>
                <div>
                    <img
                        src={imageMd}
                        alt={`${title} thumbnail`}
                        width={800}
                        height={800}
                        className="mb-4 transition-all duration-200 hover:scale-[1.025] hover:shadow-xl"
                    />
                </div>
                <time
                    dateTime={created}
                    className="mb-1 block text-sm text-zinc-400 lg:text-base"
                >
                    {createdDate}
                </time>
                <h2 className="mb-3 text-lg font-bold text-zinc-900 lg:text-xl">
                    {title}
                </h2>
                <p
                    dangerouslySetInnerHTML={{ __html: firstParagraph }}
                    className="text-sm leading-relaxed text-zinc-700 line-clamp-3 lg:text-base lg:leading-loose"
                ></p>
            </Link>
        </article>
    );
}
