import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useWatch, type Control } from "react-hook-form";
import FormDataDisplayField from "../../generic/form/FormDataDisplayField";
import LoanProductInfoCard from "../LoanProductInfoCard";
import { calculateLoanRepayment } from "../../../utils/loan-calculation-helper";
import { getAgeFromNRIC, getGenderFromNRIC } from "../../../utils/general-utils";
import type { LoanProduct } from "../../../schemas/LoanProductSchema";
import type { LoanApplicationFormFields } from "../../../schemas/loanSchema";
import { ddCurrency, ddInterestRate } from "../../../utils/data-format-helper";

interface LoanApplicationSubmitProps {
    control: Control<LoanApplicationFormFields>;
    productInfo: LoanProduct | null;
    loanPurposes: any[];
    eduLevelList: any[];
    stateList: any[];
    homeOwnershipStatuses: any[];
    employmentStatuses: any[];
    sectorList: any[];
    debtTypeList: any[];
    bankList:any[];
}

const LoanApplicationSubmit = ({
    control,
    productInfo,
    loanPurposes,
    eduLevelList,
    stateList,
    homeOwnershipStatuses,
    employmentStatuses,
    sectorList,
    debtTypeList,
    bankList,
}: LoanApplicationSubmitProps) => {
    const formFields = useWatch({
        control,
    });

    const loanPurposeName =
        loanPurposes.find(
            (item) => item.id === formFields.loanPurposeID
        )?.loan_purpose_name
            ?.replace("_", " ") ?? "";

    const borrowerEduLevelName =
        eduLevelList.find(
            (item) => item.id === formFields.borrowerEduLevel
        )?.edu_level_name ?? "";

    const borrowerStateName =
        stateList.find(
            (item) => item.id === formFields.borrowerState
        )?.state_name ?? "";

    const homeOwnershipName =
        homeOwnershipStatuses.find(
            (item) => item.id === formFields.homeOwnershipID
        )?.home_ownership_status_name ?? "";

    const employmentStatusName =
        employmentStatuses.find(
            (item) => item.id === formFields.employmentStatusID
        )?.employment_status_name ?? "";

    const employmentSectorName =
        sectorList.find(
            (item) => item.id === formFields.employmentSector
        )?.sector_name ?? "";

    const monthlyRepayment =
        formFields.loanAmount && formFields.loanTenure && productInfo
            ? calculateLoanRepayment(
                  Number(formFields.loanAmount),
                  Number(productInfo.loan_product_interest_rate),
                  Number(formFields.loanTenure)
              ).monthlyRepayment.toFixed(2)
            : "0.00";
    
    const borrowerBankName = bankList.find( (item) => item.id === formFields.borrowerBankId )?.bank_name ?? "";

    formFields.debtInfo  = formFields.debtInfo.filter((debt) => debt.debtTypeID && debt.monthlyDebtCommitment);

    return (
        <div className="grid grid-cols-1 gap-3">
            <p>
                Please review your application before submitting.
            </p>

            <div className="mt-5 grid grid-cols-5 gap-5">
                <LoanProductInfoCard
                    title="Loan Amount"
                    value={ddCurrency(formFields.loanAmount)}
                />

                <LoanProductInfoCard
                    title="Loan Tenure (Months)"
                    value={`${formFields.loanTenure} months`}
                />

                <LoanProductInfoCard
                    title="Loan Purpose"
                    value={loanPurposeName}
                />

                <LoanProductInfoCard
                    title="Interest Rate"
                    value={ddInterestRate(productInfo.loan_product_interest_rate)}
                />

                <LoanProductInfoCard
                    title="Monthly Repayment"
                    value={ddCurrency(monthlyRepayment)}
                />
            </div>

            <Accordion
                sx={{
                    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.05)",
                }}
                defaultExpanded
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h4>Personal Details</h4>
                </AccordionSummary>

                <AccordionDetails>
                    <div className="my-5 grid grid-cols-1 gap-5">
                        <FormDataDisplayField
                            label="NRIC"
                            value={formFields.nric}
                        />

                        <FormDataDisplayField
                            label="Full Name"
                            value={`${formFields.firstName} ${formFields.lastName}`}
                        />

                        <FormDataDisplayField
                            label="Age"
                            value={getAgeFromNRIC(formFields.nric)}
                        />

                        <FormDataDisplayField
                            label="Gender"
                            value={getGenderFromNRIC(formFields.nric)}
                        />

                        <FormDataDisplayField
                            label="Education Level"
                            value={borrowerEduLevelName}
                        />

                        <FormDataDisplayField
                            label="Email"
                            value={formFields.email}
                        />

                        <FormDataDisplayField
                            label="Phone Number"
                            value={formFields.phoneNumber}
                        />

                        <FormDataDisplayField
                            label="Address"
                            value={formFields.borrowerAddr}
                        />

                        <FormDataDisplayField
                            label="PostCode"
                            value={
                                formFields.borrowerAddrPostcode
                            }
                        />

                        <FormDataDisplayField
                            label="City"
                            value={formFields.borrowerCity}
                        />

                        <FormDataDisplayField
                            label="State"
                            value={borrowerStateName}
                        />

                        <FormDataDisplayField
                            label="Home Ownership"
                            value={homeOwnershipName}
                        />

                        <FormDataDisplayField 
                            label="Bank" 
                            value={borrowerBankName} 
                        /> 
                        <FormDataDisplayField 
                            label="Bank Account Number" 
                            value={formFields.borrowerBankAccNo} 
                        />
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion
                sx={{
                    boxShadow:
                        "0px 3px 3px rgba(0, 0, 0, 0.05)",
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h4>Employment Details</h4>
                </AccordionSummary>

                <AccordionDetails>
                    <div className="grid grid-cols-1 gap-5">
                        <FormDataDisplayField
                            label="Occupation"
                            value={
                                formFields.employmentOccupation
                            }
                        />

                        <FormDataDisplayField
                            label="Employment Status"
                            value={employmentStatusName}
                        />

                        <FormDataDisplayField
                            label="Employer Name"
                            value={formFields.employerName}
                        />

                        <FormDataDisplayField
                            label="Sector"
                            value={employmentSectorName}
                        />

                        <FormDataDisplayField
                            label="Employment Duration"
                            value={`${formFields.employmentDurationYear || 0} years ${
                                formFields.employmentDurationMonth || 0
                            } months`}
                        />

                        <FormDataDisplayField
                            label="Office Address"
                            value={formFields.employmentAddr}
                        />

                        <FormDataDisplayField
                            label="PostCode"
                            value={
                                formFields.employmentAddrPostcode
                            }
                        />

                        <FormDataDisplayField
                            label="City"
                            value={formFields.employmentCity}
                        />

                        <FormDataDisplayField
                            label="State"
                            value={
                                stateList.find(
                                    (item) =>
                                        item.id ===
                                        formFields.employmentState
                                )?.state_name ?? ""
                            }
                        />

                        <FormDataDisplayField
                            label="Office Contact No."
                            value={
                                formFields.employerContactNo
                            }
                        />
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion
                sx={{
                    boxShadow:
                        "0px 3px 3px rgba(0, 0, 0, 0.05)",
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h4>Debt Details</h4>
                </AccordionSummary>

                <AccordionDetails>
                    {formFields.debtInfo.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5">
                            {formFields.debtInfo.map(
                                (debt, index) => {
                                    const debtType = debtTypeList.find(
                                            (item) =>
                                                item.id ===
                                                debt.debtTypeID
                                        );

                                    return (
                                        <div
                                            key={index}
                                            className="p-5"
                                        >
                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                <FormDataDisplayField
                                                    label="Debt Type"
                                                    value={
                                                        debtType?.debt_type_name ??
                                                        "-"
                                                    }
                                                />

                                                <FormDataDisplayField
                                                    label="Monthly Debt Commitment"
                                                    value={ddCurrency(debt.monthlyDebtCommitment)}
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    ) : (
                        <p className="p-5 text-sm text-gray-500">
                            No debt information provided.
                        </p>
                    )}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default LoanApplicationSubmit;
