import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";
import UserDataProvider from "@/context/UserDataProvider";
import Layout from "@/components/Layout";
import DashboardProvider from "@/context/DashboardProvider";

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
    display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <UserDataProvider>
            <DashboardProvider>
                <div className={`${openSans.variable} font-sans`}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </div>
            </DashboardProvider>
        </UserDataProvider>
    );
}
