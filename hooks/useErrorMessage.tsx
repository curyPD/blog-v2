import { useState, useEffect } from "react";

type ErrorWithMessage = {
    message: string;
};

function useErrorMessage<T extends ErrorWithMessage>(error: T | undefined) {
    const [errorMessageShown, setErrorMessageShown] = useState<boolean>(false);

    useEffect(() => {
        if (typeof error === "undefined") return;
        setErrorMessageShown(true);
        setTimeout(() => {
            setErrorMessageShown(false);
        }, 2000);
    }, [error]);

    return {
        errorMessageShown,
        errorMessage: error?.message ?? "This should never be the case",
    };
}

export default useErrorMessage;
