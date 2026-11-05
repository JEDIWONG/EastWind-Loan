import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import AppTextField from "../../components/generic/form/AppTextField";

export interface BorrowerRegisterFields {
    email: string;
    password: string;
    password_confirmation: string;
}

interface BorrowerRegisterProps {
    onSubmit: (data: BorrowerRegisterFields) => Promise<void>;
}

const BorrowerRegister = ({ onSubmit }: BorrowerRegisterProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<BorrowerRegisterFields>({
        defaultValues: {
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const password = watch("password");

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
        >
            <Controller
                name="email"
                control={control}
                rules={{
                    required: "Email is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                    },
                }}
                render={({ field }) => (
                    <AppTextField
                        label="Email Address"
                        name="email"
                        value={field.value}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        onChange={field.onChange}
                        type="email"
                    />
                )}
            />

            <div className="relative">
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    }}
                    render={({ field }) => (
                        <AppTextField
                            label="Password"
                            name="password"
                            value={field.value}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            onChange={field.onChange}
                            type={showPassword ? "text" : "password"}
                        />
                    )}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-slate-400 transition hover:text-slate-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                        <VisibilityOff fontSize="small" />
                    ) : (
                        <Visibility fontSize="small" />
                    )}
                </button>
            </div>

            <div className="relative">
                <Controller
                    name="password_confirmation"
                    control={control}
                    rules={{
                        required: "Please confirm your password",
                        validate: (value) =>
                            value === password || "Passwords do not match",
                    }}
                    render={({ field }) => (
                        <AppTextField
                            label="Confirm Password"
                            name="password_confirmation"
                            value={field.value}
                            error={!!errors.password_confirmation}
                            helperText={errors.password_confirmation?.message}
                            onChange={field.onChange}
                            type={showConfirmPassword ? "text" : "password"}
                        />
                    )}
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-9 text-slate-400 transition hover:text-slate-700"
                    aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                    }
                >
                    {showConfirmPassword ? (
                        <VisibilityOff fontSize="small" />
                    ) : (
                        <Visibility fontSize="small" />
                    )}
                </button>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex w-full items-center justify-center rounded-lg bg-yellow-500 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
        </form>
    );
};

export default BorrowerRegister;