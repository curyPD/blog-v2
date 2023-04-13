import { useRouter } from "next/router";

import { useObject } from "react-firebase-hooks/database";
import { useUserData } from "@/context/UserDataProvider";
import { ChildrenType } from "../types";

import { db } from "@/firebase/firebase";
import { ref } from "firebase/database";
import { ArticleType } from "@/types";
import { ReactElement, createContext, useContext } from "react";

import { addLike, removeLike } from "@/helpers";

function useArticleLikesCommentsDataContext() {
    const router = useRouter();
    const {
        query: { id },
    } = router;

    const [articleSnapshot, articleLoading, articleError] = useObject(
        ref(db, id && `articles/${id}`)
    );
    const { userData } = useUserData();

    let numLikes: number = 0;
    let userLikedArticle: boolean = false;
    let userCanLikeArticle: boolean = userData ? true : false;

    if (articleSnapshot?.exists()) {
        const articleData: ArticleType = articleSnapshot.val();
        const { likes } = articleData;

        if (typeof likes !== "undefined") {
            numLikes = Object.keys(likes).length;
            if (userData) {
                userLikedArticle = likes[userData.uid];
            }
        }
    }

    function handleClickLikeButton() {
        if (typeof id === "undefined") return;
        if (userLikedArticle) {
            removeLike(userData!.uid, id as string);
        } else if (userCanLikeArticle) {
            addLike(userData!.uid, id as string);
        } else {
            return;
        }
    }

    return {
        numLikes,
        userLikedArticle,
        userCanLikeArticle,
        articleLoading,
        articleError,
        handleClickLikeButton,
    };
}

type UseArticleLikesCommentsDataContextType = ReturnType<
    typeof useArticleLikesCommentsDataContext
>;

const initContextState: UseArticleLikesCommentsDataContextType = {
    numLikes: 0,
    userLikedArticle: false,
    userCanLikeArticle: false,
    articleLoading: false,
    articleError: undefined,
    handleClickLikeButton: () => {},
};

export const ArticleLikesCommentsDataContext =
    createContext<UseArticleLikesCommentsDataContextType>(initContextState);

export default function ArticleLikesCommentsDataProvider({
    children,
}: ChildrenType): ReactElement {
    return (
        <ArticleLikesCommentsDataContext.Provider
            value={useArticleLikesCommentsDataContext()}
        >
            {children}
        </ArticleLikesCommentsDataContext.Provider>
    );
}

export function useArticleLikesCommentsData() {
    return useContext(ArticleLikesCommentsDataContext);
}
