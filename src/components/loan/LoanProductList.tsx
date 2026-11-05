import LoanProductCard from "./LoanProductCard";
import useLoanProductList from "../../hooks/useLoanProductList";

interface LoanProductListProps {
    amount?: number;
    tenure_month?: number;
    loan_type_id?: number;
    max_interest_rate?: number | null;
    lender_id?: number | null;
    monthly_salary?: number | null;
}

const LoanProductList = ({
    amount,
    tenure_month,
    loan_type_id,
    max_interest_rate,
    lender_id,
    monthly_salary,
}: LoanProductListProps) => {
    const { loanProducts, loading, error } = useLoanProductList({
      amount,
      tenure_month,
      loan_type_id,
      max_interest_rate,
      lender_id,
      monthly_salary,
    });

    return (
        <div className="mx-10 mt-20">
            <div className="flex items-center justify-between">
                <p className="mt-1 text-sm text-gray-500">
                    {loading
                        ? "Finding suitable loan products..."
                        : `${loanProducts.length} loan product(s) available`}
                </p>
            </div>

            {loading ? (
                <div className="py-10 text-center text-sm text-gray-500">
                    Finding loan products...
                </div>
            ) : error ? (
                <div className="py-10 text-center text-sm text-red-500">
                    {error}
                </div>
            ) : loanProducts.length === 0 ? (
                <div className="py-10 text-center text-sm text-gray-500">
                    No suitable loan products found.
                </div>
            ) : (
                <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {loanProducts.map((product) => (
                        <LoanProductCard
                            key={product.id}
                            {...product}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LoanProductList;