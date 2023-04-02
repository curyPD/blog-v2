import { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useControlledForm from "@/hooks/useControlledForm";
import Label from "@/components/Label";
import FormSubmitButton from "@/components/FormSubmitButton";
import FormGridContainer from "@/components/FormGridContainer";

type StateType = {
    email: string;
    password: string;
};

export default function Login() {
    const { input, handleChange } = useControlledForm<StateType>({
        email: "",
        password: "",
    });

    const [signInWithEmailAndPassword, , loading, error] =
        useSignInWithEmailAndPassword(auth);

    const router = useRouter();

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        const credential = await signInWithEmailAndPassword(
            input.email,
            input.password
        );
        if (error) console.error(error);
        if (credential) {
            router.push("/");
        }
    }

    return (
        <main className="flex h-[calc(100vh-48px)] items-center justify-center lg:h-[calc(100vh-57px)]">
            <div className="w-5/6 max-w-sm rounded border border-zinc-300 bg-white px-3 py-4 xs:px-6">
                <h1 className="mb-5 text-sm font-semibold text-zinc-900 lg:text-base">
                    Log in
                </h1>
                <FormGridContainer
                    loading={loading}
                    handleSubmit={handleSubmit}
                >
                    <div>
                        <Label text="email" isLabelTag={true} htmlFor="email" />
                        <input
                            required
                            className="block w-full rounded-sm border border-zinc-400 px-3 py-1.5 text-sm text-zinc-900 lg:text-base"
                            type="email"
                            id="email"
                            name="email"
                            value={input.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label
                            text="password"
                            isLabelTag={true}
                            htmlFor="password"
                        />
                        <input
                            required
                            className="block w-full rounded-sm border border-zinc-400 px-3 py-1.5 text-sm text-zinc-900 lg:text-base"
                            type="password"
                            id="password"
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                        />
                    </div>

                    {error && (
                        <div className="text-center text-xs font-medium text-red-500 lg:text-sm">
                            Error: {error.message}
                        </div>
                    )}
                    <FormSubmitButton text="Log in" />
                </FormGridContainer>

                <p className="mt-6 text-center text-xs text-zinc-500 lg:text-sm">
                    Don't have an account yet?{" "}
                    <Link
                        className="text-zinc-900 hover:underline"
                        href="/signup"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </main>
    );
}
