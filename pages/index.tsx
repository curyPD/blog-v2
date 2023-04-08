import Head from "next/head";
import { GetStaticProps } from "next";

import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";

import { db } from "@/firebase/firebase";
import { get, ref } from "firebase/database";

import { ArticleType } from "@/types";

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
            <main className="pt-14 pb-24">
                <div className="container mx-auto px-4 xs:px-6 lg:px-9 xl:max-w-screen-xl 2xl:px-0">
                    <div className="mb-16 lg:mb-24 xl:mb-32">
                        <h1 className="mb-7 text-4xl font-extrabold tracking-tight text-zinc-900 lg:mb-12 lg:text-7xl lg:leading-[1.1] xl:mb-20 xl:text-9xl xl:font-black">
                            Hop on, it's time to learn a foreign language.
                        </h1>
                        <p className="text-lg text-zinc-600 lg:text-xl xl:text-2xl xl:leading-normal">
                            Hi, my name is Roman. Here I share what I know about
                            language learning.
                            <br /> Twice a year, maybe?
                        </p>
                    </div>
                    {articles.length ? (
                        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12 md:gap-y-20">
                            {articles.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    id={article.id}
                                    title={article.title}
                                    imageMd={article.imageMd}
                                    content={article.content}
                                    created={article.created}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-zinc-900 lg:text-base">
                            Nothing here...
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

export const getStaticProps: GetStaticProps = async function () {
    const articlesRef = ref(db, "articles");
    const articlesSnapshot = await get(articlesRef);
    if (!articlesSnapshot.exists()) {
        return {
            props: {
                articles: [] as ArticleType[],
            },
        };
    } else {
        const values: Record<ArticleType["id"], ArticleType> =
            articlesSnapshot.val();
        const articles = Object.values(values);
        return {
            props: {
                articles,
            },
        };
    }
};
