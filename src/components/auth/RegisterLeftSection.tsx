import register from "../../assets/register_2.png";

export type RegistrationType = "borrower" | "lender";

interface RegisterLeftSectionProps {
    registrationType: RegistrationType;
}

const RegisterLeftSection = ({
    registrationType,
}: RegisterLeftSectionProps) => {
    const isBorrower = registrationType === "borrower";

    return (
        <div className="relative hidden min-h-screen w-1/2 flex-col justify-between overflow-hidden bg-slate-900 px-12 py-12 lg:flex xl:px-20">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center">
                <div className="mb-8 flex h-80 w-full items-center justify-center rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                    <img
                        src={register}
                        alt="Registration illustration"
                        className="h-full w-full object-contain"
                    />
                </div>

                <span className="mb-4 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-yellow-400">
                    {isBorrower
                        ? "Your financial journey starts here"
                        : "Grow your lending business with us"}
                </span>

                <h1 className="text-3xl font-bold leading-tight text-white xl:text-4xl">
                    {isBorrower
                        ? "Start Your Loan Journey"
                        : "Become an EastWind Lending Partner"}
                </h1>

                <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                    {isBorrower
                        ? "Explore loan products from multiple lenders, compare financing options and find a solution that matches your financial needs."
                        : "Register your lending organization, connect with potential borrowers and manage your loan applications through EastWind Loan."}
                </p>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-slate-500">
                <span>EastWind Loan</span>
                <span>Smart Financing, Made Simple.</span>
            </div>
        </div>
    );
};

export default RegisterLeftSection;