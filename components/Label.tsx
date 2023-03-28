type LabelPropsType = {
    text: string;
    isLabelTag: boolean;
    htmlFor?: string;
};

export default function Label({ text, isLabelTag, htmlFor }: LabelPropsType) {
    if (isLabelTag)
        return (
            <label
                htmlFor={htmlFor}
                className="mb-2 block text-xs font-semibold capitalize text-zinc-900"
            >
                {text}
            </label>
        );
    else
        return (
            <div className="mb-2 text-xs font-semibold capitalize text-zinc-900">
                {text}
            </div>
        );
}
