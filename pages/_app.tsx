import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";
import UserDataProvider from "@/context/UserDataProvider";
import Layout from "@/components/Layout";
import DashboardProvider from "@/context/DashboardProvider";

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
    // display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name="description"
                    content="Polyglot Dream - Personal Blog About Language Acquisition"
                    key="desc"
                />
                <meta
                    property="og:title"
                    content="Polyglot Dream"
                    key="ogtitle"
                />
                <meta
                    property="og:description"
                    content="Polyglot Dream - Personal Blog About Language Acquisition"
                    key="ogdesc"
                />
                <meta
                    property="og:image"
                    content="/ogimage.png"
                    key="ogimage"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta name="msapplication-TileColor" content="#00aba9" />
                <meta name="theme-color" content="#ffffff" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <UserDataProvider>
                <DashboardProvider>
                    <div
                        className={`${openSans.variable} flex min-h-screen flex-col font-sans`}
                    >
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </div>
                </DashboardProvider>
            </UserDataProvider>
        </>
    );
}
