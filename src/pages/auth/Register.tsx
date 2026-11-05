import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import logo from "../../assets/logo.png";

import { registerBorrower, registerLender } from "../../auth/register";
import type { RegistrationType } from "../../components/auth/RegisterLeftSection";
import type { BorrowerRegisterFields } from "../../components/auth/BorrowerRegister";
import type { LenderRegisterFields } from "../../components/auth/LenderRegister";
import RegisterLeftSection from "../../components/auth/RegisterLeftSection";
import BorrowerRegister from "../../components/auth/BorrowerRegister";
import LenderRegister from "../../components/auth/LenderRegister";
import { useRouteHelper } from "../../utils/route-helper";

const Register = () => {
    const [registrationType, setRegistrationType] =
        useState<RegistrationType>("borrower");

    const [errorMessage, setErrorMessage] = useState(""); 

    const {navToBorrowerDashboard,navToLenderDashboard} = useRouteHelper();

    const getErrorMessage = (error: unknown) => {
        if (axios.isAxiosError(error)) {
            const responseData = error.response?.data as {
                message?: string;
                errors?: Record<string, string[]>;
            };

            return (
                responseData?.message ||
                Object.values(responseData?.errors ?? {}).flat()[0] ||
                "Registration failed. Please try again."
            );
        }

        return error instanceof Error
            ? error.message
            : "Registration failed. Please try again.";
    };

    const onBorrowerSubmit = async (data: BorrowerRegisterFields) => {
        setErrorMessage("");

        try {
            const response = await registerBorrower(
                data.email,
                data.password,
                data.password_confirmation
            );

            if(response.success){
              navToBorrowerDashboard(); 
            }

        } catch (error) {
            setErrorMessage(getErrorMessage(error));
        }
    };

    const onLenderSubmit = async (data: LenderRegisterFields) => {
        setErrorMessage("");

        try {
            const response = await registerLender(
                data.email,
                data.password,
                data.password_confirmation,
                data.lender_reg_no,
                data.lender_name,
                data.emp_f_name,
                data.emp_l_name,
            );

            if(response.success){
              navToLenderDashboard(); 
            }


        } catch (error) {
            setErrorMessage(getErrorMessage(error));
        }
    };

    const changeRegistrationType = (type: RegistrationType) => {
        setRegistrationType(type);
        setErrorMessage("");
    };

    const isBorrower = registrationType === "borrower";

    return (
        <div className="flex min-h-screen w-full">
            <RegisterLeftSection
                registrationType={registrationType}
            />

            <main className="flex min-h-screen w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-12 xl:px-20">
                <div className="w-full max-w-xl">
                    <div className="mb-8 text-center">
                        <img
                            src={logo}
                            alt="EastWind Loan"
                            className="mx-auto mb-8 h-8 w-auto object-contain"
                        />

                        <div className="mb-3 inline-flex rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">
                            {isBorrower
                                ? "BORROWER REGISTRATION"
                                : "LENDER REGISTRATION"}
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            {isBorrower
                                ? "Create your account"
                                : "Register your organization"}
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            {isBorrower
                                ? "Create an account to explore loan products and financing options."
                                : "Create your organization's account and register your first employee."}
                        </p>
                    </div>

                    <div className="mb-8 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5">
                        <button
                            type="button"
                            onClick={() => changeRegistrationType("borrower")}
                            className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                                isBorrower
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            Borrower
                        </button>

                        <button
                            type="button"
                            onClick={() => changeRegistrationType("lender")}
                            className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                                !isBorrower
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            Lender
                        </button>
                    </div>

                    {isBorrower ? (
                        <BorrowerRegister
                            onSubmit={onBorrowerSubmit}
                        />
                    ) : (
                        <LenderRegister
                            onSubmit={onLenderSubmit}
                        />
                    )}

                    <div className="mt-8 border-t border-slate-100 pt-6 text-center">
                        <p className="text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link
                                to="/auth/login"
                                className="font-semibold text-indigo-600 transition hover:text-indigo-700"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>

                    <p className="mt-8 text-center text-xs text-slate-400">
                        &copy; {new Date().getFullYear()} EastWind Loan. All rights reserved.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Register;