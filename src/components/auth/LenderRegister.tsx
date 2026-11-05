import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import AppTextField from "../../components/generic/form/AppTextField";

export interface LenderRegisterFields {
    email: string;
    password: string;
    password_confirmation: string;
    lender_reg_no: string;
    lender_name: string;
    emp_f_name: string;
    emp_l_name: string;
}

interface LenderRegisterProps {
    onSubmit: (data: LenderRegisterFields) => Promise<void>;
}

const LenderRegister = ({ onSubmit }: LenderRegisterProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<LenderRegisterFields>({
        defaultValues: {
            email: "",
            password: "",
            password_confirmation: "",
            lender_reg_no: "",
            lender_name: "",
            emp_f_name: "",
            emp_l_name: "",
        },
    });

    const password = watch("password");

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-7"
        >
            <div className="flex flex-col gap-5">
                

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Controller
                        name="emp_f_name"
                        control={control}
                        rules={{
                            required: "First name is required",
                        }}
                        render={({ field }) => (
                            <AppTextField
                                label="First Name"
                                name="emp_f_name"
                                value={field.value}
                                error={!!errors.emp_f_name}
                                helperText={errors.emp_f_name?.message}
                                onChange={field.onChange}
                            />
                        )}
                    />

                    <Controller
                        name="emp_l_name"
                        control={control}
                        rules={{
                            required: "Last name is required",
                        }}
                        render={({ field }) => (
                            <AppTextField
                                label="Last Name"
                                name="emp_l_name"
                                value={field.value}
                                error={!!errors.emp_l_name}
                                helperText={errors.emp_l_name?.message}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>

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
            </div>

            <div className="flex flex-col gap-5">
                <h3 className="border-b border-slate-100 pb-3 text-sm font-bold text-slate-800">
                    Organization Details
                </h3>

                <Controller
                    name="lender_reg_no"
                    control={control}
                    rules={{
                        required: "Organization registration number is required",
                    }}
                    render={({ field }) => (
                        <AppTextField
                            label="Registration Number"
                            name="lender_reg_no"
                            value={field.value}
                            error={!!errors.lender_reg_no}
                            helperText={errors.lender_reg_no?.message}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="lender_name"
                    control={control}
                    rules={{
                        required: "Organization name is required",
                    }}
                    render={({ field }) => (
                        <AppTextField
                            label="Organization Name"
                            name="lender_name"
                            value={field.value}
                            error={!!errors.lender_name}
                            helperText={errors.lender_name?.message}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex w-full items-center justify-center rounded-lg bg-yellow-500 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? "Registering Organization..." : "Register Organization"}
            </button>
        </form>
    );
};

export default LenderRegister;