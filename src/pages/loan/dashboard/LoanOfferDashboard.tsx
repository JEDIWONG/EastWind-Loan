import { useState } from "react";
import SectionTitle from "../../../components/generic/typography/SectionTitle";
import { useRouteHelper } from "../../../utils/route-helper";
import { ddCurrency, ddInterestRate } from "../../../utils/data-format-helper";
import type { AppTableTab } from "../../../components/generic/tab/AppDataTableTab";
import type { AppTableColumn } from "../../../components/generic/table/AppDataTable";
import AppDataTableTabs from "../../../components/generic/tab/AppDataTableTab";
import { useLoanOfferList } from "../../../hooks/useLoanOfferList";
import type { ApprovedLoan } from "../../../schemas/loanSchema";
import LoanStatusChip from "../../../components/loan/chip/LoanStatusChip";

type ApplicationFilter = null | string;

const LoanOfferDashboard = () => {

    const { navToLoanOfferDetails } = useRouteHelper();

    const [filter, setFilter] = useState<ApplicationFilter>(null);

    const {
        loanOffers,
        loading,
    } = useLoanOfferList(filter);

    const tabs: AppTableTab<ApplicationFilter>[] = [
        {
            label: "All",
            value: null
        },
        {
            label: "Pending",
            value: "Offered"
        },
        {
            label: "Accepted",
            value: "Accepted"
        },
        {
            label: "Rejected",
            value: "Rejected"
        },
    ];

    const allColumns: AppTableColumn<ApprovedLoan>[] = [
        {
            label: "ID",
            render: (data) => data.id,
            searchable: true,
            searchValue: (data) => String(data.id),
        },
        {
            label: "Product Name",
            render: (data) => data.loan_product_name,
            searchable: true,
            searchValue: (data) => data.loan_product_name,
        },
        {
            label: "Approved Amount",
            render: (data) => ddCurrency(data.loan_approve_amount),
            sortable: true,
            sortValue: (data) => data.loan_approve_amount ?? 0,
        },
        {
            label: "Tenure",
            render: (data) =>
                `${data.loan_approve_tenure_month} months`,
            sortable: true,
            sortValue: (data) =>
                data.loan_approve_tenure_month ?? 0,
        },
        {
            label: "Interest Rate",
            render: (data) =>
                ddInterestRate(data.loan_approve_interest_rate),
            sortable: true,
            sortValue: (data) =>
                data.loan_approve_interest_rate ?? 0,
        },
        {
            label: "Status",
            render: (data) => <LoanStatusChip status={data.loan_offer_status}/>,
            searchable: true,
            searchValue: (data) => data.loan_offer_status,
        },
        {
            label: "Offer Date",
            render: (data) =>
                data.loan_approve_date
                    ? new Date(data.loan_approve_date).toLocaleDateString()
                    : "-",
            sortable: true,
            sortValue: (data) =>
                data.loan_approve_date
                    ? new Date(data.loan_approve_date).getTime()
                    : 0,
        },
    ];

    const columns = filter === null
        ? allColumns
        : allColumns.filter(
              (column) => column.label !== "Status"
          );

    return (
        <>
            <div className="mx-15 my-12 min-h-screen">
                <SectionTitle
                    title="Loan Offers"
                    desc="Manage loan offers received from lenders"
                />

                <AppDataTableTabs
                    tabs={tabs}
                    data={loanOffers}
                    columns={columns}
                    loading={loading}
                    onTabChange={setFilter}
                    onRowClick={(loan) =>
                        navToLoanOfferDetails(String(loan.id))
                    }
                    emptyMessage="No loan offers found."
                    searchable
                    searchPlaceholder="Search loan offers..."
                />
            </div>
        </>
    );
};

export default LoanOfferDashboard;