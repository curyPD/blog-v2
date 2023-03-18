import { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useControlledForm from "@/hooks/useControlledForm";

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

    async function handleSubmit(e: FormEvent): Promise<void> {
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
        <main>
            <form
                className={`transition-opacity bg-slate-400 ${
                    loading ? "opacity-60" : "opacity-100"
                }`}
                onSubmit={handleSubmit}
            >
                <div>
                    <label htmlFor="name">Email</label>
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
                    <label htmlFor="name">Password</label>
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
                    <button>Log In</button>
                </div>
                {error && <div>Error: {error.message}</div>}
            </form>
            <p>
                Don't have an account yet? <Link href="/signup">Sign Up</Link>
            </p>
        </main>
    );
}
