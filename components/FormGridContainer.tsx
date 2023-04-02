import { FormEvent, ReactNode } from "react";

type FormGridContainerPropsType = {
    children: ReactNode;
    loading: boolean;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function FormGridContainer({
    children,
    loading,
    handleSubmit,
}: FormGridContainerPropsType) {
    return (
        <form
            className={`grid grid-cols-1 gap-y-3 transition-opacity ${
                loading ? "opacity-60" : "opacity-100"
            }`}
            onSubmit={handleSubmit}
        >
            {children}
        </form>
    );
}
