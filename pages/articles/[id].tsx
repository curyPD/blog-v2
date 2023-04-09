import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

import Footer from "@/components/Footer";

import { db } from "@/firebase/firebase";
import { get, ref } from "firebase/database";
import { ArticleType } from "../../types";
import Head from "next/head";

export default function Article({ article }: { article: ArticleType }) {
    const createdDate = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(article.created));

    return (
        <>
            <Head>
                <title>{article.title}</title>
                <meta
                    name="description"
                    content={article.description}
                    key="desc"
                />
                <meta
                    property="og:title"
                    content={article.title}
                    key="ogtitle"
                />
                <meta
                    property="og:description"
                    content={article.description}
                    key="ogdesc"
                />
                <meta
                    property="og:image"
                    content={article.imageMd}
                    key="ogimage"
                />
            </Head>
            <main className="pt-14 pb-24">
                <div className="container mx-auto px-4 xs:px-6 lg:max-w-screen-lg xl:px-0">
                    <h1 className="mb-8 text-3xl font-extrabold tracking-tighter text-zinc-900 md:mb-10 md:text-left md:text-4xl lg:text-6xl lg:leading-[1.1]">
                        {article.title}
                    </h1>
                    <time
                        dateTime={article.created}
                        className="mb-1 block text-sm text-zinc-400 lg:text-base"
                    >
                        {createdDate}
                    </time>
                    <Image
                        src={article.imageLg}
                        alt={`Banner for the ${article.title} article`}
                        width={1024}
                        height={672}
                        className="mb-10 md:mb-14 lg:mb-16"
                        priority
                    />
                    <article
                        dangerouslySetInnerHTML={{ __html: article.content }}
                        className="prose prose-sm prose-zinc mx-auto md:prose-base lg:prose-lg"
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async function () {
    const articlesRef = ref(db, "articles");
    const articlesSnapshot = await get(articlesRef);
    if (!articlesSnapshot.exists()) {
        return {
            paths: [],
            fallback: false,
        };
    } else {
        const values: Record<ArticleType["id"], ArticleType> =
            articlesSnapshot.val();
        const keys = Object.keys(values);
        const paths = keys.map((key) => ({
            params: {
                id: key,
            },
        }));
        return {
            paths,
            fallback: false,
        };
    }
};

export const getStaticProps: GetStaticProps = async function ({ params }) {
    const articleRef = ref(db, `articles/${params?.id}`);
    const articleSnapshot = await get(articleRef);
    const article: ArticleType = articleSnapshot.val();
    return {
        props: {
            article,
        },
    };
};
