import Head from "next/head";
import { GetStaticProps } from "next";

import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";

// import { db } from "@/firebase/firebase";
// import { get, ref, child } from "firebase/database";
import data from "../dummy-data/data.json";

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
                    <div className="mb-14 flex flex-col items-center gap-6 md:flex-row md:justify-between">
                        <h1 className="text-center text-5xl font-extrabold tracking-tighter text-zinc-900 lg:text-7xl">
                            Polyglot Dream
                        </h1>
                        <p className="text-center text-base text-zinc-600 lg:text-lg">
                            A blog about language learning.
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
                        <div>Nothing here...</div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

export const getStaticProps: GetStaticProps = async function () {
    // const dbRef = ref(db);
    // const articlesRef = ref(db, "articles");
    // const articlesSnapshot = await get(child(dbRef, "articles"));
    // if (!articlesSnapshot.exists()) {
    //     return {
    //         props: {
    //             articles: [],
    //         },
    //     };
    // } else {
    //     const values = articlesSnapshot.val();
    //     return {
    //         props: {
    //             articles: values,
    //         },
    //     };
    // }
    const articles: ArticleType[] = Object.values(data.articles);
    return {
        props: {
            articles,
        },
    };
};
