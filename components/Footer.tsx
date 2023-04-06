export default function Footer() {
    const now: Date = new Date();
    const year: number = now.getFullYear();

    return (
        <footer className="mt-auto border-t border-zinc-200 bg-white">
            <div className="container mx-auto flex h-12 items-center px-4 text-sm text-zinc-400 xs:px-6 lg:h-14 lg:px-9 lg:text-base xl:max-w-screen-xl 2xl:px-0">
                Copyright &copy; {year} by Roman Druzhinin.
            </div>
        </footer>
    );
}
