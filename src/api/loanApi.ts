import { getLenderId, getUserDetailsId } from "../auth/session";
import { api } from "./client";

export const getLoanApplicationByBorrowerId = async () => {

    const  borrowerId = getUserDetailsId();

    const { data } = await api.get(
      `/loans/borrower/loan-application/${borrowerId}`
    );
  
    return data;
};

export const getLoanApplicationByLenderId = async (filterName:  string) => {

    const { data } = await api.get(
        `/loans/lender/loan-application`,
        {params:{
            'filter_name':filterName,
        }}
    );

    return data;
};

export const getLoanApplicationDetailsByID = async (id: string) => {
    const { data } = await api.get(
        `/loans/loan-application/${id}`
    );

    return data;
};

export const getLoanOfferListByBorrowerId = async () => {

    const  borrowerId = getUserDetailsId();

    const { data } = await api.get(
      `/loans/borrower/loan-offer/${borrowerId}`
    );
  
    return data;
};

export const getLoanOfferListByLenderId = async (filterName:string) => {

    const { data } = await api.get(
        `/loans/lender/loan-offer`,
        {params:{
            'filter_name': filterName,
        }}
    );

    return data;
};

export const getLoanDisbursementListByLenderId = async (statusName:string) => {

    const  lenderId = getLenderId();

    const { data } = await api.get(
        `/loans/lender/loan-disbursement`,
        {params:{
            'lender_id': lenderId,
            'disburse_status_name': statusName,
        }}
    );

    return data;
};

export const getActiveLoanListByBorrowerId = async () => {

    const  borrowerId = getUserDetailsId();

    const { data } = await api.get(
        `/loans/lender/active-loan/${borrowerId}`
    );

    return data;
};

export const getActiveLoanListByLenderId = async (filterName:string) => {

    const { data } = await api.get(
        `/loans/lender/active-loan`,
        {
            params:{
                'filter_name':filterName,
            }
        }
    );

    return data;
};

export const getLoanOfferDetailsById = async (id:string) => {

    const { data } = await api.get(
        `/loans/loan-offer/${id}`
    );

    return data;
};

export const acceptLoanOffer = async (loanId:string) => {

    const { data } = await api.post(
        `/loans/loan-offer/accept`,
        {
            'loan_id':loanId
        }
    );

    return data;
};


export const rejectLoanOffer = async (loanId:string) => {

    const { data } = await api.post(
        `/loans/loan-offer/reject`,
        {params:{
            'loan_id':loanId
        }}
    );

    return data;
};

export const getLoanDetailsById = async (id:string) => {

    const { data } = await api.get(
        `/loans/loan/${id}`
    );

    return data;
};

export const getLoanRepaymentListByLoanId = async (loanId:string, statusName:string) => {

    const { data } = await api.get(
        `/loans/loan-repayments`,
        {params:{
            'loan_id':loanId, 
            'repayment_status_name':statusName
        }}
    );

    return data;
};

export const getLoanListByBorrowerId = async () => {

    const { data } = await api.get(
        `/loans/borrower/loan`
    );

    return data;
};

