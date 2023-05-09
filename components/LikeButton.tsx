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
        <div className="mt-4 sm:fixed sm:bottom-14 sm:left-4 sm:mt-0">
            <button
                disabled={!userCanLikeArticle || articleLoading}
                onClick={handleClickLikeButton}
            >
                <HiOutlineHeart
                    className={`h-5 w-5 text-zinc-900 md:h-6 md:w-6 ${
                        userLikedArticle ? "fill-zinc-900" : "fill-none"
                    }`}
                />
                <span className="text-sm md:text-base">{numLikes}</span>
            </button>
        </div>
    );
}
