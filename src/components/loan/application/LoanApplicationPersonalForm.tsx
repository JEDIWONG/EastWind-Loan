import { Controller, type Control, type FieldErrors } from "react-hook-form";
import AppTextField from "../../generic/form/AppTextField";
import AppDropDown from "../../generic/form/AppDropDown";
import type { LoanApplicationFormFields } from "../../../schemas/loanSchema";

interface LoanApplicationPersonalFormProps {
    control: Control<LoanApplicationFormFields>;
    errors: FieldErrors<LoanApplicationFormFields>;

    age: number;
    gender: string;

    eduLevelList: any[];
    stateList: any[];
    homeOwnershipStatuses: any[];
    bankList: any[];
}

const LoanApplicationPersonalForm = ({
    control,
    errors,
    age,
    gender,
    eduLevelList,
    stateList,
    homeOwnershipStatuses,
    bankList,
}: LoanApplicationPersonalFormProps) => {
    return (
        <div className="grid grid-cols-1 gap-5">
            <div className="grid grid-cols-2 gap-2">
                <Controller
                    name="firstName"
                    control={control}
                    rules={{
                        required: "First name is required",
                    }}
                    render={({ field }) => (
                        <AppTextField
                            label="First Name"
                            name="firstName"
                            value={field.value}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            onChange={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="lastName"
                    control={control}
                    rules={{
                        required: "Last name is required",
                    }}
                    render={({ field }) => (
                        <AppTextField
                            label="Last Name"
                            name="lastName"
                            value={field.value}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <AppTextField
                    label="Age"
                    name="age"
                    value={age}
                    disabled
                />

                <AppTextField
                    label="Gender"
                    name="gender"
                    value={gender}
                    disabled
                />
            </div>

            <Controller
                name="borrowerEduLevel"
                control={control}
                rules={{
                    required: "Please select your education level",
                }}
                render={({ field }) => (
                    <AppDropDown
                        label="Education Level"
                        value={field.value}
                        error={!!errors.borrowerEduLevel}
                        helperText={
                            errors.borrowerEduLevel?.message
                        }
                        onChange={field.onChange}
                        options={eduLevelList.map((item) => ({
                            value: item.id,
                            label: item.edu_level_name,
                        }))}
                        placeholder="Select education level"
                    />
                )}
            />

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
                        label="Email"
                        name="email"
                        value={field.value}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name="phoneNumber"
                control={control}
                rules={{
                    required: "Phone number is required",
                }}
                render={({ field }) => (
                    <AppTextField
                        label="Phone Number"
                        name="phoneNumber"
                        value={field.value}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name="borrowerAddr"
                control={control}
                rules={{
                    required: "Address is required",
                }}
                render={({ field }) => (
                    <AppTextField
                        label="Address"
                        name="borrowerAddr"
                        value={field.value}
                        error={!!errors.borrowerAddr}
                        helperText={errors.borrowerAddr?.message}
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name="borrowerAddrPostcode"
                control={control}
                rules={{
                    required: "Postcode is required",
                }}
                render={({ field }) => (
                    <AppTextField
                        label="PostCode"
                        name="borrowerAddrPostcode"
                        value={field.value}
                        error={!!errors.borrowerAddrPostcode}
                        helperText={
                            errors.borrowerAddrPostcode?.message
                        }
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name="borrowerCity"
                control={control}
                rules={{
                    required: "City is required",
                }}
                render={({ field }) => (
                    <AppTextField
                        label="City"
                        name="borrowerCity"
                        value={field.value}
                        error={!!errors.borrowerCity}
                        helperText={errors.borrowerCity?.message}
                        onChange={field.onChange}
                    />
                )}
            />

            <Controller
                name="borrowerState"
                control={control}
                rules={{
                    required: "Please select your state",
                }}
                render={({ field }) => (
                    <AppDropDown
                        label="State"
                        value={field.value}
                        error={!!errors.borrowerState}
                        helperText={errors.borrowerState?.message}
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
                name="homeOwnershipID"
                control={control}
                rules={{
                    required:
                        "Please select your home ownership status",
                }}
                render={({ field }) => (
                    <AppDropDown
                        label="Home Ownership"
                        value={field.value}
                        error={!!errors.homeOwnershipID}
                        helperText={
                            errors.homeOwnershipID?.message
                        }
                        onChange={field.onChange}
                        options={homeOwnershipStatuses.map(
                            (status) => ({
                                value: status.id,
                                label: String(
                                    status.home_ownership_status_name
                                )
                                    .replace("_", " ")
                                    .replace(
                                        /\b\w/g,
                                        (char) =>
                                            char.toUpperCase()
                                    ),
                            })
                        )}
                        placeholder="Select home ownership"
                    />
                )}
            />

            <div className="grid grid-cols-2 gap-2">
                <Controller
                    name="borrowerBankId"
                    control={control}
                    rules={{
                        required: "Please select your bank",
                    }}
                    render={({ field }) => (
                        <AppDropDown
                            label="Bank"
                            value={field.value}
                            error={!!errors.borrowerBankId}
                            helperText={
                                errors.borrowerBankId?.message
                            }
                            onChange={field.onChange}
                            options={bankList.map((bank) => ({
                                value: bank.id,
                                label: bank.bank_name,
                            }))}
                            placeholder="Select bank"
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
                            message:
                                "Bank account number must contain only numbers",
                        },
                    }}
                    render={({ field }) => (
                        <AppTextField
                            label="Bank Account Number"
                            name="borrowerBankAccNo"
                            value={field.value}
                            error={!!errors.borrowerBankAccNo}
                            helperText={
                                errors.borrowerBankAccNo?.message
                            }
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default LoanApplicationPersonalForm;
