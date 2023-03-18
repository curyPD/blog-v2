import { useState, ChangeEvent } from "react";

function useControlledForm<T>(initState: T): {
    input: T;
    handleChange: (e: ChangeEvent) => void;
} {
    const [input, setInput] = useState<T>(initState);

    function handleChange(e: ChangeEvent): void {
        const { name, value } = e.target as HTMLInputElement;
        setInput((prevInput) => ({ ...prevInput, [name]: value }));
    }

    return { input, handleChange };
}

export default useControlledForm;
