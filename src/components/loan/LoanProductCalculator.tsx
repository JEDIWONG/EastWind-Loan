import { useState } from "react";
import { ddCurrency, ddInterestRate } from "../../utils/data-format-helper";
import { calculateLoanRepayment } from "../../utils/loan-calculation-helper";
import CardSectionHeader from "../generic/typography/CardSectionHeader";
import AppNumberField from "../generic/form/AppNumberField";
import {CalculateRounded } from "@mui/icons-material";

interface LoanProductCalculatorProps {
  minAmount: number;
  maxAmount: number;
  maxTenureMonth: number;
  interestRate: number;
}

const LoanProductCalculator = ({
  minAmount,
  maxAmount,
  maxTenureMonth,
  interestRate,
}: LoanProductCalculatorProps) => {

  const offset =100;
  const [loanAmount, setLoanAmount] = useState(minAmount);

  const [tenureMonth, setTenureMonth] = useState(Math.min(12, maxTenureMonth));

  const {totalInterest,totalRepayment,monthlyRepayment}= calculateLoanRepayment(loanAmount,interestRate,tenureMonth);

  const handleLoanAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value)*100;

    if (value >= minAmount && value <= maxAmount) {
      setLoanAmount(value);
    } else if (event.target.value === "") {
      setLoanAmount(0);
    }
  };

  const handleTenureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);

    if (value >= 1 && value <= maxTenureMonth) {
      setTenureMonth(value);
    } else if (event.target.value === "") {
      setTenureMonth(0);
    }
  };

  return (
    <div className="my-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-md">

      <CardSectionHeader 
        icon={<CalculateRounded/>}
        title="Loan Calculator" 
        subtitle="Estimate your monthly repayment based on the loan amount and tenure." 
        iconBackgroundClassName="bg-blue-50"
        iconClassName="text-blue-600"
      />

      <div className="flex gap-10">
        <div className="flex w-120 flex-col gap-5">
          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Loan Amount (RM)
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-gray-500">
                RM
              </span>

              <input
                type="number"
                min={minAmount/offset}
                max={maxAmount/offset}
                step={1000}
                value={loanAmount/100|| ""}
                onChange={handleLoanAmountChange}
                className="w-full rounded-lg border border-gray-300 p-4 pl-14 text-lg outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Min: {ddCurrency(minAmount)} · Max:{" "}
              {ddCurrency(maxAmount)}
            </p>
          </div>

          <AppNumberField
            label="Loan Tenure (Months)"
            min={1}
            max={maxTenureMonth}
            value={tenureMonth || ""}
            onChange={handleTenureChange}
          />

          <p className="-mt-4 text-xs text-gray-400">
            Maximum tenure: {maxTenureMonth} months
          </p>

          <div className="mb-8 rounded-xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Interest Rate
            </p>

            <p className="mt-1 text-lg font-bold">
              {ddInterestRate(interestRate)} p.a.
            </p>
          </div>

        </div>

        <div className="flex-1 rounded-2xl bg-gray-900 p-6 text-white">

          <p className="text-sm text-gray-400">
            Estimated Monthly Payment
          </p>

          <p className="mt-2 text-3xl font-bold">
            {tenureMonth > 0
              ? ddCurrency(monthlyRepayment)
              : "RM 0.00"}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-5">

            <div>
              <p className="text-xs text-gray-400">
                Total Interest
              </p>

              <p className="mt-1 font-semibold">
                {ddCurrency(
                  tenureMonth > 0 ? totalInterest : 0
                )}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Total Repayment
              </p>

              <p className="mt-1 font-semibold">
                {ddCurrency(
                  tenureMonth > 0 ? totalRepayment : 0
                )}
              </p>
            </div>

          </div>

          <p className="mt-5 text-xs leading-5 text-gray-400">
            This calculator provides an estimated repayment amount
            for illustration purposes only. Actual repayment may
            vary depending on the lender's calculation method,
            fees, and other applicable charges.
          </p>

        </div>

      </div>

    </div>
  );
};

export default LoanProductCalculator;