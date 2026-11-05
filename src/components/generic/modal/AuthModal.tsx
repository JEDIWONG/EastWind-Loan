import { useState } from "react";
import {
    Close,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { login } from "../../../auth/login";
import logo from "../../../assets/logo.png";

interface AuthModalProps {
    title?: string;
    description?: string;
    navigatePath: string;
    onCancel: () => void;
}

const AuthModal = ({
    title = "Sign In",
    description = "Please sign in to continue.",
    navigatePath,
    onCancel,
}: AuthModalProps) => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (
        event
    ) => {
        event.preventDefault();

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await login(
                email,
                password
            );

            if (response.success) {
                onCancel();
                navigate(navigatePath);
            }
        } catch (error: any) {
            console.error("Login failed:", error);

            setError(
                error.response?.data?.message ??
                    "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/40 px-4">
            <div className="relative w-full max-w-lg rounded-2xl bg-white px-8 py-10 shadow-xl">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
                >
                    <Close />
                </button>

                <form
                    onSubmit={handleLogin}
                    method="post"
                    className="w-full"
                >
                    <div className="mb-8 flex flex-col items-center text-center">
                        <img
                            className="mb-5 h-5 w-40"
                            src={logo}
                            alt="EastWind Loan"
                        />

                        <p className="text-lg font-bold">
                            {title}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            {description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div>
                            <label
                                htmlFor="auth-modal-email"
                                className="mb-2 block text-sm text-gray-700"
                            >
                                Email
                            </label>

                            <input
                                id="auth-modal-email"
                                name="email"
                                type="email"
                                value={email}
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 disabled:bg-gray-100"
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="auth-modal-password"
                                className="mb-2 block text-sm text-gray-700"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="auth-modal-password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    disabled={loading}
                                    className="w-full rounded-lg border border-gray-300 p-3 pr-12 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 disabled:bg-gray-100"
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    disabled={loading}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 disabled:opacity-50"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </button>

                                <div className="mt-2 text-right">
                                    <a
                                        href="/forgot-password"
                                        className="text-sm font-medium text-indigo-500 transition hover:text-indigo-600"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                                <p className="text-sm text-red-600">
                                    {error}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-yellow-500 p-3 font-bold text-black transition hover:cursor-pointer hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Signing In..."
                                : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;
