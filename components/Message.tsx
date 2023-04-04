import { Dispatch, SetStateAction, useRef } from "react";
import { Transition } from "react-transition-group";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

type MessagePropsType = {
    isError: boolean;
    text: string;
    inProp: boolean;
    setInProp: Dispatch<SetStateAction<boolean>>;
};

const transitionStyles = {
    entering: { transform: "translateX(16px)" },
    entered: { transform: "translateX(16px)" },
    exiting: { transform: "translateX(-120%)" },
    exited: { transform: "translateX(-120%)" },
    unmounted: { transform: "translateX(-120%)" },
};

export default function Message({
    isError,
    text,
    inProp,
    setInProp,
}: MessagePropsType) {
    const nodeRef = useRef(null);
    if (isError)
        return (
            <Transition
                nodeRef={nodeRef}
                mountOnEnter={true}
                unmountOnExit={true}
                in={inProp}
                timeout={1500}
                onEntered={() => {
                    setTimeout(() => {
                        setInProp(false);
                    }, 7000);
                }}
            >
                {(state) => (
                    <div
                        ref={nodeRef}
                        style={transitionStyles[state]}
                        className="absolute top-14 left-0 z-50 flex w-[calc(100%-32px)] max-w-xs items-start gap-4 rounded border border-red-300 bg-red-50 py-3 px-4 transition-all duration-[1500ms] xs:w-auto lg:top-20 lg:max-w-sm lg:gap-5 lg:py-4 lg:px-5"
                    >
                        <HiOutlineExclamationTriangle className="h-5 w-5 shrink-0 text-red-700 lg:h-6 lg:w-6" />
                        <p className="text-sm font-medium text-red-700 lg:text-base">
                            {text}
                        </p>
                    </div>
                )}
            </Transition>
        );
    else return <div>{text}</div>;
}
