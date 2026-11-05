import { useNavigate } from "react-router-dom";
import {
  ddCurrencyWithUnit,
  ddInterestRate,
  formatTenureWithMonth
} from "../../utils/data-format-helper";

const LoanProductCard = ({
  id,
  loan_product_name,
  lender_img_url,
  loan_product_desc,
  loan_product_min_amount,
  loan_product_max_amount,
  loan_product_max_tenure_month,
  loan_product_interest_rate,
  lender_name,
  loan_type_name
}) => {

  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/loan-product/${id}`);
  };

  return (
    <div
      onClick={handleViewProduct}
      className="group flex cursor-pointer flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-xl"
    >

      <div className="flex items-center justify-between">

        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          {loan_type_name}
        </span>

        <div className="flex items-center gap-2">
          <img
            src={lender_img_url}
            alt={lender_name}
            className="h-9 w-9 rounded-full border border-gray-200 object-cover"
          />

          <span className="text-sm font-medium text-gray-500">
            {lender_name}
          </span>
        </div>

      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold text-gray-900">
          {loan_product_name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {loan_product_desc}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-5 ">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Loan Amount
          </p>

          <p className="mt-2 text-sm font-bold text-gray-900">
            {ddCurrencyWithUnit(loan_product_min_amount)}
            <span className="font-normal text-gray-400"> - </span>
            {ddCurrencyWithUnit(loan_product_max_amount)}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Interest Rate
          </p>

          <p className="mt-2 text-sm font-bold text-gray-900">
            {ddInterestRate(loan_product_interest_rate)}
            <span className="font-normal"> p.a.</span>
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Maximum Tenure
          </p>

          <p className="mt-2 text-sm font-bold text-gray-900">
            {formatTenureWithMonth(loan_product_max_tenure_month)}
          </p>
        </div>

      </div>

    </div>
  );
};

export default LoanProductCard;