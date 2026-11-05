import {
    Controller,
    type Control,
    type FieldErrors,
} from "react-hook-form";
import AppTextField from "../../generic/form/AppTextField";
import AppNumberField from "../../generic/form/AppNumberField";
import AppDropDown from "../../generic/form/AppDropDown";
import type { LoanApplicationFormFields } from "../../../schemas/loanSchema";

interface LoanApplicationEmploymentFormProps {
    control: Control<LoanApplicationFormFields>;
    errors: FieldErrors<LoanApplicationFormFields>;
    employmentStatuses: any[];
    sectorList: any[];
    stateList: any[];
}

const LoanApplicationEmploymentForm = ({
    control,
    errors,
    employmentStatuses,
    sectorList,
    stateList,
}: LoanApplicationEmploymentFormProps) => {
    return (
        <div className="grid grid-cols-1 gap-5">
            <Controller
                name="employmentOccupation"
                control={control}
                rules={{
                    required: "Occupation is required",
                }}
                render={({ field }) => (
                    <AppTextField
                        label="Occupation"
                        name="employmentOccupation"
                        value={field.value}
                        error={!!errors.employmentOccupation}
                        helperText={
                            errors.employmentOccupation?.message
                        }
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name="employmentStatusID"
                control={control}
                rules={{
                    required: "Please select your employment status",
                }}
                render={({ field }) => (
                    <AppDropDown
                        label="Employment Status"
                        value={field.value}
                        error={!!errors.employmentStatusID}
                        helperText={
                            errors.employmentStatusID?.message
                        }
                        onChange={field.onChange}
                        options={employmentStatuses.map((item) => ({
                            value: item.id,
                            label: item.employment_status_name,
                        }))}
                        placeholder="Select employment status"
                    />
                )}
            />

            <Controller
                name="employerName"
                control={control}
                rules={{
                    required: "Employer name is required",
                }}
                render={({ field }) => (
                    <AppTextField
                        label="Employer Name"
                        name="employerName"
                        value={field.value}
                        error={!!errors.employerName}
                        helperText={
                            errors.employerName?.message
                        }
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name="employmentSector"
                control={control}
                rules={{
                    required: "Please select your employment sector",
                }}
                render={({ field }) => (
                    <AppDropDown
                        label="Employment Sector"
                        value={field.value}
                        error={!!errors.employmentSector}
                        helperText={
                            errors.employmentSector?.message
                        }
                        onChange={field.onChange}
                        options={sectorList.map((item) => ({
                            value: item.id,
                            label: item.sector_name,
                        }))}
                        placeholder="Select employment sector"
                    />
                )}
            />

            <div className="grid grid-cols-2 gap-2">
                <Controller
                    name="employmentDurationYear"
                    control={control}
                    rules={{
                        min: {
                            value: 0,
                            message: "Years cannot be negative",
                        },
                    }}
                    render={({ field }) => (
                        <AppNumberField
                            label="Employment Duration (Years)"
                            name="employmentDurationYear"
                            value={field.value}
                            min={0}
                            onChange={(event) =>
                                field.onChange(
                                    Number(event.target.value)
                                )
                            }
                            error={
                                !!errors.employmentDurationYear
                            }
                            helperText={
                                errors.employmentDurationYear?.message
                            }
                        />
                    )}
                />

                <Controller
                    name="employmentDurationMonth"
                    control={control}
                    rules={{
                        min: {
                            value: 0,
                            message: "Months cannot be negative",
                        },
                        max: {
                            value: 11,
                            message: "Months must be between 0 and 11",
                        },
                    }}
                    render={({ field }) => (
                        <AppNumberField
                            label="Employment Duration (Months)"
                            name="employmentDurationMonth"
                            value={field.value}
                            min={0}
                            max={11}
                            onChange={(event) =>
                                field.onChange(
                                    Number(event.target.value)
                                )
                            }
                            error={
                                !!errors.employmentDurationMonth
                            }
                            helperText={
                                errors.employmentDurationMonth?.message
                            }
                        />
                    )}
                />
            </div>

            <Controller
                name="employmentAddr"
                control={control}
                rules={{
                    required: "Office address is required",
                }}
                render={({ field }) => (
                    <AppTextField
                        label="Office Address"
                        name="employmentAddr"
                        value={field.value}
                        error={!!errors.employmentAddr}
                        helperText={
                            errors.employmentAddr?.message
                        }
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name="employmentAddrPostcode"
                control={control}
                rules={{
                    required: "Postcode is required",
                }}
                render={({ field }) => (
                    <AppTextField
                        label="Office PostCode"
                        name="employmentAddrPostcode"
                        value={field.value}
                        error={!!errors.employmentAddrPostcode}
                        helperText={
                            errors.employmentAddrPostcode?.message
                        }
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name="employmentCity"
                control={control}
                rules={{
                    required: "City is required",
                }}
                render={({ field }) => (
                    <AppTextField
                        label="Office City"
                        name="employmentCity"
                        value={field.value}
                        error={!!errors.employmentCity}
                        helperText={
                            errors.employmentCity?.message
                        }
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name="employmentState"
                control={control}
                rules={{
                    required: "Please select your state",
                }}
                render={({ field }) => (
                    <AppDropDown
                        label="Office State"
                        value={field.value}
                        error={!!errors.employmentState}
                        helperText={
                            errors.employmentState?.message
                        }
                        onChange={field.onChange}
                        options={stateList.map((item) => ({
                            value: item.id,
                            label: item.state_name,
                        }))}
                        placeholder="Select state name"
                    />
                )}
            />

            <Controller
                name="employerContactNo"
                control={control}
                rules={{
                    required: "Office contact number is required",
                }}
                render={({ field }) => (
                    <AppTextField
                        label="Employer Contact Number"
                        name="employerContactNo"
                        value={field.value}
                        error={!!errors.employerContactNo}
                        helperText={
                            errors.employerContactNo?.message
                        }
                        onChange={field.onChange}
                    />
                )}
            />
        </div>
    );
};

export default LoanApplicationEmploymentForm;