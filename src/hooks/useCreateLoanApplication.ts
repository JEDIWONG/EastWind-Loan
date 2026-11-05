import { useState } from "react";
import type { UseFormGetValues } from "react-hook-form";
import { createLoanApplication } from "../api/LoanApplicationAPI";
import type { LoanApplicationFormFields } from "../schemas/loanSchema";
import type { LoanProduct } from "../schemas/LoanProductSchema";
import {
    getAgeFromNRIC,
    getGenderFromNRIC,
} from "../utils/general-utils";
import { useRouteHelper } from "../utils/route-helper";

interface UseCreateLoanApplicationProps {
    getValues: UseFormGetValues<LoanApplicationFormFields>;
    productInfo: LoanProduct | null;
    loanPurposes: any[];
    eduLevelList: any[];
    stateList: any[];
    homeOwnershipStatuses: any[];
    employmentStatuses: any[];
    sectorList: any[];
}

const useCreateLoanApplication = ({
    getValues,
    productInfo,
    loanPurposes,
    eduLevelList,
    stateList,
    homeOwnershipStatuses,
    employmentStatuses,
    sectorList,
}: UseCreateLoanApplicationProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {navToBorrowerDashboard} = useRouteHelper();

    const submitLoanApplication = async () => {
        if (!productInfo) {
            throw new Error("Loan product information is unavailable.");
        }

        try {
            setLoading(true);
            setError(null);

            const formFields = getValues();

            const debtInfo = formFields.debtInfo
                .filter(
                    (debt) =>
                        Number(debt.monthlyDebtCommitment) > 0 &&
                        debt.debtTypeID !== ""
                )
                .map((debt) => ({
                    debtTypeID: Number(debt.debtTypeID),
                    monthlyDebtCommitment: Number(debt.monthlyDebtCommitment)
                }));

            const response = await createLoanApplication(
                Number(productInfo.id),
                Number(formFields.loanAmount),
                Number(productInfo.loan_product_interest_rate),
                Number(formFields.loanTenure),
                loanPurposes.find(
                    (item) => item.id === formFields.loanPurposeID
                )?.loan_purpose_name ?? "",
                new Date().toISOString(),

                formFields.nric,
                formFields.firstName,
                formFields.lastName,
                formFields.email,
                formFields.phoneNumber,
                getAgeFromNRIC(formFields.nric),
                getGenderFromNRIC(formFields.nric),

                eduLevelList.find(
                    (item) => item.id === formFields.borrowerEduLevel
                )?.edu_level_name ?? "",

                formFields.borrowerAddr,
                formFields.borrowerAddrPostcode,
                formFields.borrowerCity,

                stateList.find(
                    (item) => item.id === formFields.borrowerState
                )?.state_name ?? "",

                homeOwnershipStatuses.find(
                    (item) => item.id === formFields.homeOwnershipID
                )?.home_ownership_status_name ?? "",

                formFields.employmentOccupation,

                employmentStatuses.find(
                    (item) => item.id === formFields.employmentStatusID
                )?.employment_status_name ?? "",

                Number(formFields.employmentDurationYear),
                Number(formFields.employmentDurationMonth),
                formFields.employerName,

                sectorList.find(
                    (item) => item.id === formFields.employmentSector
                )?.sector_name ?? "",

                formFields.employerContactNo,
                formFields.employmentAddr,
                formFields.employmentAddrPostcode,
                formFields.employmentCity,

                stateList.find(
                    (item) => item.id === formFields.employmentState
                )?.state_name ?? "",

                Number(formFields.monthlyIncome),
                Number(formFields.borrowerBankId),
                formFields.borrowerBankAccNo,
                debtInfo
            );

            if(response.success){                   
                 navToBorrowerDashboard();
            }

            return response;
        } catch (error) {
            console.error(
                "Failed to create loan application:",
                error
            );

            setError("Failed to create loan application.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        submitLoanApplication,
        loading,
        error,
    };
};

export default useCreateLoanApplication;
