import { z } from "zod";

export const BorrowerDetailsSchema = z.object({
    id: z.string(),
    email: z.string(),
    user_id: z.string(),
    employment_status_id: z.string().nullable(),
    employment_status_name: z.string().nullable(),
    borrower_nric: z.string().nullable(),
    borrower_phone_no: z.string().nullable(),
    borrower_f_name: z.string().nullable(),
    borrower_l_name: z.string().nullable(),
    borrower_age: z.string().nullable(),
    borrower_gender: z.string().nullable(),
    borrower_occupation: z.string().nullable(),
});

export const LenderEmployeeDetailsSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    email: z.string(),

    lender_id: z.string(),
    lender_img_url: z.string().nullable(),
    lender_name: z.string().nullable(),

    emp_f_name: z.string().nullable(),
    emp_l_name: z.string().nullable(),
    emp_phone_no: z.string().nullable(),
});

export const LoanReviewerDetailsSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    email: z.string(),

    lender_id: z.string(),
    lender_img_url: z.string(),
    lender_name: z.string(),

    reviewer_f_name: z.string(),
    reviewer_l_name: z.string(),
    reviewer_phone_no: z.string(),
});

export const LoginUserSchema = z.object({
    id: z.string(),
    email: z.string(),
    user_type_id: z.string(),
    user_details: z
        .array(
            z.union([
                BorrowerDetailsSchema,
                LoanReviewerDetailsSchema,
                LenderEmployeeDetailsSchema,
            ])
        )
        .nullable(),
});

export type BorrowerDetails = z.infer<typeof BorrowerDetailsSchema>;
export type LenderEmployeeDetails = z.infer<typeof LenderEmployeeDetailsSchema>; 
export type LoanReviewerDetails = z.infer<typeof LoanReviewerDetailsSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;