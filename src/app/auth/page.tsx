"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Car, Mail, Lock, User, Phone } from "lucide-react";
import styles from "./Auth.module.css";

export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login, register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (mode === "login") {
                await login(email, password);
            } else {
                if (!name || !phone) {
                    setError("Please fill in all fields.");
                    setLoading(false);
                    return;
                }
                await register(email, password, name, phone);
            }
            router.push("/my-bookings");
        } catch (err: any) {
            if (err?.code === "auth/user-not-found" || err?.code === "auth/wrong-password" || err?.code === "auth/invalid-credential") {
                setError("Invalid email or password.");
            } else if (err?.code === "auth/email-already-in-use") {
                setError("This email is already registered. Try logging in.");
            } else if (err?.code === "auth/weak-password") {
                setError("Password must be at least 6 characters.");
            } else {
                setError("Something went wrong. Please try again.");
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <Car size={40} className={styles.logoIcon} />
                    <h1>{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
                    <p>
                        {mode === "login"
                            ? "Sign in to manage your bookings"
                            : "Join Haider Travels today"}
                    </p>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${mode === "login" ? styles.active : ""}`}
                        onClick={() => { setMode("login"); setError(""); }}
                    >
                        Sign In
                    </button>
                    <button
                        className={`${styles.tab} ${mode === "register" ? styles.active : ""}`}
                        onClick={() => { setMode("register"); setError(""); }}
                    >
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {mode === "register" && (
                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label><User size={14} /> Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label><Phone size={14} /> Phone</label>
                                <input
                                    type="tel"
                                    placeholder="03xx xxxxxxx"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <label><Mail size={14} /> Email Address</label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label><Lock size={14} /> Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : mode === "login"
                                ? "Sign In"
                                : "Create Account"}
                    </button>
                </form>

                <div className={styles.footer}>
                    {mode === "login" ? (
                        <p>Don&apos;t have an account? <a onClick={() => setMode("register")}>Register</a></p>
                    ) : (
                        <p>Already have an account? <a onClick={() => setMode("login")}>Sign In</a></p>
                    )}
                </div>
            </div>
        </div>
    );
}
