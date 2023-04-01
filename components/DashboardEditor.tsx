import { useDashboard } from "@/context/DashboardProvider";
import TextEditor from "@/components/TextEditor";
import TitleInput from "./TitleInput";
import FileInput from "./FileInput";
import DashboardEditorHeader from "./DashboardEditorHeader";
import DashboardEditorFooter from "./DashboardEditorFooter";
import ArticleDeleteModal from "./ArticleDeleteModal";

export default function DashboardEditor() {
    const { state } = useDashboard();

    return (
        <section
            className={`relative h-full flex-1 ${
                state.selectedArticleId ? "block" : "hidden"
            } ${state.articleIdToDelete ? "" : "overflow-y-auto"} md:block`}
        >
            {state.articleIdToDelete && <ArticleDeleteModal />}
            <DashboardEditorHeader />
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-6 py-6 px-5 pb-36">
                <TitleInput />
                <FileInput />
                <TextEditor />
            </div>
            <DashboardEditorFooter />
        </section>
    );
}
