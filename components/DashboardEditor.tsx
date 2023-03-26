import { useDashboard } from "@/context/DashboardProvider";
import Link from "next/link";
import { ChangeEvent } from "react";
import TextEditor from "@/components/TextEditor";
import { FileUploader } from "react-drag-drop-files";

export default function DashboardEditor() {
    const {
        state,
        dispatch,
        editor,
        REDUCER_ACTION_TYPE,
        handleCancelSelect,
        handleAttachFile,
        handleSubmit,
    } = useDashboard();

    return (
        <section>
            <header>
                <button onClick={handleCancelSelect}>⬅</button>
            </header>
            <input
                type="text"
                className="border border-black"
                value={state.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                        type: REDUCER_ACTION_TYPE.TITLE_INPUT,
                        payload: { ...state, title: e.target.value },
                    })
                }
            />
            <div className="border border-black p-3">
                <FileUploader handleChange={handleAttachFile}>
                    <div className="border-2 p-1 rounded-md border-dashed border-red-600">
                        Drop files here
                    </div>
                </FileUploader>
            </div>
            {state.filePreviewURL && (
                <div>
                    <img src={state.filePreviewURL} alt="" />
                </div>
            )}

            <TextEditor editor={editor} />

            <button onClick={handleSubmit}>Submit</button>
        </section>
    );
}
