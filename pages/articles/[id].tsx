import { GetStaticPaths, GetStaticProps } from "next";

import data from "../../dummy-data/data.json";
import { ArticleType } from "../../types";

export default function Article({ article }: { article: ArticleType }) {
    console.log(article);

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

export const getStaticPaths: GetStaticPaths = function () {
    const paths = Object.keys(data.articles).map((key) => ({
        params: { id: key },
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = function ({ params }) {
    const article = Object.values(data.articles).find(
        (article) => article.id === (params?.id as string)
    );
    return {
        props: {
            article,
        },
    };
};
