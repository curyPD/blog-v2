import { createContext, ReactElement, useContext, useReducer } from "react";
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
import Link from "@tiptap/extension-link";
import { ArticleType, ChildrenType } from "@/types";

type StateType = {
    selectedArticleId: string;
    filePreviewURL: string;
    title: string;
    articleIdToDelete: string;
};

const initState: StateType = {
    selectedArticleId: "",
    title: "",
    filePreviewURL: "",
    articleIdToDelete: "",
};

enum REDUCER_ACTION_TYPE {
    TITLE_INPUT,
    FILE_INPUT,
    SELECT_ARTICLE,
    CANCEL_SELECT,
    STAGE_ARTICLE_DELETE,
    CANCEL_ARTICLE_DELETE,
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
                ...state,
                selectedArticleId,
                title,
                filePreviewURL,
            };
        }
        case REDUCER_ACTION_TYPE.CANCEL_SELECT: {
            return {
                ...state,
                selectedArticleId: "",
                title: "",
                filePreviewURL: "",
            };
        }
        case REDUCER_ACTION_TYPE.STAGE_ARTICLE_DELETE: {
            if (!action.payload)
                throw new Error(
                    "action.payload missing in STAGE_ARTICLE_DELETE action"
                );
            const { articleIdToDelete } = action.payload;
            return {
                ...state,
                articleIdToDelete,
            };
        }
        case REDUCER_ACTION_TYPE.CANCEL_ARTICLE_DELETE: {
            return {
                ...state,
                articleIdToDelete: "",
            };
        }
        default:
            throw new Error("Unidentified reducer action type");
    }
}

function useDashboardContext() {
    const [articles, loading, error] = useListVals<ArticleType>(
        ref(db, "articles")
    );
    const [state, dispatch] = useReducer(reducer, initState);
    const editor = useEditor({
        extensions: [StarterKit, Link],
        content: "<p>Hello World! 🌎️</p>",
    });
    console.log("hook's being used");
    async function handleAttachFile(file: File) {
        const imageURL = await resizeFile(file, 1200, 1000, 80);
        dispatch({
            type: REDUCER_ACTION_TYPE.FILE_INPUT,
            payload: { ...state, filePreviewURL: imageURL },
        });
    }

    function handleSelectArticle(id: string) {
        console.log(id);
        if (id === "fakeId") {
            console.log("if block is executed");
            editor?.commands.clearContent();
            dispatch({
                type: REDUCER_ACTION_TYPE.SELECT_ARTICLE,
                payload: {
                    ...state,
                    title: "",
                    filePreviewURL: "",
                    selectedArticleId: id,
                },
            });
        } else {
            const article: ArticleType | undefined = articles?.find(
                (a) => a.id === id
            );
            if (typeof article === "undefined")
                throw new Error("That's not funny >:(");
            const { title, image, content } = article;
            editor?.commands.setContent(content);
            dispatch({
                type: REDUCER_ACTION_TYPE.SELECT_ARTICLE,
                payload: {
                    ...state,
                    title,
                    filePreviewURL: image,
                    selectedArticleId: id,
                },
            });
        }
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
        if (state.selectedArticleId && state.selectedArticleId !== "fakeId") {
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
        console.log("Changes submitted 🌟");
        handleCancelSelect();
    }

    return {
        articles,
        loading,
        error,
        state,
        REDUCER_ACTION_TYPE,
        editor,
        dispatch,
        handleAttachFile,
        handleSelectArticle,
        handleCancelSelect,
        handleDeleteArticle,
        handleSubmit,
    };
}

type UseDashboardContextType = ReturnType<typeof useDashboardContext>;

const initContextState: UseDashboardContextType = {
    articles: [],
    loading: false,
    error: undefined,
    state: initState,
    REDUCER_ACTION_TYPE,
    editor: null,
    dispatch: () => {},
    handleAttachFile: async () => {},
    handleSelectArticle: () => {},
    handleCancelSelect: () => {},
    handleDeleteArticle: () => {},
    handleSubmit: () => {},
};

const DashboardContext =
    createContext<UseDashboardContextType>(initContextState);

export default function DashboardProvider({
    children,
}: ChildrenType): ReactElement {
    return (
        <DashboardContext.Provider value={useDashboardContext()}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    return useContext(DashboardContext);
}
