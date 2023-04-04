import { useRef } from "react";
import { Transition } from "react-transition-group";
import {
    HiOutlineExclamationTriangle,
    HiOutlineCheckCircle,
} from "react-icons/hi2";

type MessagePropsType = {
    isError: boolean;
    text: string;
    inProp: boolean;
    onEntered: () => void;
};

const errorMessageTransitionStyles = {
    entering: { transform: "translateX(16px)" },
    entered: { transform: "translateX(16px)" },
    exiting: { transform: "translateX(-120%)" },
    exited: { transform: "translateX(-120%)" },
    unmounted: { transform: "translateX(-120%)" },
};

const successMessageTransitionStyles = {
    entering: { transform: "translateY(-32px)" },
    entered: { transform: "translateY(-32px)" },
    exiting: { transform: "translateY(120%)" },
    exited: { transform: "translateY(120%)" },
    unmounted: { transform: "translateY(120%)" },
};

export default function Message({
    isError,
    text,
    inProp,
    onEntered,
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
                onEntered={onEntered}
            >
                {(state) => (
                    <div
                        ref={nodeRef}
                        style={errorMessageTransitionStyles[state]}
                        className="absolute top-14 left-0 z-50 flex w-[calc(100%-32px)] max-w-xs items-start gap-4 rounded border border-red-300 bg-red-50 py-3 px-4 shadow-md transition-all duration-[1500ms] xs:w-auto lg:top-24 lg:max-w-sm lg:gap-5 lg:py-4 lg:px-5"
                    >
                        <HiOutlineExclamationTriangle className="h-5 w-5 shrink-0 text-red-700 lg:h-6 lg:w-6" />
                        <p className="text-sm font-medium text-red-700 lg:text-base">
                            {text}
                        </p>
                    </div>
                )}
            </Transition>
        );
    else
        return (
            <Transition
                nodeRef={nodeRef}
                mountOnEnter={true}
                unmountOnExit={true}
                in={inProp}
                timeout={1500}
                onEntered={onEntered}
            >
                {(state) => (
                    <div
                        ref={nodeRef}
                        style={successMessageTransitionStyles[state]}
                        className="absolute bottom-0 right-4 z-50 flex w-[calc(100%-32px)] max-w-xs items-start gap-4 rounded border border-green-300 bg-green-50 py-3 px-4 shadow-md transition-all duration-[1500ms] xs:w-auto lg:max-w-sm lg:gap-5 lg:py-4 lg:px-5"
                    >
                        <HiOutlineCheckCircle className="h-5 w-5 shrink-0 text-green-800 lg:h-6 lg:w-6" />
                        <p className="text-sm font-medium text-green-800 lg:text-base">
                            {text}
                        </p>
                    </div>
                )}
            </Transition>
        );
}
