import { useReducer, ChangeEvent } from "react";
import { ref } from "firebase/database";
import { db } from "@/firebase/firebase";
import { useListVals } from "react-firebase-hooks/database";
import {
    deleteArticle,
    resizeFile,
    submitEditedArticle,
    writeNewArticle,
} from "@/helpers";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ArticleType } from "@/types";

type StateType = {
    selectedArticleId: string;
    filePreviewURL: string;
    title: string;
};

const initState: StateType = {
    selectedArticleId: "",
    title: "",
    filePreviewURL: "",
};

enum REDUCER_ACTION_TYPE {
    TITLE_INPUT,
    FILE_INPUT,
    SELECT_ARTICLE,
    CANCEL_SELECT,
}

type ReducerAction = {
    type: REDUCER_ACTION_TYPE;
    payload?: StateType;
};

function reducer(state: StateType, action: ReducerAction): StateType {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.TITLE_INPUT: {
            if (!action.payload)
                throw new Error("action.payload missing in TITLE_INPUT action");
            return { ...state, title: action.payload.title };
        }
        case REDUCER_ACTION_TYPE.FILE_INPUT: {
            if (!action.payload)
                throw new Error("action.payload missing in FILE_INPUT action");
            return { ...state, filePreviewURL: action.payload.filePreviewURL };
        }
        case REDUCER_ACTION_TYPE.SELECT_ARTICLE: {
            if (!action.payload)
                throw new Error(
                    "action.payload missing in SELECT_ARTICLE action"
                );
            const { title, filePreviewURL, selectedArticleId } = action.payload;
            return {
                selectedArticleId,
                title,
                filePreviewURL,
            };
        }
        case REDUCER_ACTION_TYPE.CANCEL_SELECT: {
            return {
                selectedArticleId: "",
                title: "",
                filePreviewURL: "",
            };
        }

        default:
            throw new Error("Unidentified reducer action type");
    }
}

export function useDashboard() {
    const [articles, loading, error] = useListVals<ArticleType>(
        ref(db, "articles")
    );
    const [state, dispatch] = useReducer(reducer, initState);
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Hello World! 🌎️</p>",
    });

    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: REDUCER_ACTION_TYPE.TITLE_INPUT,
            payload: { ...state, title: e.target.value },
        });
    }

    async function handleAttachFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        const file = e.target.files[0];
        e.target.value = "";
        const imageURL = await resizeFile(file, 1200, 1000, 80);
        dispatch({
            type: REDUCER_ACTION_TYPE.TITLE_INPUT,
            payload: { ...state, filePreviewURL: imageURL },
        });
    }

    function handleSelectArticle(id: string) {
        if (!id) return;
        const article: ArticleType | undefined = articles?.find(
            (a) => a.id === id
        );
        if (typeof article === "undefined")
            throw new Error("That's not funny >:(");
        const { title, image, content } = article;
        editor?.commands.setContent(content);
        dispatch({
            type: REDUCER_ACTION_TYPE.SELECT_ARTICLE,
            payload: { title, filePreviewURL: image, selectedArticleId: id },
        });
    }

    function handleCancelSelect() {
        editor?.commands.clearContent();
        dispatch({ type: REDUCER_ACTION_TYPE.CANCEL_SELECT });
    }

    function handleDeleteArticle(id: string) {
        deleteArticle(id);
        if (state.selectedArticleId === id) {
            handleCancelSelect();
        }
    }

    function handleSubmit() {
        const html: string | undefined = editor?.getHTML();
        if (!html || !state.title || !state.filePreviewURL) return;
        if (state.selectedArticleId) {
            const article: ArticleType | undefined = articles?.find(
                (a) => a.id === state.selectedArticleId
            );
            if (typeof article === "undefined")
                throw new Error("That's not funny >:(");
            const articleImageURL = article.image;
            submitEditedArticle(
                state.selectedArticleId,
                state.title,
                state.filePreviewURL,
                articleImageURL,
                html
            );
        } else {
            writeNewArticle(state.title, state.filePreviewURL, html);
        }
    }

    return {
        articles,
        loading,
        state,
        editor,
        handleTitleChange,
        handleAttachFile,
        handleSelectArticle,
        handleCancelSelect,
        handleDeleteArticle,
        handleSubmit,
    };
}
