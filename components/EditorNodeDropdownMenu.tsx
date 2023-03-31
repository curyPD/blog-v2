import { useState, useRef } from "react";
import { useDashboard } from "@/context/DashboardProvider";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import useEditorMenuDropdownStyles from "@/hooks/useEditorMenuDropdownStyles";

type NodeType =
    | "Normal"
    | "Heading 1"
    | "Heading 2"
    | "Heading 3"
    | "Heading 4"
    | "Heading 5"
    | "Heading 6";

export default function EditorNodeDropdownMenu() {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [selectedNode, setSelectedNode] = useState<NodeType>("Normal");

    const dropdownToggleRef = useRef<HTMLDivElement>(null);

    const dropdownStyles = useEditorMenuDropdownStyles(
        dropdownToggleRef,
        dropdownOpen
    );

    const { editor } = useDashboard();

    return (
        <div
            ref={dropdownToggleRef}
            className="relative border-r border-zinc-400 p-1"
        >
            <button
                onClick={() => setDropdownOpen((prevState) => !prevState)}
                className="flex items-center gap-3 rounded-sm py-1 pl-3 pr-1 text-sm font-semibold text-zinc-600"
            >
                <span>{selectedNode}</span>
                <HiOutlineChevronUpDown className="h-5 w-5 text-zinc-500" />
            </button>
            {dropdownOpen && (
                <div
                    className="absolute z-20 flex w-52 translate-x-2 flex-col gap-1 overflow-y-auto rounded border border-zinc-300 bg-white p-1 shadow-lg"
                    style={dropdownStyles}
                >
                    <button
                        className={`rounded-sm px-3 py-2 text-left text-sm font-normal ${
                            editor?.isActive("paragraph")
                                ? "bg-blue-100 text-blue-500"
                                : "bg-white text-zinc-600"
                        }`}
                        onClick={() => {
                            setSelectedNode("Normal");
                            editor?.chain().focus().setParagraph().run();
                            setDropdownOpen(false);
                        }}
                    >
                        Normal
                    </button>
                    <button
                        className={`rounded-sm px-3 py-2 text-left text-3xl font-bold ${
                            editor?.isActive("heading", { level: 1 })
                                ? "bg-blue-100 text-blue-500"
                                : "bg-white text-zinc-600"
                        }`}
                        onClick={() => {
                            setSelectedNode("Heading 1");
                            editor
                                ?.chain()
                                .focus()
                                .toggleHeading({ level: 1 })
                                .run();
                            setDropdownOpen(false);
                        }}
                    >
                        Heading 1
                    </button>
                    <button
                        className={`rounded-sm px-3 py-2 text-left text-2xl font-bold ${
                            editor?.isActive("heading", { level: 2 })
                                ? "bg-blue-100 text-blue-500"
                                : "bg-white text-zinc-600"
                        }`}
                        onClick={() => {
                            setSelectedNode("Heading 2");
                            editor
                                ?.chain()
                                .focus()
                                .toggleHeading({ level: 2 })
                                .run();
                            setDropdownOpen(false);
                        }}
                    >
                        Heading 2
                    </button>
                    <button
                        className={`rounded-sm px-3 py-2 text-left text-xl font-bold ${
                            editor?.isActive("heading", { level: 3 })
                                ? "bg-blue-100 text-blue-500"
                                : "bg-white text-zinc-600"
                        }`}
                        onClick={() => {
                            setSelectedNode("Heading 3");
                            editor
                                ?.chain()
                                .focus()
                                .toggleHeading({ level: 3 })
                                .run();
                            setDropdownOpen(false);
                        }}
                    >
                        Heading 3
                    </button>
                    <button
                        className={`rounded-sm px-3 py-2 text-left text-lg font-bold ${
                            editor?.isActive("heading", { level: 4 })
                                ? "bg-blue-100 text-blue-500"
                                : "bg-white text-zinc-600"
                        }`}
                        onClick={() => {
                            setSelectedNode("Heading 4");
                            editor
                                ?.chain()
                                .focus()
                                .toggleHeading({ level: 4 })
                                .run();
                            setDropdownOpen(false);
                        }}
                    >
                        Heading 4
                    </button>
                    <button
                        className={`rounded-sm px-3 py-2 text-left text-base font-bold ${
                            editor?.isActive("heading", { level: 5 })
                                ? "bg-blue-100 text-blue-500"
                                : "bg-white text-zinc-600"
                        }`}
                        onClick={() => {
                            setSelectedNode("Heading 5");
                            editor
                                ?.chain()
                                .focus()
                                .toggleHeading({ level: 5 })
                                .run();
                            setDropdownOpen(false);
                        }}
                    >
                        Heading 5
                    </button>
                    <button
                        className={`rounded-sm px-3 py-2 text-left text-sm font-bold ${
                            editor?.isActive("heading", { level: 6 })
                                ? "bg-blue-100 text-blue-500"
                                : "bg-white text-zinc-600"
                        }`}
                        onClick={() => {
                            setSelectedNode("Heading 6");
                            editor
                                ?.chain()
                                .focus()
                                .toggleHeading({ level: 6 })
                                .run();
                            setDropdownOpen(false);
                        }}
                    >
                        Heading 6
                    </button>
                </div>
            )}
        </div>
    );
}
