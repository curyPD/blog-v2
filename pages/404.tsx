import Link from "next/link";

export default function Custom404() {
    return (
        <main className="relative h-[calc(100vh-49px)] lg:h-[calc(100vh-57px)]">
            <div className="absolute top-1/2 left-1/2 w-5/6 -translate-x-1/2 -translate-y-1/2">
                <h1 className="mb-8 flex items-center justify-center gap-4 lg:mb-10 lg:gap-6">
                    <strong className="text-xl text-zinc-900 lg:text-2xl">
                        404
                    </strong>
                    <span className="text-base text-zinc-600 lg:text-lg">
                        Page Not Found
                    </span>
                </h1>

                <Link
                    href="/"
                    className="mx-auto block w-max text-sm text-zinc-900 underline underline-offset-2 hover:no-underline lg:text-base"
                >
                    &larr; Back to Home Page
                </Link>
            </div>
        </main>
    );
}
