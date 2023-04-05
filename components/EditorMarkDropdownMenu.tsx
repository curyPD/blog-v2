import { useState, useRef, useCallback } from "react";
import { useDashboard } from "@/context/DashboardProvider";
import useEditorMenuDropdownStyles from "@/hooks/useEditorMenuDropdownStyles";
import { HiOutlineEllipsisVertical, HiOutlineLink } from "react-icons/hi2";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";

export default function EditorMarkDropdownMenu() {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const dropdownToggleRef = useRef<HTMLDivElement>(null);

    const { editor } = useDashboard();

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

    const dropdownStyles = useEditorMenuDropdownStyles(
        dropdownToggleRef,
        dropdownOpen
    );

    return (
        <div ref={dropdownToggleRef} className="relative p-1">
            <button
                onClick={() => setDropdownOpen((prevState) => !prevState)}
                className="flex h-full w-7 items-center justify-center rounded-sm hover:bg-zinc-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 lg:w-8"
                aria-label="Show menu"
                title="Show menu"
            >
                <HiOutlineEllipsisVertical className="h-6 w-6 text-zinc-600" />
            </button>
            {dropdownOpen && (
                <div
                    className="absolute z-20 flex w-36 translate-x-2 flex-col gap-1 overflow-y-auto rounded border border-zinc-300 bg-white p-1 shadow-lg lg:w-40"
                    style={dropdownStyles}
                >
                    <button
                        className={`flex items-center gap-3 rounded-sm px-3 py-2 text-left text-sm font-normal hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 lg:text-base ${
                            editor?.isActive("bold")
                                ? "bg-blue-100 text-blue-500"
                                : "bg-white text-zinc-600"
                        }`}
                        onClick={() => {
                            editor?.chain().focus().toggleBold().run();
                            setDropdownOpen(false);
                        }}
                    >
                        <span className="basis-4 text-center font-bold lg:basis-5">
                            B
                        </span>
                        <span className="">Strong</span>
                    </button>
                    <button
                        className={`flex items-center gap-3 rounded-sm px-3 py-2 text-left text-sm font-normal hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 lg:text-base ${
                            editor?.isActive("italic")
                                ? "bg-blue-100 text-blue-500"
                                : "bg-white text-zinc-600"
                        }`}
                        onClick={() => {
                            editor?.chain().focus().toggleItalic().run();
                            setDropdownOpen(false);
                        }}
                    >
                        <span className="basis-4 text-center italic lg:basis-5">
                            i
                        </span>
                        <span className="">Emphasis</span>
                    </button>
                    <button
                        className={`flex items-center gap-3 rounded-sm px-3 py-2 text-left text-sm font-normal hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 lg:text-base ${
                            editor?.isActive("strike")
                                ? "bg-blue-100 text-blue-500"
                                : "bg-white text-zinc-600"
                        }`}
                        onClick={() => {
                            editor?.chain().focus().toggleStrike().run();
                            setDropdownOpen(false);
                        }}
                    >
                        <span className="basis-4 text-center line-through lg:basis-5">
                            S
                        </span>
                        <span>Strike</span>
                    </button>
                    <button
                        className={`flex items-center gap-3 rounded-sm px-3 py-2 text-left text-sm font-normal hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 lg:text-base ${
                            editor?.isActive("bulletList")
                                ? "bg-blue-100 text-blue-500"
                                : "bg-white text-zinc-600"
                        }`}
                        onClick={() => {
                            editor?.chain().focus().toggleBulletList().run();
                            setDropdownOpen(false);
                        }}
                    >
                        <AiOutlineUnorderedList className="h-4 w-4 shrink-0 lg:h-5 lg:w-5" />
                        <span>Bullet</span>
                    </button>
                    <button
                        className={`flex items-center gap-3 rounded-sm px-3 py-2 text-left text-sm font-normal hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 lg:text-base ${
                            editor?.isActive("orderedList")
                                ? "bg-blue-100 text-blue-500"
                                : "bg-white text-zinc-600"
                        }`}
                        onClick={() => {
                            editor?.chain().focus().toggleOrderedList().run();
                            setDropdownOpen(false);
                        }}
                    >
                        <AiOutlineOrderedList className="h-4 w-4 shrink-0 lg:h-5 lg:w-5" />
                        <span>Numbered</span>
                    </button>
                    <button
                        className={`flex items-center gap-3 rounded-sm px-3 py-2 text-left text-sm font-normal hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 lg:text-base ${
                            editor?.isActive("link")
                                ? "bg-blue-100 text-blue-500"
                                : "bg-white text-zinc-600"
                        }`}
                        onClick={
                            editor?.isActive("link")
                                ? () => {
                                      editor?.chain().focus().unsetLink().run();
                                      setDropdownOpen(false);
                                  }
                                : () => {
                                      setLink();
                                      setDropdownOpen(false);
                                  }
                        }
                    >
                        <HiOutlineLink className="h-4 w-4 shrink-0 lg:h-5 lg:w-5" />
                        <span>Link</span>
                    </button>
                </div>
            )}
        </div>
    );
}
