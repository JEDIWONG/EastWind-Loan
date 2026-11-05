import {
    Controller,
    useFieldArray,
    type Control,
    type FieldErrors,
} from "react-hook-form";
import AppDropDown from "../../generic/form/AppDropDown";
import AppNumberField from "../../generic/form/AppNumberField";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { LoanApplicationFormFields } from "../../../schemas/loanSchema";

interface LoanApplicationDebtInfoProps {
    control: Control<LoanApplicationFormFields>;
    errors: FieldErrors<LoanApplicationFormFields>;
    debtTypeList: any[];
}

const LoanApplicationDebtInfo = ({
    control,
    errors,
    debtTypeList,
}: LoanApplicationDebtInfoProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "debtInfo",
    });

    return (
        <div className="grid grid-cols-1 gap-5">
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="grid grid-cols-1 gap-10 px-10 py-5"
                >
                    <div className="flex items-center gap-3">
                        <Controller
                            name={`debtInfo.${index}.debtTypeID`}
                            control={control}
                            render={({ field }) => (
                                <AppDropDown
                                    label="Debt Type"
                                    options={debtTypeList.map(
                                        (item) => ({
                                            value: item.id,
                                            label: item.debt_type_name,
                                        })
                                    )}
                                    value={field.value}
                                    error={
                                        !!errors.debtInfo?.[
                                            index
                                        ]?.debtTypeID
                                    }
                                    helperText={
                                        errors.debtInfo?.[
                                            index
                                        ]?.debtTypeID?.message
                                    }
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        <Controller
                            name={`debtInfo.${index}.monthlyDebtCommitment`}
                            control={control}
                            render={({ field }) => (
                                <AppNumberField
                                    label="Monthly Debt Commitment"
                                    prefix="RM"
                                    value={field.value || 0}
                                    min={0}
                                    step={100}
                                    onChange={field.onChange}
                                    error={
                                        !!errors.debtInfo?.[
                                            index
                                        ]?.monthlyDebtCommitment
                                    }
                                    helperText={
                                        errors.debtInfo?.[
                                            index
                                        ]?.monthlyDebtCommitment
                                            ?.message
                                    }
                                />
                            )}
                        />

                        <IconButton
                            type="button"
                            onClick={() => remove(index)}
                        >
                            <DeleteIcon color="error" />
                        </IconButton>
                    </div>
                </div>
            ))}

            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={() =>
                        append({
                            debtTypeID: "",
                            monthlyDebtCommitment: "",
                        })
                    }
                    className="rounded-lg bg-blue-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                    + Add Debt
                </button>
            </div>
        </div>
    );
};

export default LoanApplicationDebtInfo;