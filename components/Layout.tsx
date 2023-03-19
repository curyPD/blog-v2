import Header from "./Header";
import { LayoutPropsType } from "../types/types";

export default function Layout({ children }: LayoutPropsType) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
