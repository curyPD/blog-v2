import "@/styles/globals.css";
import type { AppProps } from "next/app";
import UserDataProvider from "@/context/UserDataProvider";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <UserDataProvider>
            <Component {...pageProps} />
        </UserDataProvider>
    );
}
