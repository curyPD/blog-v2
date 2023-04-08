import { FormEvent, useState } from "react";
import Link from "next/link";
import Label from "@/components/Label";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";
import {
    useCreateUserWithEmailAndPassword,
    useUpdateProfile,
} from "react-firebase-hooks/auth";
import useControlledForm from "@/hooks/useControlledForm";
import FormSubmitButton from "@/components/FormSubmitButton";
import FormGridContainer from "@/components/FormGridContainer";
import Message from "@/components/Message";
import Head from "next/head";

type StateType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function Signup() {
    const { input, handleChange } = useControlledForm<StateType>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
    const [inProp, setInProp] = useState<boolean>(false);

    const [createUserWithEmailAndPassword, , loading, error] =
        useCreateUserWithEmailAndPassword(auth);
    const [updateProfile] = useUpdateProfile(auth);

    const router = useRouter();

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        setPasswordsMatch(true);
        if (input.password !== input.confirmPassword) {
            setPasswordsMatch(false);
            return;
        }
        const credential = await createUserWithEmailAndPassword(
            input.email,
            input.password
        );
        if (error) {
            console.error(error);
            setInProp(true);
        }
        if (credential) {
            await updateProfile({
                displayName: input.name,
            });
            router.push("/");
        }
    }

    return (
        <>
            <Head>
                <title>Polyglot Dream | Sign Up</title>
            </Head>
            <Message
                isError={true}
                text={error?.message ?? "No errors on my watch 😎🚬"}
                inProp={inProp}
                onEntered={() => {
                    setTimeout(() => {
                        setInProp(false);
                    }, 7000);
                }}
            />

            <main className="flex h-[calc(100vh-49px)] items-center justify-center lg:h-[calc(100vh-57px)]">
                <div className="w-5/6 max-w-sm rounded border border-zinc-300 bg-white px-3 py-4 xs:px-6">
                    <h1 className="mb-5 text-sm font-semibold text-zinc-900 lg:text-base">
                        Sign up
                    </h1>
                    <FormGridContainer
                        loading={loading}
                        handleSubmit={handleSubmit}
                    >
                        <div>
                            <Label
                                text="name"
                                isLabelTag={true}
                                htmlFor="name"
                            />
                            <input
                                required
                                className="block w-full rounded-sm border border-zinc-400 px-3 py-1.5 text-sm text-zinc-900 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 lg:text-base"
                                type="text"
                                id="name"
                                name="name"
                                value={input.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label
                                text="email"
                                isLabelTag={true}
                                htmlFor="email"
                            />
                            <input
                                required
                                className="block w-full rounded-sm border border-zinc-400 px-3 py-1.5 text-sm text-zinc-900 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 lg:text-base"
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
                                className={`block w-full rounded-sm border px-3 py-1.5 text-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 lg:text-base ${
                                    passwordsMatch
                                        ? "border-zinc-400 text-zinc-900"
                                        : "border-red-500 text-red-600"
                                }`}
                                type="password"
                                id="password"
                                name="password"
                                value={input.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />
                        </div>
                        <div>
                            <Label
                                text="confirm password"
                                isLabelTag={true}
                                htmlFor="confirmPassword"
                            />
                            <input
                                required
                                className={`block w-full rounded-sm border px-3 py-1.5 text-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 lg:text-base ${
                                    passwordsMatch
                                        ? "border-zinc-400 text-zinc-900"
                                        : "border-red-500 text-red-600"
                                }`}
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={input.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />
                            {!passwordsMatch && (
                                <p className="text-xs font-medium text-red-600">
                                    Error: Passwords do not match
                                </p>
                            )}
                        </div>
                        <FormSubmitButton text="Sign up" />
                    </FormGridContainer>
                    <p className="mt-6 text-center text-xs text-zinc-500 lg:text-sm">
                        Already have an account?{" "}
                        <Link
                            className="text-zinc-900 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                            href="/login"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </main>
        </>
    );
}
