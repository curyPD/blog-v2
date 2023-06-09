import Image from "next/image";
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
            <div className="rounded-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-zinc-900 focus-within:ring-offset-2">
                <FileUploader
                    handleChange={handleAttachFile}
                    types={fileTypes}
                    hoverTitle="Drop image to upload"
                >
                    <div className="relative h-40 rounded-sm border border-zinc-400 bg-zinc-100 text-center text-sm text-zinc-900 lg:h-52">
                        {state.filePreviewURL ? (
                            <Image
                                src={state.filePreviewURL}
                                alt="Preview of uploaded image"
                                className="mx-auto max-h-full w-auto object-contain"
                                fill
                                sizes="(max-width: 672px) 100vw,
                                        672px"
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
        </div>
    );
}
