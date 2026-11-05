import {
    Controller,
    type Control,
    type FieldErrors
} from "react-hook-form";
import AppTextField from "../../generic/form/AppTextField";
import AppNumberField from "../../generic/form/AppNumberField";
import type { LoanApplicationFormFields } from "../../../schemas/loanSchema";

interface LoanApplicationStartFormProps {
    control: Control<LoanApplicationFormFields>;
    errors: FieldErrors<LoanApplicationFormFields>;
}

const LoanApplicationStartForm = ({
    control,
    errors,
}: LoanApplicationStartFormProps) => {
    return (
        <div className="grid grid-cols-1 gap-10">
            <Controller
                name="nric"
                control={control}
                rules={{
                    required: "NRIC is required",
                    pattern: {
                        value: /^\d{6}-?\d{2}-?\d{4}$/,
                        message: "Please enter a valid NRIC",
                    },
                }}
                render={({ field }) => (
                    <AppTextField
                        label="NRIC"
                        name="nric"
                        value={field.value}
                        error={!!errors.nric}
                        helperText={
                            errors.nric?.message || "Enter your national IC without dashes"
                        }
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name="monthlyIncome"
                control={control}
                rules={{
                    required: "Monthly income is required",
                    validate: (value) =>
                        Number(value) > 0 ||
                        "Monthly income is required",
                }}
                render={({ field }) => (
                    <AppNumberField
                        label="Monthly Income"
                        name="monthlyIncome"
                        prefix="RM"
                        value={field.value || 0}
                        min={0}
                        step={1000}
                        error={!!errors.monthlyIncome}
                        helperText={
                            errors.monthlyIncome?.message
                        }
                        onChange={field.onChange}
                    />
                )}
            />
        </div>
    );
};

export default LoanApplicationStartForm;
