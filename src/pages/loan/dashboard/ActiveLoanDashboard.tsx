import { useState } from "react";
import SectionTitle from "../../../components/generic/typography/SectionTitle";
import { useActiveLoanList } from "../../../hooks/useActiveLoanList";
import { useRouteHelper } from "../../../utils/route-helper";
import { ddCurrency, ddDate } from "../../../utils/data-format-helper";
import type { AppTableTab } from "../../../components/generic/tab/AppDataTableTab";
import type { AppTableColumn } from "../../../components/generic/table/AppDataTable";
import AppDataTableTabs from "../../../components/generic/tab/AppDataTableTab";
import type { ActiveLoan } from "../../../schemas/loanSchema";
import LoanStatusChip from "../../../components/loan/chip/LoanStatusChip";

type ActiveLoanFilter = null | string;

const ActiveLoanDashboard = () => {

    const { navToLoanDetails } = useRouteHelper();

    const [filter, setFilter] = useState<ActiveLoanFilter>(null);

    const {
        activeLoanList,
        loading,
    } = useActiveLoanList(filter);

    const tabs: AppTableTab<ActiveLoanFilter>[] = [
        {
            label: "All",
            value: null,
        },
        {
            label: "In Service",
            value: "Active",
        },
        {
            label: "Completed",
            value: "Completed",
        },
        {
            label: "Defaulted",
            value: "Defaulted",
        },
    ];

    const allColumns: AppTableColumn<ActiveLoan>[] = [
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
            label: "Total Repayment",
            render: (data) =>
                ddCurrency(data.loan_total_repayment),
            sortable: true,
            sortValue: (data) =>
                data.loan_total_repayment ?? 0,
        },
        {
            label: "Monthly Repayment",
            render: (data) =>
                ddCurrency(data.loan_monthly_repayment),
            sortable: true,
            sortValue: (data) =>
                data.loan_monthly_repayment ?? 0,
        },
        {
            label: "Outstanding Balance",
            render: (data) =>
                ddCurrency(data.current_closing_balance),
            sortable: true,
            sortValue: (data) =>
                data.loan_monthly_repayment ?? 0,
        },
        {
            label: "Next Payment",
            render: (data) => ddDate(data.next_payment_date)?? "-",
            sortable: true,
            sortValue: (data) =>
                data.next_payment_date
                    ? new Date(data.next_payment_date).getTime()
                    : 0,
        },
        {
            label: "Status",
            render: (data) => <LoanStatusChip status={data.loan_status_name}/>,
            searchable: true,
            searchValue: (data) => data.loan_status_name,
        },
    ];

    const columns = filter === null
        ? allColumns
        : allColumns.filter(
              (column) => column.label !== "Status"
          );

    return (
        <>
            <div className="mx-20 my-12 min-h-screen">
                <SectionTitle
                    title="Active Loans"
                    desc="Manage active loans and repayment information"
                />

                <AppDataTableTabs
                    tabs={tabs}
                    data={activeLoanList}
                    columns={columns}
                    loading={loading}
                    onTabChange={setFilter}
                    onRowClick={(loan) => {navToLoanDetails(String(loan.id))}}
                    emptyMessage="No active loans found."
                    searchable
                    searchPlaceholder="Search loans..."
                />
            </div>
        </>
    );
};

export default ActiveLoanDashboard;