import { getUserDetailsId } from "../auth/session";
import { api } from "./client";

export const createLoanApplication = async (
    loanProductId: number,
    loanAmount: number,
    loanInterestRate: number,
    loanTenureMonth: number,
    loanPurpose: string,
    loanApplicationDate: string,
    borrowerNric: string,
    borrowerFName: string,
    borrowerLName: string,
    borrowerEmail: string,
    borrowerContactNo: string,
    borrowerAge: number,
    borrowerGender: string,
    borrowerEduStatus: string,
    borrowerAddrLines: string,
    borrowerPostcode: string,
    borrowerCity: string,
    borrowerState: string,
    homeOwnershipStatus: string,
    borrowerOccupation: string,
    borrowerEmploymentStatus: string,
    borrowerEmploymentDurationYear: number,
    borrowerEmploymentDurationMonth: number,
    borrowerEmployerName: string,
    borrowerEmployerSector: string,
    borrowerEmployerContactNo: string,
    borrowerEmploymentAddrLines: string,
    borrowerEmploymentPostcode: string,
    borrowerEmploymentCity: string,
    borrowerEmploymentState: string,
    monthlyIncome: number,
    borrowerBankId: number,
    borrowerBankAccNo: string,
    debtInfo: {
        debtTypeID: number;
        monthlyDebtCommitment: number;
    }[]
) => {
    const { data } = await api.post(
        "/loans/application/create",
        {
            borrower_id: getUserDetailsId(),
            loan_product_id: loanProductId,
            loan_amount: loanAmount,
            loan_interest_rate: loanInterestRate,
            loan_tenure_month: loanTenureMonth,
            loan_purpose: loanPurpose,
            loan_application_date: loanApplicationDate,

            borrower_nric: borrowerNric,
            borrower_f_name: borrowerFName,
            borrower_l_name: borrowerLName,
            borrower_email: borrowerEmail,
            borrower_contact_no: borrowerContactNo,
            borrower_age: borrowerAge,
            borrower_gender: borrowerGender,
            borrower_edu_status: borrowerEduStatus,

            borrower_addr_lines: borrowerAddrLines,
            borrower_postcode: borrowerPostcode,
            borrower_city: borrowerCity,
            borrower_state: borrowerState,
            home_ownership_status: homeOwnershipStatus,

            borrower_occupation: borrowerOccupation,
            borrower_employment_status: borrowerEmploymentStatus,
            borrower_employment_duration_year: borrowerEmploymentDurationYear,
            borrower_employment_duration_month: borrowerEmploymentDurationMonth,
            borrower_employer_name: borrowerEmployerName,
            borrower_employer_sector: borrowerEmployerSector,
            borrower_employer_contact_no: borrowerEmployerContactNo,

            borrower_employment_addr_lines: borrowerEmploymentAddrLines,
            borrower_employment_postcode: borrowerEmploymentPostcode,
            borrower_employment_city: borrowerEmploymentCity,
            borrower_employment_state: borrowerEmploymentState,

            monthly_income: monthlyIncome,

            borrower_bank_id: borrowerBankId,
            borrower_bank_acc_no: borrowerBankAccNo,

            debt_info: debtInfo,
        }
    );

    return data;
};

export const approveLoanApplication = async (
    loanId: string,
    loanApproveAmount: number,
    loanApproveInterestRate: number,
    loanApproveTenureMonth: number,
    loanTotalRepayment: number,
    loanMonthlyRepayment: number
) => {

    const { data } = await api.post(
        "/loans/application/approve",
        {
            loan_id: loanId,
            loan_approve_amount: loanApproveAmount,
            loan_approve_interest_rate: loanApproveInterestRate,
            loan_approve_tenure_month: loanApproveTenureMonth,
            loan_total_repayment: loanTotalRepayment,
            loan_monthly_repayment: loanMonthlyRepayment,
        }
    );

    return data;
};

export const predictLoanRisk = async (loanId: string) => {
    const { data } = await api.get(
        `/loans/application/predict/${loanId}`
    );

    return data;
};

export const generateLoanApplicationAISummary = async (
    applicantData: string[],
    loanRequestData: string[],
    riskPredictionData: string[]
) => {
    const { data } = await api.post(
        "/loans/application/AIsummarise",
        {
            applicantData,
            loanRequestData,
            riskPredictionData,
        }
    );

    return data;
};