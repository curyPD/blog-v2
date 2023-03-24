import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";
import {
    useCreateUserWithEmailAndPassword,
    useUpdateProfile,
} from "react-firebase-hooks/auth";
import useControlledForm from "@/hooks/useControlledForm";

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
        if (error) console.error(error);
        if (credential) {
            await updateProfile({
                displayName: input.name,
            });
            router.push("/");
        }
    }

    return (
        <main>
            <form
                onSubmit={handleSubmit}
                className={`transition-opacity bg-slate-400 ${
                    loading ? "opacity-60" : "opacity-100"
                }`}
            >
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        required
                        className="border border-slate-900"
                        type="text"
                        id="name"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        required
                        className="border border-slate-900"
                        type="email"
                        id="email"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        required
                        className="border border-slate-900"
                        type="password"
                        id="password"
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        required
                        className="border border-slate-900"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={input.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button>Sign Up</button>
                </div>

                {error && <div>Error: {error.message}</div>}

                {!passwordsMatch && <div>Error: Passwords do not match</div>}
            </form>
            <p>
                Already have an account? <Link href="/login">Log In</Link>
            </p>
        </main>
    );
}
