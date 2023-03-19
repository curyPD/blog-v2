import { createContext, useReducer, useEffect } from "react";

import { EditorState } from "draft-js";
import { ArticleType } from "@/types/types";

type StateType = {
    articles: ArticleType[];
    editedArticleId: string;
    editorState: EditorState;
};
