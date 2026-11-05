import { api } from "./client";

export async function createLoanDisbursement(loanIds: string[]) {
    const { data } = await api.post("/loans/disburse", {
        loanIds,
    });

    return data;
}