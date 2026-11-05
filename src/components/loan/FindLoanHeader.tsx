import { useEffect, useState } from "react";
import AppDropDown from "../generic/form/AppDropDown";
import AppNumberField from "../generic/form/AppNumberField";
import type { LoanMatchParams } from "../../pages/loan/FindLoan";
import bgImg from "../../assets/find_loan_1.png"; 
import { getLoanTypes } from "../../api/LoanProductApi";

interface LoanType {
  id: number;
  loan_type_name: string;
  loan_type_desc: string;
}

interface FindLoanHeaderProps {
  onMatch: (params: LoanMatchParams) => void;
}

const FindLoanHeader = ({onMatch}:FindLoanHeaderProps) => {
  const [monthlySalary, setMonthlySalary] = useState(3000);
  const [loanAmount, setLoanAmount] = useState(1000);
  const [loanType, setLoanType] = useState(1);
  const [loanTenureMonth, setloanTenureMonth] = useState(12);
  const [maxInterestRate, setMaxInterestRate] = useState(3);
  const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);

  useEffect(() => {
    const fetchLoanTypes = async () => {
      try {
        const response = await getLoanTypes();

        if (response.success) {
          setLoanTypes(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch loan types:", error);
      }
    };

    fetchLoanTypes();
  }, []);

  const handleMatch = () => { 
    const params: LoanMatchParams = { 
      amount: loanAmount, 
      tenure_month: loanTenureMonth, 
      loan_type_id: loanType ? Number(loanType) : undefined, 
      max_interest_rate: maxInterestRate, 
    }; 
    
   onMatch(params); 
  };

  return (
    <div
      className="relative min-h-[300px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 bg-black/30"/>

      <div className="relative mx-10 pt-10">
        <h1 className="font-bold text-white">
          Find Suitable Loan in Just a Few Steps
        </h1>

        <p className="mt-3 max-w-2xl text-yellow-400">
          What are you looking for? Fill in the details and we will match
          you with the best loan options available.
        </p>
      </div>

      <div className="flex gap-5 absolute top-[85%] items-center px-10">
        <div className="flex gap-5 rounded-2xl border border-gray-200 bg-white px-8 py-5 shadow-lg">

          <div className="flex-1">
            <AppDropDown
              label="Loan Type"
              options={loanTypes.map((type) => ({
                value: type.id,
                label: type.loan_type_name,
              }))}
              placeholder="Select loan type"
              value={loanType}
              onChange={(event) =>
                setLoanType(Number(event.target.value))
              }
            />
          </div>
          
          <div className="flex-1">
            <AppNumberField
              label="My Monthly Salary"
              step={1000}
              placeholder="Monthly salary in RM"
              value={monthlySalary}
              onChange={(event) =>
                setMonthlySalary(Number(event.target.value))
              }
              prefix="RM"
            />
          </div>

          <div className="flex-1">
            <AppNumberField
              label="I Would Like to Borrow"
              min={1000}
              step={1000}
              value={loanAmount}
              onChange={(event) =>
                setLoanAmount(Number(event.target.value))
              }
              prefix="RM"
            />
          </div>

          <div className="flex-1">
            <AppNumberField
              label="Over"
              step={1}
              value={loanTenureMonth}
              placeholder="Tenure in months"
              onChange={(event) =>
                setloanTenureMonth(Number(event.target.value))
              }
              suffix="Months"
            />
          </div>

          <div className="flex-1">
            <AppNumberField
              label="Max Interest Rate"
              step={0.01}
              placeholder="Maximum interest rate"
              value={maxInterestRate}
              onChange={(event) =>
                setMaxInterestRate(Number(event.target.value))
              }
              suffix="%"
            />
          </div>
        </div>

        <button
          type="button"
          className="whitespace-nowrap rounded-lg bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-600"
          onClick={handleMatch}
        >
          Match
        </button>
      </div>
    </div>
  );
};

export default FindLoanHeader;