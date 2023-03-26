import { EditorContent, Editor } from "@tiptap/react";
import { useCallback } from "react";

type TextEditorProps = {
    editor: Editor | null;
};

export default function TextEditor({ editor }: TextEditorProps) {
    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

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
            <div className="flex gap-1 p-1">
                <button
                    className="p-0.5 border border-black rounded-sm"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                    Bold
                </button>
                <button
                    className="p-0.5 border border-black rounded-sm"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                    Italic
                </button>
                <button
                    className="p-0.5 border border-black rounded-sm"
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                >
                    Strike
                </button>
                <button
                    className="p-0.5 border border-black rounded-sm"
                    onClick={() => editor?.chain().focus().setParagraph().run()}
                >
                    Paragraph
                </button>
                <button
                    className="p-0.5 border border-black rounded-sm"
                    onClick={() =>
                        editor?.chain().focus().toggleBulletList().run()
                    }
                >
                    Bullet List
                </button>
                <button
                    className="p-0.5 border border-black rounded-sm"
                    onClick={() =>
                        editor?.chain().focus().toggleOrderedList().run()
                    }
                >
                    Ordered List
                </button>
                <button
                    onClick={setLink}
                    className="p-0.5 border border-black rounded-sm"
                >
                    setLink
                </button>
                <button
                    onClick={() => editor?.chain().focus().unsetLink().run()}
                    disabled={!editor?.isActive("link")}
                    className="p-0.5 border border-black rounded-sm"
                >
                    unsetLink
                </button>
                <button
                    className="p-0.5 border border-black rounded-sm"
                    onClick={() => editor?.chain().focus().setHardBreak().run()}
                >
                    Line Break
                </button>
                <button
                    className="p-0.5 border border-black rounded-sm"
                    onClick={() =>
                        editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 1 })
                            .run()
                    }
                >
                    H1
                </button>
                <button
                    className="p-0.5 border border-black rounded-sm"
                    onClick={() =>
                        editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                    }
                >
                    H2
                </button>
                <button
                    className="p-0.5 border border-black rounded-sm"
                    onClick={() =>
                        editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 3 })
                            .run()
                    }
                >
                    H3
                </button>
                <button
                    className="p-0.5 border border-black rounded-sm"
                    onClick={() =>
                        editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 4 })
                            .run()
                    }
                >
                    H4
                </button>
                <button
                    className="p-0.5 border border-black rounded-sm"
                    onClick={() =>
                        editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 5 })
                            .run()
                    }
                >
                    H5
                </button>
                <button
                    className="p-0.5 border border-black rounded-sm"
                    onClick={() =>
                        editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 6 })
                            .run()
                    }
                >
                    H6
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
