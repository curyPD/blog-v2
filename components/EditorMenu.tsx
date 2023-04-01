import EditorNodeDropdownMenu from "./EditorNodeDropdownMenu";
import EditorMarkDropdownMenu from "./EditorMarkDropdownMenu";

export default function EditorMenu() {
    return (
        <div className="flex">
            <EditorNodeDropdownMenu />
            <EditorMarkDropdownMenu />
        </div>
    );
}
