import { api } from "./client";

export const getLoanTypes = async () => {
    const { data } = await api.get("/loans/type");
    return data;
};

export const getLoanProductById = async (
    loanProductId: number
) => {
    const { data } = await api.get(
        `/loans/product/${loanProductId}`
    );

    return data;
};

export const matchLoanProducts = async (
    amount?: number,
    tenureMonth?: number,
    loanTypeId?: number,
    maxInterestRate?: number,
    lenderId?: number,
    monthlySalary?: number
) => {
    const { data } = await api.get("/loans/match-products", {
        params: {
            amount,
            tenure_month: tenureMonth,
            loan_type_id: loanTypeId,
            max_interest_rate: maxInterestRate,
            lender_id: lenderId,
            monthly_salary: monthlySalary,
        },
    });

    return data;
};

export async function createLoanProduct(
    loan_product_name: string,
    loan_product_min_amount: number,
    loan_product_max_amount: number,
    loan_product_min_tenure_month: number,
    loan_product_max_tenure_month: number,
    loan_product_interest_rate: number,
    loan_product_desc?: string | null
) {
    const { data } = await api.post(
        '/lender/product/create',
        {
            loan_product_name,
            loan_product_desc,
            loan_product_min_amount,
            loan_product_max_amount,
            loan_product_min_tenure_month,
            loan_product_max_tenure_month,
            loan_product_interest_rate,
        }
    );

    return data;
}

export async function updateLoanProduct(
    loan_product_id: number,
    loan_product_name: string,
    loan_product_min_amount: number,
    loan_product_max_amount: number,
    loan_product_min_tenure_month: number,
    loan_product_max_tenure_month: number,
    loan_product_interest_rate: number,
    loan_product_desc?: string | null
) {
    const { data } = await api.put(
        `/lender/product/edit`,
        {
            loan_product_id, 
            loan_product_name,
            loan_product_desc,
            loan_product_min_amount,
            loan_product_max_amount,
            loan_product_min_tenure_month,
            loan_product_max_tenure_month,
            loan_product_interest_rate,
        }
    );

    return data;
}

export async function viewLoanProductsByLenderID() {
    const { data } = await api.get('/lender/product');

    return data;
}