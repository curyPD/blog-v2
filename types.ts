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
};

export type UserDataType = {
    uid: string;
    name: string;
    email: string;
    role: Record<string, boolean>;
};

export type ChildrenType = { children: ReactElement };
