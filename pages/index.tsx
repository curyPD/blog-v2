import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";

import data from "../dummy-data/data.json";

import { ArticleType } from "@/types/types";

export default function Home({ articles }: { articles: ArticleType[] }) {
    return (
        <>
            <Head>
                <title>Polyglot Dream</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <main>
                <h1 className="text-slate-900 text-3xl font-bold">
                    Polyglot Dream
                </h1>
                <div className="flex gap-4">
                    {articles.map((article) => (
                        <article key={article.id}>
                            <Link href={`/articles/${article.id}`}>
                                <img src={article.image} alt="" />
                                <h2>{article.title}</h2>
                            </Link>
                        </article>
                    ))}
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async function () {
    const articles: ArticleType[] = Object.values(data.articles);
    return {
        props: {
            articles,
        },
    };
};
