import { useState, useEffect, RefObject } from "react";

function useEditorMenuDropdownStyles(
    ref: RefObject<HTMLDivElement>,
    dropdownOpen: boolean
) {
    const [dropdownStyles, setDropdownStyles] = useState<
        Record<string, string>
    >({});
    useEffect(() => {
        if (!ref.current || !dropdownOpen) return;
        const { height, top, bottom } = ref.current.getBoundingClientRect();
        const dropdownToggleCoords: number = top + height / 2;
        const viewportCenter: number = window.innerHeight / 2;
        if (dropdownToggleCoords > viewportCenter) {
            setDropdownStyles({
                maxHeight: `${top - 56}px`,
                bottom: "100%",
                transform: `translateY(4px)`,
            });
        } else {
            setDropdownStyles({
                maxHeight: `${window.innerHeight - bottom}px`,
                top: "100%",
                transform: `translateY(-4px)`,
            });
        }
    }, [ref.current, dropdownOpen]);
    return dropdownStyles;
}

export default useEditorMenuDropdownStyles;
