import { ReactElement } from "react";

export type ArticleType = {
    id: string;
    title: string;
    description: string;
    created: string;
    last_modified: string;
    imageSm: string;
    imageMd: string;
    imageLg: string;
    content: string;
    likes: Record<string, boolean> | undefined;
};

export type UserDataType = {
    uid: string;
    name: string;
    email: string;
    role: Record<string, boolean>;
    liked_articles: Record<string, boolean> | undefined;
};

export type ChildrenType = { children: ReactElement };
