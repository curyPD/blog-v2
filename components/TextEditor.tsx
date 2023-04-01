import { EditorContent } from "@tiptap/react";
import Label from "./Label";
import EditorMenu from "./EditorMenu";

import { useDashboard } from "@/context/DashboardProvider";

export default function TextEditor() {
    const { editor } = useDashboard();

    return (
        <div>
            <Label
                text="content"
                isLabelTag={false}
                onClick={() => editor?.commands.focus()}
            />
            <div className="rounded-sm border border-zinc-400">
                <EditorMenu />
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
