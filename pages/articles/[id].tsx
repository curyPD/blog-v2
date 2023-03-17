import { GetStaticPaths, GetStaticProps } from "next";

import data from "../../dummy-data/data.json";

type ArticleType = {
    id: string;
    title: string;
    created: string;
    last_modified: string;
    image: string;
    content: string;
    likes: Record<string, boolean>;
    comments: Record<string, string>;
};

export default function Article({ article }: { article: ArticleType }) {
    console.log(article);

    const createdDate: string = new Date(
        Date.parse(article.created)
    ).toLocaleDateString("en-US");

    const numLikes: number = Object.keys(article.likes).length;

    return (
        <div>
            <h1>{article.title}</h1>
            <span>{createdDate}</span>
            <img src={article.image} alt="" />
            <article dangerouslySetInnerHTML={{ __html: article.content }} />
            <span>♥ {numLikes}</span>
        </div>
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
