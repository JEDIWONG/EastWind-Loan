import LoanApplicationStep from "../../components/loan/LoanApplicationStep";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../components/generic/loading/LoadingOverlay";
import LoanApplicationSubmit from "../../components/loan/application/LoanApplicationSubmit";
import LoanApplicationEmploymentForm from "../../components/loan/application/LoanApplicationEmploymentForm";
import LoanApplicationLoanRequirementForm from "../../components/loan/application/LoanApplicationLoanRequirementForm";
import LoanApplicationPersonalForm from "../../components/loan/application/LoanApplicationPersonalForm";
import LoanApplicationStartForm from "../../components/loan/application/LoanApplicationStartForm";
import { getAgeFromNRIC, getGenderFromNRIC } from "../../utils/general-utils";
import LoanApplicationDebtInfo from "../../components/loan/application/LoanApplicationDebtInfo";
import useLoanApplicationForm from "../../hooks/useLoanApplicationForm";
import useCreateLoanApplication from "../../hooks/useCreateLoanApplication";

const LoanApplication = () => {

    const {loanProductId} = useParams(); 

    const {
        control,
        watch,
        getValues,
        trigger,
        errors,
    
        productInfo,
        loanPurposes,
        homeOwnershipStatuses,
        employmentStatuses,
        sectorList,
        stateList,
        eduLevelList,
        debtTypeList,
        bankList,
    
        loading:formLoading,
    } = useLoanApplicationForm(
        Number(loanProductId)   
    );

    const {
        submitLoanApplication,
    } = useCreateLoanApplication({
        getValues,
        productInfo,
        loanPurposes,
        eduLevelList,
        stateList,
        homeOwnershipStatuses,
        employmentStatuses,
        sectorList,
    });

    const LoanApplicationStepData = [
        {
            label: "Lets Get Started",
            fields: [
                "nric",
                "monthlyIncome",
            ], 
            content: (
                <LoanApplicationStartForm
                    control={control}
                    errors={errors}
                />
            ),
        },
        {
            label: "What do you need?",
            fields: [
                "loanAmount",
                "loanTenure",
                "loanPurposeID",
            ],
            content: (
                <LoanApplicationLoanRequirementForm
                    control={control}
                    errors={errors}
                    productInfo={productInfo}
                    loanPurposes={loanPurposes}
                />
            ),
        },
        {
            label: "Personal Details",
            fields: [
                "firstName",
                "lastName",
                "borrowerEduLevel",
                "email",
                "phoneNumber",
                "borrowerAddr",
                "borrowerAddrPostcode",
                "borrowerCity",
                "borrowerState",
                "homeOwnershipID",
                "borrowerBankId", 
                "borrowerBankAccNo",
            ],
            content: (
                <>
                    <LoanApplicationPersonalForm
                        control={control}
                        errors={errors}
                        age={getAgeFromNRIC(watch("nric"))}
                        gender={getGenderFromNRIC(watch("nric"))}
                        eduLevelList={eduLevelList}
                        stateList={stateList}
                        homeOwnershipStatuses={homeOwnershipStatuses}
                        bankList={bankList}
                    />
                
                </>
            ),
        },
        {
            label: "Employment Details",
            fields: [
                "employmentOccupation",
                "employmentStatusID",
                "employerName",
                "employmentSector",
                "employmentDurationYear",
                "employmentDurationMonth",
                "employmentAddr",
                "employmentAddrPostcode",
                "employmentCity",
                "employmentState",
                "employerContactNo",
            ],
            content: (
                <LoanApplicationEmploymentForm
                    control={control}
                    errors={errors}
                    employmentStatuses={employmentStatuses}
                    sectorList={sectorList}
                    stateList={stateList}
                />
            ),
        },
        {
            label: "Debt Information (If Any)",
            content: (
                <LoanApplicationDebtInfo
                    control={control}
                    errors={errors}
                    debtTypeList={debtTypeList}
                />
            ),
        },
        {
            label: "Review & Submit",
            content: (
                <LoanApplicationSubmit
                    control={control}
                    productInfo={productInfo}
                    loanPurposes={loanPurposes}
                    eduLevelList={eduLevelList}
                    stateList={stateList}
                    homeOwnershipStatuses={homeOwnershipStatuses}
                    employmentStatuses={employmentStatuses}
                    sectorList={sectorList}
                    debtTypeList={debtTypeList}
                    bankList={bankList}
                />
            ),
        },
    ];

    return (
        <>  

            <div className="mx-20 my-20 flex-cols min-h-screen">

                <div className="my-10">
                    <h1>
                        Apply Loan In Just a Few Steps
                    </h1>

                    <p className="text-gray-600">
                        Please complete the details below
                    </p>
                </div>
                
                {formLoading ? (
                        <LoadingOverlay />
                    ) : (
                        <LoanApplicationStep
                            steps={LoanApplicationStepData}
                            trigger={trigger}
                            onSubmit={submitLoanApplication}
                        />
                    )
                }
                
            </div>
        </>
    );
};

export default LoanApplication;
