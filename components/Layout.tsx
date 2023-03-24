import { ReactNode } from "react";
import Header from "./Header";

type LayoutPropsType = {
    children: ReactNode | ReactNode[];
};

export default function Layout({ children }: LayoutPropsType) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
