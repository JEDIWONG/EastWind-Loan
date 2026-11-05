import { api } from "./client";

export async function createLoanRepaymentPayment(loanRepaymentId: string, paymentMethodId: number) {
    const { data } = await api.post("/loans/loan-repayments/pay", {
        'loan_repayment_id': loanRepaymentId,
        'payment_method_id': paymentMethodId
    });

    return data;
}

export async function getPaymentMethods() {
    const { data } = await api.get("/payment-methods");

    return data;
}