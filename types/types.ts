import { ChangeEvent, ReactNode } from "react";

export type ArticleType = {
    id: string;
    title: string;
    created: string;
    last_modified: string;
    image: string;
    content: string;
};

export type UserDataType = {
    uid: string;
    name: string;
    email: string;
    role: Record<string, boolean>;
};

export type SignUpFormStateType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type LoginFormStateType = {
    email: string;
    password: string;
};

export type UseControlledFormType<T> = {
    input: T;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type LayoutPropsType = {
    children: ReactNode | ReactNode[];
};
