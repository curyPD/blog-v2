import EditorNodeDropdownMenu from "./EditorNodeDropdownMenu";
import EditorMarkDropdownMenu from "./EditorMarkDropdownMenu";

export default function EditorMenu() {
    return (
        <div className="flex border-b border-zinc-400">
            <EditorNodeDropdownMenu />
            <EditorMarkDropdownMenu />
        </div>
    );
}
