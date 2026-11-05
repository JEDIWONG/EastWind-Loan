import { useState } from 'react';
import {
  ExpandMore,
  CreditScore,
  CalculateRounded,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ServicesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-gray-700 hover:text-black transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        Services
        <ExpandMore
          className={`transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 w-80 pt-3">
          <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-lg">

            <Link
              to="/find-loan/"
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              <CreditScore className="text-gray-700" />

              <div>
                <p className="font-medium text-gray-900">
                  Find Loan
                </p>

                <p className="text-sm text-gray-500">
                  Match the best loan for you
                </p>
              </div>
            </Link>

            <Link
              to="/calculator/"
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100"
            >
              <CalculateRounded className="text-gray-700" />
              <div>
                <p className="font-medium text-gray-900">
                  Calculator
                </p>

                <p className="text-sm text-gray-500">
                  Estimate your monthly repayment
                </p>
              </div>
            </Link>

          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesDropdown;