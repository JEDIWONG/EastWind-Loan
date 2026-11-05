import { useState } from "react";
import SectionTitle from "../../../components/generic/typography/SectionTitle";
import { useLoanApplications } from "../../../hooks/useLoanApplicationList";
import { useRouteHelper } from "../../../utils/route-helper";
import { ddCurrency, ddDateTime, ddInterestRate, ddTenureMonths } from "../../../utils/data-format-helper";
import type { AppTableTab } from "../../../components/generic/tab/AppDataTableTab";
import type { AppTableColumn } from "../../../components/generic/table/AppDataTable";
import AppDataTableTabs from "../../../components/generic/tab/AppDataTableTab";
import type { LoanApplication } from "../../../schemas/loanSchema";
import LoanStatusChip from "../../../components/loan/chip/LoanStatusChip";

type ApplicationFilter = null | string;

const LoanApplicationDashboard = () => {

    const { navToLoanApplicationDetails } = useRouteHelper();

    const [filter, setFilter] = useState<ApplicationFilter>(null);

    const {
        loanApplications,
        loading,
    } = useLoanApplications(filter);

    const tabs: AppTableTab<ApplicationFilter>[] = [
        {
            label: "All",
            value: null,
        },
        {
            label: "Pending",
            value: 'Pending',
        },
        {
            label: "Approved",
            value: 'Accepted',
        },
        {
            label: "Rejected",
            value: 'Rejected',
        },
    ];

    const allColumns: AppTableColumn<LoanApplication>[] = [
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
            label: "Amount",
            render: (data) => ddCurrency(data.loan_amount),
            sortable: true,
            sortValue: (data) => data.loan_amount,
        },
        {
            label: "Tenure",
            render: (data) => ddTenureMonths(data.loan_tenure_month),
            sortable: true,
            sortValue: (data) => data.loan_tenure_month,
        },
        {
            label: "Interest Rate",
            render: (data) => ddInterestRate(data.loan_interest_rate),
            sortable: true,
            sortValue: (data) => data.loan_interest_rate,
        },
        {
            label: "Approval Status",
            render: (data) => <LoanStatusChip status={data.application_status_name}/> ,
            searchable: true,
            searchValue: (data) => data.application_status_name,
        },
        {
            label: "Submitted At",
            render: (data) => ddDateTime(data.loan_application_date), 
            sortable: true,
            sortValue: (data) =>
                new Date(data.loan_application_date).getTime(),
        },
    ];
    
    const columns = filter === null
        ? allColumns
        : allColumns.filter(
                (column) => column.label !== "Approval Status"
            );

    return (
        <>
            <div className="mx-15 my-12 min-h-screen">
                <SectionTitle
                    title="Loan Applications"
                    desc="Manage list of Loan Applications submitted by borrowers"
                />

                <AppDataTableTabs
                    tabs={tabs}
                    data={loanApplications}
                    columns={columns}
                    loading={loading}
                    onTabChange={setFilter}
                    onRowClick={(loan) =>
                        navToLoanApplicationDetails(String(loan.id))
                    }
                    emptyMessage="No loan applications found."
                    searchable
                    searchPlaceholder="Search applications..."
                />
            </div>

            
        </>
    );
};

export default LoanApplicationDashboard;