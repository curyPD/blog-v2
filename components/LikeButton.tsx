import { useArticleLikesCommentsData } from "@/context/ArticleLikesCommentsDataProvider";
import { HiOutlineHeart } from "react-icons/hi2";

export default function LikeButton() {
    const {
        numLikes,
        userCanLikeArticle,
        userLikedArticle,
        handleClickLikeButton,
        articleLoading,
    } = useArticleLikesCommentsData();

    return (
        <div className="">
            <button
                disabled={!userCanLikeArticle || articleLoading}
                onClick={handleClickLikeButton}
            >
                <HiOutlineHeart
                    className={`h-6 w-6 text-zinc-900 ${
                        userLikedArticle ? "fill-zinc-900" : "fill-none"
                    }`}
                />
                <span>{numLikes}</span>
            </button>
        </div>
    );
}
