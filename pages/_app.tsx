import "@/styles/globals.css";
import type { AppProps } from "next/app";
import UserDataProvider from "@/context/UserDataProvider";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <UserDataProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserDataProvider>
    );
}
