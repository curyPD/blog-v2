import "@/styles/globals.css";
import type { AppProps } from "next/app";
import UserDataProvider from "@/context/UserDataProvider";
import Layout from "@/components/Layout";
// import DashboardProvider from "@/context/DashboardProvider";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <UserDataProvider>
            {/* <DashboardProvider> */}
            <Layout>
                <Component {...pageProps} />
            </Layout>
            {/* </DashboardProvider> */}
        </UserDataProvider>
    );
}
