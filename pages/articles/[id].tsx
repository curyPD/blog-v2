import { GetStaticPaths, GetStaticProps } from "next";

// import { db } from "@/firebase/firebase";
// import { get, ref } from "firebase/database";
import data from "../../dummy-data/data.json";
import { ArticleType } from "../../types";

export default function Article({ article }: { article: ArticleType }) {
    const createdDate: string = new Date(
        Date.parse(article.created)
    ).toLocaleDateString("en-US");

    return (
        <main>
            <h1>{article.title}</h1>
            <span>{createdDate}</span>
            <img src={article.image} alt="" />
            <article dangerouslySetInnerHTML={{ __html: article.content }} />
        </main>
    );
}

export const getStaticPaths: GetStaticPaths = async function () {
    // const articlesRef = ref(db, "articles");
    // const articlesSnapshot = await get(articlesRef);
    // if (!articlesSnapshot.exists()) {
    //     return {
    //         paths: [],
    //         fallback: false,
    //     };
    // } else {
    //     return {
    //         paths: Object.keys(articlesSnapshot.val()).map((key) => ({
    //             params: { id: key },
    //         })),
    //         fallback: false,
    //     };
    // }
    const paths = Object.keys(data.articles).map((key) => {
        return {
            params: {
                id: key,
            },
        };
    });
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async function ({ params }) {
    // if (typeof params === "undefined") {
    //     return {
    //         props: {
    //             article: undefined,
    //         },
    //     };
    // } else {
    //     const articleRef = ref(db, `articles/${params.id}`);
    //     const articleSnapshot = await get(articleRef);
    //     return {
    //         props: {
    //             article: articleSnapshot.val(),
    //         },
    //     };
    // }
    const article: ArticleType = Object.values(data.articles).find(
        (article) => article.id === params?.id
    )!;
    return {
        props: {
            article,
        },
    };
};
