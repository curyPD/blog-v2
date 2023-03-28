import { FileUploader } from "react-drag-drop-files";
import { useDashboard } from "@/context/DashboardProvider";
import Label from "./Label";
import { HiOutlinePhoto } from "react-icons/hi2";

const fileTypes = ["JPG", "PNG", "JPEG"];

export default function FileInput() {
    const { handleAttachFile, state } = useDashboard();
    return (
        <div>
            <Label text="image" isLabelTag={false} />
            <FileUploader
                handleChange={handleAttachFile}
                types={fileTypes}
                hoverTitle="Drop image to upload"
            >
                <div className="relative h-40 rounded-sm border border-zinc-400 bg-zinc-100 text-center text-sm text-zinc-900">
                    {state.filePreviewURL ? (
                        <img
                            src={state.filePreviewURL}
                            alt=""
                            className="mx-auto max-h-full"
                        />
                    ) : (
                        <div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
                            <HiOutlinePhoto className="h-6 w-6 text-zinc-600" />
                            <p className="text-sm text-zinc-600">
                                Select or drag & drop a file
                            </p>
                        </div>
                    )}
                </div>
            </FileUploader>
        </div>
    );
}
