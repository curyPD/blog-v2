import { useDashboard } from "@/context/DashboardProvider";
import TextEditor from "@/components/TextEditor";
import TitleInput from "./TitleInput";
import FileInput from "./FileInput";
import { HiArrowLeft } from "react-icons/hi2";

export default function DashboardEditor() {
    const { state, editor, handleCancelSelect, handleSubmit } = useDashboard();

    return (
        <section
            className={`${
                state.selectedArticleId ? "block" : "hidden"
            } lg:block`}
        >
            <header className="sticky top-0 border-b border-zinc-300 bg-white">
                <div className="flex h-11 items-center gap-4 px-4">
                    <button onClick={handleCancelSelect}>
                        <HiArrowLeft className="h-4 w-4 text-zinc-500" />
                    </button>
                    <h2
                        className={`text-sm font-semibold ${
                            state.title ? "text-zinc-900" : "text-zinc-500"
                        }`}
                    >
                        {state.title || "Untitled"}
                    </h2>
                </div>
            </header>
            <div className="grid grid-cols-1 gap-y-6 py-6 px-5">
                <TitleInput />
                <FileInput />

                <TextEditor editor={editor} />

                <button onClick={handleSubmit}>Submit</button>
            </div>
        </section>
    );
}
