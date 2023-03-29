import { useCallback } from "react";
import { EditorContent, Editor } from "@tiptap/react";
import Label from "./Label";
import EditorNodeDropdownMenu from "./EditorNodeDropdownMenu";

type TextEditorProps = {
    editor: Editor | null;
};

export default function TextEditor({ editor }: TextEditorProps) {
    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl: string = editor.getAttributes("link").href;
        const url: string | null = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
        }

        // update link
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    }, [editor]);

    return (
        <div>
            <Label
                text="content"
                isLabelTag={false}
                onClick={() => editor?.commands.focus()}
            />
            <div className="rounded-sm border border-zinc-400">
                <div className="flex">
                    <EditorNodeDropdownMenu />
                    {/* <button
                        className="rounded-sm border border-black p-0.5"
                        onClick={() =>
                            editor?.chain().focus().toggleBold().run()
                        }
                    >
                        Bold
                    </button>
                    <button
                        className="rounded-sm border border-black p-0.5"
                        onClick={() =>
                            editor?.chain().focus().toggleItalic().run()
                        }
                    >
                        Italic
                    </button>
                    <button
                        className="rounded-sm border border-black p-0.5"
                        onClick={() =>
                            editor?.chain().focus().toggleStrike().run()
                        }
                    >
                        Strike
                    </button>
                    
                    <button
                        className="rounded-sm border border-black p-0.5"
                        onClick={() =>
                            editor?.chain().focus().toggleBulletList().run()
                        }
                    >
                        Bullet List
                    </button>
                    <button
                        className="rounded-sm border border-black p-0.5"
                        onClick={() =>
                            editor?.chain().focus().toggleOrderedList().run()
                        }
                    >
                        Ordered List
                    </button>
                    <button
                        onClick={setLink}
                        className="rounded-sm border border-black p-0.5"
                    >
                        setLink
                    </button>
                    <button
                        onClick={() =>
                            editor?.chain().focus().unsetLink().run()
                        }
                        disabled={!editor?.isActive("link")}
                        className="rounded-sm border border-black p-0.5"
                    >
                        unsetLink
                    </button>
                    <button
                        className="rounded-sm border border-black p-0.5"
                        onClick={() =>
                            editor?.chain().focus().setHardBreak().run()
                        }
                    >
                        Line Break
                    </button> */}
                </div>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
