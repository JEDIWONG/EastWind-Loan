import {
    Controller,
    type Control,
    type FieldErrors,
} from "react-hook-form";
import AppDropDown from "../../generic/form/AppDropDown";
import AppTextField from "../../generic/form/AppTextField";
import type { LoanApplicationFormFields } from "../../../schemas/loanSchema";

interface LoanApplicationBankInfoFormProps {
    control: Control<LoanApplicationFormFields>;
    errors: FieldErrors<LoanApplicationFormFields>;
    bankList: any[];
}

const LoanApplicationBankInfoForm = ({
    control,
    errors,
    bankList,
}: LoanApplicationBankInfoFormProps) => {
    return (
        <div className="grid grid-cols-1 gap-10">
            <Controller
                name="borrowerBankId"
                control={control}
                rules={{
                    required: "Please select a bank",
                }}
                render={({ field }) => (
                    <AppDropDown
                        label="Bank"
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors.borrowerBankId}
                        helperText={errors.borrowerBankId?.message}
                        options={bankList.map((bank) => ({
                            value: bank.id,
                            label: bank.bank_name,
                        }))}
                        placeholder="Select Bank"
                    />
                )}
            />

            <Controller
                name="borrowerBankAccNo"
                control={control}
                rules={{
                    required: "Bank account number is required",
                    pattern: {
                        value: /^\d+$/,
                        message: "Bank account number must contain only numbers",
                    },
                }}
                render={({ field }) => (
                    <AppTextField
                        label="Bank Account Number"
                        name="borrowerBankAccNo"
                        value={field.value}
                        error={!!errors.borrowerBankAccNo}
                        helperText={errors.borrowerBankAccNo?.message}
                        onChange={field.onChange}
                    />
                )}
            />
        </div>
    );
};

export default LoanApplicationBankInfoForm;
