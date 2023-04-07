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
            <Link
                href={`/articles/${id}`}
                className="block transition-transform duration-200 hover:-translate-y-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:ring-offset-8"
            >
                <div>
                    <Image
                        src={imageMd}
                        alt={`${title} thumbnail`}
                        width={616}
                        height={404}
                        className="mb-4"
                        priority
                    />
                </div>
                <time
                    dateTime={created}
                    className="mb-1 block text-sm text-zinc-400 lg:text-base"
                >
                    {createdDate}
                </time>
                <h2 className="mb-3 text-lg font-bold leading-snug text-zinc-900 lg:text-xl">
                    {title}
                </h2>
                <div
                    dangerouslySetInnerHTML={{ __html: firstParagraph }}
                    className="text-sm leading-relaxed text-zinc-700 line-clamp-3 lg:text-base lg:leading-relaxed"
                ></div>
            </Link>
        </article>
    );
}
