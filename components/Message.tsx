import { HiOutlineExclamationTriangle } from "react-icons/hi2";

type MessagePropsType = {
    isError: boolean;
    text: string;
};

export default function Message({ isError, text }: MessagePropsType) {
    if (isError)
        return (
            <div className="absolute top-14 left-4 z-50 flex w-5/6 max-w-xs items-start gap-4 rounded border border-red-300 bg-red-50 py-2 px-4 shadow lg:top-20 lg:max-w-sm lg:gap-5 lg:py-3 lg:px-5">
                <HiOutlineExclamationTriangle className="h-5 w-5 shrink-0 text-red-700 lg:h-6 lg:w-6" />
                <p className="text-sm font-medium text-red-700 lg:text-base">
                    {text}
                </p>
            </div>
        );
    else
        return (
            <div className="absolute top-0 left-0 z-50 w-52 rounded border border-zinc-300 bg-white py-2 px-4">
                {text}
            </div>
        );
}
