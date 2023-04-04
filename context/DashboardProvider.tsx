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
    file: File | null;
    filePreviewURL: string;
    title: string;
    articleIdToDelete: string;
    errorMessage: string;
    successMessage: string;
    errorMessageInProp: boolean;
    successMessageInProp: boolean;
};

const initState: StateType = {
    selectedArticleId: "",
    file: null,
    filePreviewURL: "",
    title: "",
    articleIdToDelete: "",
    errorMessage: "",
    successMessage: "",
    errorMessageInProp: false,
    successMessageInProp: false,
};

enum REDUCER_ACTION_TYPE {
    TITLE_INPUT,
    FILE_INPUT,
    SELECT_ARTICLE,
    CANCEL_SELECT,
    STAGE_ARTICLE_DELETE,
    CANCEL_ARTICLE_DELETE,
    SHOW_ERROR_MESSAGE,
    SHOW_SUCCESS_MESSAGE,
    HIDE_SUCCESS_MESSAGE,
    HIDE_ERROR_MESSAGE,
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
            const { filePreviewURL, file } = action.payload;
            return { ...state, filePreviewURL, file };
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
                file: null,
            };
        }
        case REDUCER_ACTION_TYPE.CANCEL_SELECT: {
            return {
                ...state,
                selectedArticleId: "",
                title: "",
                filePreviewURL: "",
                file: null,
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
        case REDUCER_ACTION_TYPE.SHOW_ERROR_MESSAGE: {
            if (!action.payload)
                throw new Error(
                    "action.payload missing in SHOW_ERROR_MESSAGE action"
                );
            const { errorMessage } = action.payload;

            return {
                ...state,
                errorMessage,
                errorMessageInProp: true,
            };
        }
        case REDUCER_ACTION_TYPE.SHOW_SUCCESS_MESSAGE: {
            if (!action.payload)
                throw new Error(
                    "action.payload missing in SHOW_SUCCESS_MESSAGE action"
                );
            const { successMessage } = action.payload;

            return {
                ...state,
                successMessage,
                successMessageInProp: true,
            };
        }
        case REDUCER_ACTION_TYPE.HIDE_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessageInProp: false,
            };
        }
        case REDUCER_ACTION_TYPE.HIDE_SUCCESS_MESSAGE: {
            return {
                ...state,
                successMessageInProp: false,
            };
        }
        default:
            throw new Error("Unidentified reducer action type");
    }
}

function useDashboardContext() {
    // const [articles, loading, error] = useListVals<ArticleType>(
    //     ref(db, "articles")
    // );
    const articles = [
        {
            id: "one",
            title: "How to learn a language",
            created: "2023-03-17T07:09:27.152Z",
            last_modified: "2023-03-17T07:10:01.063Z",
            imageSm:
                "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            imageMd:
                "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            imageLg:
                "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            content:
                "<h2>Contents</h2><p></p><ol><li>Where to start</li><li>Where to finish</li></ol>",
        },
        {
            id: "two",
            title: "Best Japanese learning resources",
            created: "2023-03-17T07:10:27.152Z",
            last_modified: "2023-03-17T07:11:01.063Z",
            imageSm:
                "https://images.unsplash.com/photo-1546638008-efbe0b62c730?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            imageMd:
                "https://images.unsplash.com/photo-1546638008-efbe0b62c730?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            imageLg:
                "https://images.unsplash.com/photo-1546638008-efbe0b62c730?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            content: "<p>Welcome, I'm happy to see you here</p>",
        },
    ];
    const [state, dispatch] = useReducer(reducer, initState);
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: "px-3 pt-5 pb-12 border-t max-w-none border-zinc-400 prose prose-zinc prose-sm lg:prose-base prose-headings:font-bold",
            },
        },
        extensions: [StarterKit, Link],
    });

    function showErrorMessage(error: unknown) {
        console.error(error);
        let errorMessage: string;
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === "string") {
            errorMessage = error;
        } else {
            errorMessage = "Something went wrong😢";
        }
        dispatch({
            type: REDUCER_ACTION_TYPE.SHOW_ERROR_MESSAGE,
            payload: {
                ...state,
                errorMessage,
            },
        });
    }

    async function handleAttachFile(file: File) {
        try {
            const imageURL = await resizeFile(file, 1200, 1000, 60);
            dispatch({
                type: REDUCER_ACTION_TYPE.FILE_INPUT,
                payload: { ...state, filePreviewURL: imageURL, file },
            });
        } catch (err) {
            showErrorMessage(err);
        }
    }

    function handleSelectArticle(id: string) {
        try {
            if (id === "fakeId") {
                if (editor && !editor.isDestroyed) {
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
                    throw new Error(
                        "Couldn't set editor content, please try again"
                    );
                }
            } else {
                const article: ArticleType | undefined = articles?.find(
                    (a) => a.id === id
                );
                if (typeof article === "undefined")
                    throw new Error("That's not funny >:(");
                const { title, imageMd, content } = article;
                if (editor && !editor.isDestroyed) {
                    editor.commands.setContent(content);
                    dispatch({
                        type: REDUCER_ACTION_TYPE.SELECT_ARTICLE,
                        payload: {
                            ...state,
                            title,
                            filePreviewURL: imageMd,
                            selectedArticleId: id,
                        },
                    });
                } else {
                    throw new Error(
                        "Couldn't set editor content, please try again"
                    );
                }
            }
        } catch (err) {
            showErrorMessage(err);
        }
    }

    function handleCancelSelect() {
        editor?.commands.clearContent();
        dispatch({ type: REDUCER_ACTION_TYPE.CANCEL_SELECT });
    }

    async function handleDeleteArticle(id: string) {
        try {
            await deleteArticle(id);
            if (state.selectedArticleId === id) {
                handleCancelSelect();
            }
            dispatch({
                type: REDUCER_ACTION_TYPE.SHOW_SUCCESS_MESSAGE,
                payload: {
                    ...state,
                    successMessage: "Article has been deleted",
                },
            });
        } catch (err) {
            showErrorMessage(err);
        }
    }

    async function handleSubmit() {
        try {
            throw new Error("You are not allowed to submit");
            // const html: string | undefined = editor?.getHTML();
            // if (!html || !state.title || !state.filePreviewURL) return;
            // if (
            //     state.selectedArticleId &&
            //     state.selectedArticleId !== "fakeId"
            // ) {
            //     await submitEditedArticle(
            //         state.selectedArticleId,
            //         state.title,
            //         html,
            //         state.file
            //     );
            // } else {
            //     if (!state.file)
            //         throw new Error(
            //             "file should be present if there's a filePreviedURL"
            //         );
            //     await writeNewArticle(state.title, state.file, html);
            // }
            // handleCancelSelect();
            // dispatch({
            //     type: REDUCER_ACTION_TYPE.SET_SUCCESS_MESSAGE,
            //     payload: {
            //         ...state,
            //         successMessage: "Changes have been submitted",
            //     },
            // });
        } catch (err) {
            showErrorMessage(err);
        }
    }

    const lastModified: string | undefined = articles?.find(
        (a) => a.id === state.selectedArticleId
    )?.last_modified;

    return {
        articles,
        // loading,
        // error,
        state,
        REDUCER_ACTION_TYPE,
        editor,
        lastModified,
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
    // loading: false,
    // error: undefined,
    state: initState,
    REDUCER_ACTION_TYPE,
    editor: null,
    lastModified: undefined,
    dispatch: () => {},
    handleAttachFile: async () => {},
    handleSelectArticle: () => {},
    handleCancelSelect: () => {},
    handleDeleteArticle: async () => {},
    handleSubmit: async () => {},
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
