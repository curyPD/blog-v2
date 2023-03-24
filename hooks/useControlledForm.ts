import { useState, type ChangeEvent } from "react";

type UseControlledFormType<T> = {
    input: T;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function useControlledForm<T>(initState: T): UseControlledFormType<T> {
    const [input, setInput] = useState<T>(initState);

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target as HTMLInputElement;
        setInput((prevInput) => ({ ...prevInput, [name]: value }));
    }

    return { input, handleChange };
}

export default useControlledForm;
