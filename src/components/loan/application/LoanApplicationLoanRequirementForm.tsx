import {
    Controller,
    useWatch,
    type Control,
    type FieldErrors,
} from "react-hook-form";
import AppNumberField from "../../generic/form/AppNumberField";
import AppDropDown from "../../generic/form/AppDropDown";
import { calculateLoanRepayment } from "../../../utils/loan-calculation-helper";
import type { LoanProduct } from "../../../schemas/LoanProductSchema";
import type { LoanApplicationFormFields } from "../../../schemas/loanSchema";

interface LoanApplicationLoanRequirementFormProps {
    control: Control<LoanApplicationFormFields>;
    errors: FieldErrors<LoanApplicationFormFields>;
    productInfo: LoanProduct | null;
    loanPurposes: any[];
}

const LoanApplicationLoanRequirementForm = ({
    control,
    errors,
    productInfo,
    loanPurposes,
}: LoanApplicationLoanRequirementFormProps) => {
    const loanAmount = useWatch({
        control,
        name: "loanAmount",
    });

    const loanTenure = useWatch({
        control,
        name: "loanTenure",
    });

    return (
        <div className="grid grid-cols-1 gap-10">
            <Controller
                name="loanAmount"
                control={control}
                rules={{
                    validate: (value) => {
                        if (!value || value <= 0) {
                            return "Loan amount is required";
                        }

                        if (
                            productInfo &&
                            value <
                                Number(
                                    productInfo.loan_product_min_amount
                                )
                        ) {
                            return `Loan amount must be at least RM ${Number(
                                productInfo.loan_product_min_amount
                            )}`;
                        }

                        if (
                            productInfo &&
                            value >
                                Number(
                                    productInfo.loan_product_max_amount
                                )
                        ) {
                            return `Loan amount cannot exceed RM ${Number(
                                productInfo.loan_product_max_amount
                            )}`;
                        }

                        return true;
                    },
                }}
                render={({ field }) => (
                    <AppNumberField
                        label="Loan Amount"
                        name="loanAmount"
                        value={field.value}
                        step={1000}
                        min={
                            productInfo
                                ? Number(
                                      productInfo.loan_product_min_amount
                                  )
                                : 0
                        }
                        max={
                            productInfo
                                ? Number(
                                      productInfo.loan_product_max_amount
                                  )
                                : 0
                        }
                        error={!!errors.loanAmount}
                        helperText={
                            errors.loanAmount?.message ??
                            `Enter amount in between RM ${
                                Number(
                                    productInfo?.loan_product_min_amount ??
                                        0
                                )
                            } - RM ${
                                Number(
                                    productInfo?.loan_product_max_amount ??
                                        0
                                )
                            }`
                        }
                        onChange={(event) =>
                            field.onChange(
                                Number(event.target.value)
                            )
                        }
                    />
                )}
            />

            <Controller
                name="loanTenure"
                control={control}
                rules={{
                    validate: (value) => {
                        if (!value || value <= 0) {
                            return "Loan tenure is required";
                        }

                        if (
                            productInfo &&
                            value >
                                Number(
                                    productInfo.loan_product_max_tenure_month
                                )
                        ) {
                            return `Loan tenure cannot exceed ${productInfo.loan_product_max_tenure_month} months`;
                        }

                        return true;
                    },
                }}
                render={({ field }) => (
                    <AppNumberField
                        label="Loan Tenure (months)"
                        name="loanTenure"
                        value={field.value}
                        min={1}
                        max={
                            productInfo
                                ? Number(
                                      productInfo.loan_product_max_tenure_month
                                  )
                                : 0
                        }
                        error={!!errors.loanTenure}
                        helperText={
                            errors.loanTenure?.message ??
                            `Max Terms : ${
                                productInfo?.loan_product_max_tenure_month ??
                                0
                            } months`
                        }
                        onChange={(event) =>
                            field.onChange(
                                Number(event.target.value)
                            )
                        }
                    />
                )}
            />

            <Controller
                name="loanPurposeID"
                control={control}
                rules={{
                    required: "Please select a loan purpose",
                }}
                render={({ field }) => (
                    <AppDropDown
                        label="Purpose of Loan"
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors.loanPurposeID}
                        helperText={
                            errors.loanPurposeID?.message
                        }
                        options={loanPurposes.map((status) => ({
                            value: status.id,
                            label: String(
                                status.loan_purpose_name
                            )
                                .replace("_", " ")
                                .replace(
                                    /\b\w/g,
                                    (char) =>
                                        char.toUpperCase()
                                ),
                        }))}
                        placeholder="Select Loan Purpose"
                    />
                )}
            />

            <AppNumberField
                label="Interest Rate"
                name="interestRate"
                suffix="%"
                value={
                    productInfo
                        ? Number(
                              productInfo.loan_product_interest_rate
                          )
                        : 0
                }
                disabled
            />

            <AppNumberField
                label="Monthly Repayment Amount"
                name="monthlyRepaymentAmount"
                prefix="RM"
                value={
                    loanTenure && loanAmount
                        ? calculateLoanRepayment(
                              Number(loanAmount),
                              Number(
                                  productInfo?.loan_product_interest_rate
                              ),
                              Number(loanTenure)
                          ).monthlyRepayment.toFixed(2)
                        : 0
                }
                disabled
            />
        </div>
    );
};

export default LoanApplicationLoanRequirementForm;