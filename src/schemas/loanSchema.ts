import { z } from "zod";

export const LoanApplicationFormSchema = z.object({
    nric: z.string(),
    monthlyIncome: z.number(),

    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),

    borrowerAddr: z.string(),
    borrowerAddrPostcode: z.string(),
    borrowerCity: z.string(),
    borrowerState: z.string(),
    borrowerEduLevel: z.string(),
    homeOwnershipID: z.string(),

    employmentStatusID: z.string(),
    employmentOccupation: z.string(),
    employmentSector: z.string(),
    employerName: z.string(),
    employmentAddr: z.string(),
    employmentAddrPostcode: z.string(),
    employmentCity: z.string(),
    employmentState: z.string(),
    employmentDurationYear: z.number(),
    employmentDurationMonth: z.number(),
    employerContactNo: z.string(),

    loanAmount: z.number(),
    loanTenure: z.number(),
    loanPurposeID: z.string(),

    borrowerBankId: z.string(),
    borrowerBankAccNo: z.string(),

    debtInfo: z.array(
        z.object({
            debtTypeID: z.string(),
            monthlyDebtCommitment: z.string(),
        })
    ),
});

const LoanApplicationSchema = z.object({
    id: z.string(),
    borrower_id: z.number(),

    borrower_f_name: z.string(),
    borrower_l_name: z.string(),
    borrower_email: z.string(),
    borrower_age: z.number(),
    borrower_gender: z.string(),
    borrower_occupation: z.string(),
    borrower_employment_status: z.string(),

    loan_product_id: z.number(),
    loan_product_name: z.string(),
    loan_status_id: z.number(),
    loan_status_name: z.string(),

    lender_id: z.number(),
    lender_name: z.string(),

    loan_type_id: z.number(),
    loan_type_name: z.string(),

    loan_amount: z.number(),
    loan_interest_rate: z.number(),
    loan_tenure_month: z.number(),
    loan_purpose: z.string(),
    loan_application_date: z.string(),

    monthly_income: z.number(),
    monthly_debt_commitment: z.number(),
    employment_duration: z.number(),

    home_ownership_id: z.number(),
    home_ownership_status_name: z.string(),

    application_status_name:z.string(),

    created_at: z.string(),
    updated_at: z.string(),
});

const AILoanApplicationReviewSchema = z.object({
    loan_application_id: z.string(),
    prediction: z.object({
        prediction: z.coerce.number(),
        fully_paid_probability: z.coerce.number(),
        default_probability: z.coerce.number(),
    }),
    recommendation: z.object({
        risk_level: z.string(),
        recommended_amount: z.coerce.number(),
        recommended_tenure: z.coerce.number(),
    }),
});

const ApprovedLoanSchema = z.object({
    id: z.string(),
    loan_application_id: z.string(),
    borrower_id: z.number(),

    lender_name: z.string(),
    loan_product_name: z.string(),
    loan_offer_status: z.string(),

    loan_approve_amount: z.number(),
    loan_approve_interest_rate: z.number(),
    loan_approve_tenure_month: z.number(),
    loan_approve_date: z.string(),

    loan_disburse_amount: z.number().nullable().optional(),
    loan_disburse_date: z.string().nullable().optional(),
    loan_disburse_reference: z.string().nullable().optional(),

    loan_total_repayment: z.number().nullable().optional(),
    loan_monthly_repayment: z.number().nullable().optional(),

    loan_start_date: z.string().nullable().optional(),
    loan_end_date: z.string().nullable().optional(),
});

const LoanOfferDetailsSchema = z.object({
    id: z.string(),
    loan_application_id: z.string(),

    borrower_id: z.number(),
    borrower_nric: z.string(),
    borrower_f_name: z.string(),
    borrower_l_name: z.string(),

    loan_product_name: z.string(),

    lender_name: z.string(),
    lender_reg_no: z.string(),

    loan_status_name: z.string(),
    loan_status_desc: z.string(),

    loan_approve_amount: z.number(),
    loan_approve_interest_rate: z.number(),
    loan_approve_tenure_month: z.number(),
    loan_approve_date: z.string(),

    loan_total_repayment: z.number(),
    loan_monthly_repayment: z.number(),
});

const LoanDisbursementSchema = z.object({
    id: z.string(),
    loan_application_id: z.string(),

    bank_name: z.string(),
    bank_swift_code: z.string(),
    borrower_bank_acc_no: z.string(),

    borrower_id: z.number(),
    
    loan_accept_date: z.string().nullable(),
    loan_approve_amount: z.number().nullable(),

    loan_disburse_amount: z.number().nullable(),
    loan_disburse_date_actual: z.string().nullable(),
    loan_disburse_date_schedule: z.string().nullable(),
    loan_disburse_reference: z.string().nullable(),
    disburse_status_name: z.string().nullable(),

    loan_total_repayment: z.number().nullable(),
    loan_monthly_repayment: z.number().nullable(),

    created_at: z.string(),
    updated_at: z.string(),
});

const ActiveLoanSchema = z.object({
    id: z.string(),
    loan_application_id: z.string(),

    borrower_id: z.number(),
    borrower_f_name: z.string(),
    borrower_l_name: z.string(),

    loan_product_name: z.string(),

    lender_name: z.string(),

    loan_status_id: z.number(),
    loan_status_name: z.string(),

    loan_approve_amount: z.number().nullable(),
    loan_disburse_date_actual: z.string().nullable(),

    next_payment_date: z.string().nullable(),

    loan_total_repayment: z.number().nullable(),
    loan_monthly_repayment: z.number().nullable(),
    current_closing_balance:z.number().nullable(), 

    created_at: z.string(),
    updated_at: z.string(),
});

const LoanRepaymentSchema = z.object({
    id: z.string(),
    installment_no: z.number(),
    repayment_amount: z.number(),
    principal_amount: z.number(),
    interest_amount: z.number(),
    closing_balance : z.number(),
    due_date: z.string(),
    payment_date: z.string().nullable(),
    repayment_status_name: z.string(),
    late_fee: z.number(),
    is_payable: z.number(),
});

const LoanDetailsSchema = z.object({
    id: z.string(),
    borrower_id: z.number(),

    borrower_f_name: z.string(),
    borrower_l_name: z.string(),
    borrower_email: z.string(),
    borrower_contact_no: z.string(),
    borrower_bank_acc_no: z.string(),

    loan_product_name: z.string(),
    lender_name: z.string(),

    loan_status_name: z.string(),

    loan_approve_amount: z.number().nullable(),
    loan_approve_interest_rate: z.number().nullable(),
    loan_approve_tenure_month: z.number().nullable(),
    loan_approve_date: z.string().nullable(),
    loan_accept_date: z.string().nullable(),

    loan_disburse_amount: z.number().nullable(),
    loan_disburse_date_actual: z.string().nullable(),
    loan_mature_date : z.string().nullable(),

    loan_total_repayment: z.number().nullable(),
    loan_monthly_repayment: z.number().nullable(),
    loan_total_paid_amount: z.number().nullable(),
    loan_paid_installment_count: z.number().nullable(),
    loan_outstanding_principal: z.number().nullable(),
    loan_next_payment_date: z.string().nullable(),

    repayments: z.array(LoanRepaymentSchema),
});

export const BorrowerLoanSchema = z.object({
    loan_id: z.string(),
    borrower_id: z.coerce.number(),

    loan_product_name: z.string(),
    lender_name: z.string(),

    application_status_name: z.string(),
    loan_status_name: z.string(),

    loan_requested_amount: z.coerce.number(),
    loan_requested_interest_rate: z.coerce.number(),
    loan_requested_tenure_month: z.coerce.number(),

    loan_approve_amount: z.coerce.number().nullable(),
    loan_approve_interest_rate: z.coerce.number().nullable(),
    loan_approve_tenure_month: z.coerce.number().nullable(),

    loan_application_date: z.string(),
    loan_approve_date: z.string().nullable(),
    loan_accept_date: z.string().nullable(),

    loan_disburse_amount: z.coerce.number().nullable(),
    loan_disburse_date_schedule: z.string().nullable(),
    loan_disburse_date_actual: z.string().nullable(),

    loan_total_repayment: z.coerce.number().nullable(),
    loan_monthly_repayment: z.coerce.number().nullable(),

    loan_outstanding_balance: z.coerce.number(),

    loan_next_payment: z.coerce.number().nullable(),
    loan_next_payment_date: z.string().nullable(),

    loan_paid_installment_count: z.coerce.number(),
    loan_total_installment_count: z.coerce.number(),
});

export type LoanApplication = z.infer<typeof LoanApplicationSchema>;
export type AILoanApplicationReview = z.infer<typeof AILoanApplicationReviewSchema>;
export type ApprovedLoan = z.infer<typeof ApprovedLoanSchema>;
export type LoanOfferDetails = z.infer<typeof LoanOfferDetailsSchema>;
export type LoanDisbursement = z.infer<typeof LoanDisbursementSchema>;
export type ActiveLoan = z.infer<typeof ActiveLoanSchema>;
export type LoanDetails = z.infer<typeof LoanDetailsSchema>;
export type LoanRepayment = z.infer<typeof LoanRepaymentSchema>;
export type BorrowerLoan = z.infer<typeof BorrowerLoanSchema>;
export type LoanApplicationFormFields = z.infer<typeof LoanApplicationFormSchema>;
