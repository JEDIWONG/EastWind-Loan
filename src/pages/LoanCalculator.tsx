import { useMemo, useState, type ChangeEvent } from "react";
import { ddCurrency } from "../utils/data-format-helper";
import { calculateLoanRepayment } from "../utils/loan-calculation-helper";
import AppNumberField from "../components/generic/form/AppNumberField";
import SectionTitle from "../components/generic/typography/SectionTitle";

const LoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(10000);
    const [tenureMonth, setTenureMonth] = useState(24);
    const [interestRate, setInterestRate] = useState(8);

    const handleLoanAmountChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setLoanAmount(value === "" ? 0 : Math.round(Number(value)));
    };

    const handleTenureChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setTenureMonth(value === "" ? 0 : Number(value));
    };

    const handleInterestRateChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setInterestRate(value === "" ? 0 : Number(value));
    };

    const calculation = useMemo(() => {
        if (
            loanAmount <= 0 ||
            tenureMonth <= 0 ||
            interestRate < 0 ||
            interestRate > 100
        ) {
            return {
                totalInterest: 0,
                totalRepayment: 0,
                monthlyRepayment: 0,
            };
        }

        if (interestRate === 0) {
            return {
                totalInterest: 0,
                totalRepayment: loanAmount,
                monthlyRepayment: loanAmount / tenureMonth,
            };
        }

        return calculateLoanRepayment(
            loanAmount,
            interestRate,
            tenureMonth
        );
    }, [loanAmount, tenureMonth, interestRate]);

    const canCalculate =
        loanAmount > 0 &&
        tenureMonth > 0 &&
        interestRate >= 0 &&
        interestRate <= 100;

    return (

        <>  
            <div className="mx-20 my-10 min-h-200">
                <SectionTitle
                    title="Loan Calculator"
                    desc="Estimate your monthly repayment, total interest, and total repayment based on your preferred loan terms."
                />

                <section className="mx-auto my-10 max-w-7xl rounded-3xl bg-white p-6 shadow-md md:p-10">
                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <div className="flex flex-col gap-6">
                            <AppNumberField
                                label="Loan Amount"
                                prefix="RM"
                                min={0}
                                step={1000}
                                value={loanAmount || ""}
                                onChange={handleLoanAmountChange}
                            />

                            <AppNumberField
                                label="Loan Tenure (Months)"
                                min={1}
                                step={1}
                                value={tenureMonth || ""}
                                onChange={handleTenureChange}
                            />

                            <AppNumberField
                                label="Annual Interest Rate"
                                suffix="%"
                                min={0}
                                max={100}
                                step={0.1}
                                value={interestRate}
                                onChange={handleInterestRateChange}
                            />

                            <p className="-mt-4 text-xs leading-5 text-gray-500">
                                Enter the estimated annual interest rate provided
                                by your lender. You can adjust these values to
                                compare different repayment scenarios.
                            </p>
                        </div>

                        <div className="flex flex-col justify-between rounded-2xl bg-gray-900 p-6 text-white md:p-8">
                            <div>
                                <p className="text-sm text-gray-400">
                                    Estimated Monthly Repayment
                                </p>

                                <p className="mt-2 text-3xl font-bold text-yellow-400 md:text-4xl">
                                    {canCalculate
                                        ? ddCurrency(calculation.monthlyRepayment)
                                        : "RM 0.00"}
                                </p>

                                <div className="mt-8 grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Total Interest
                                        </p>

                                        <p className="mt-2 text-lg font-semibold">
                                            {ddCurrency(
                                                canCalculate
                                                    ? calculation.totalInterest
                                                    : 0
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Total Repayment
                                        </p>

                                        <p className="mt-2 text-lg font-semibold">
                                            {ddCurrency(
                                                canCalculate
                                                    ? calculation.totalRepayment
                                                    : 0
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 border-t border-gray-700 pt-5">
                                    <div className="flex justify-between gap-4 text-sm">
                                        <span className="text-gray-400">
                                            Loan Amount
                                        </span>
                                        <span>
                                            {ddCurrency(
                                                canCalculate ? loanAmount : 0
                                            )}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex justify-between gap-4 text-sm">
                                        <span className="text-gray-400">
                                            Repayment Period
                                        </span>
                                        <span>
                                            {canCalculate
                                                ? `${tenureMonth} months`
                                                : "-"}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex justify-between gap-4 text-sm">
                                        <span className="text-gray-400">
                                            Annual Interest Rate
                                        </span>
                                        <span>
                                            {interestRate.toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-8 text-xs leading-5 text-gray-400">
                                This calculator provides estimates for illustration
                                purposes only. Actual repayments may differ depending
                                on the lender's interest calculation method, fees,
                                and other applicable charges.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
        
    );
};

export default LoanCalculator; 