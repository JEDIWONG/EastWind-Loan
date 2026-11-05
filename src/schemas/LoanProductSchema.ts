import { z } from "zod";

export const LoanProductSchema = z.object({
    id: z.string(),
    lender_id: z.coerce.number(),
    lender_img_url: z.string(),
    loan_product_id: z.string(),
    loan_product_name: z.string(),
    loan_product_desc: z.string(),
    loan_product_min_amount: z.coerce.number(),
    loan_product_max_amount: z.coerce.number(),
    loan_product_min_tenure_month: z.coerce.number(),
    loan_product_max_tenure_month: z.coerce.number(),
    loan_product_interest_rate: z.coerce.number(),
    lender_name: z.string(),
    loan_type_name: z.string(),
    loan_product_requirements: z.string(),
    loan_product_is_active: z.coerce.number(),
});

export type LoanProduct = z.infer<typeof LoanProductSchema>;