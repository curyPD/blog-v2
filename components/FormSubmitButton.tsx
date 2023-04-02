export default function FormSubmitButton({ text }: { text: string }) {
    return (
        <button className="mt-4 block w-full rounded-sm bg-zinc-900 py-2 px-5 text-sm font-semibold text-white hover:bg-zinc-800 lg:text-base">
            {text}
        </button>
    );
}
