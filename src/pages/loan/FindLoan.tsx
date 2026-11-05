import FindLoanHeader from "../../components/loan/FindLoanHeader";
import LoanProductList from "../../components/loan/LoanProductList";
import { useState } from "react";

export interface LoanMatchParams { 
  amount?: number; 
  tenure_month?: number; 
  loan_type_id?: number; 
  max_interest_rate?: number | null; 
  lender_id?: number | null; 
}

const FindLoan = () => {
  
  const [matchParams, setMatchParams] = useState<LoanMatchParams | null>(null);
  const handleMatch = (params: LoanMatchParams) => { setMatchParams(params); };

  return (
    <div className="min-h-screen">
      <FindLoanHeader onMatch = {handleMatch} />

      <LoanProductList {...matchParams}/>

    </div>
  );
};

export default FindLoan;