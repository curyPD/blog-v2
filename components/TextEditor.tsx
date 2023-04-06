import { EditorContent } from "@tiptap/react";
import Label from "./Label";
import EditorMenu from "./EditorMenu";
import { useState } from "react";

import { useDashboard } from "@/context/DashboardProvider";

export default function TextEditor() {
    const { editor } = useDashboard();
    const [focused, setFocused] = useState<boolean>(false);

    return (
        <div>
            <Label
                text="content"
                isLabelTag={false}
                onClick={() => editor?.commands.focus()}
            />
            <div
                className={`rounded-sm border border-zinc-400 ${
                    focused && "ring-1 ring-zinc-900 ring-offset-2"
                }`}
            >
                <EditorMenu />
                <div
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                >
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    );
}
