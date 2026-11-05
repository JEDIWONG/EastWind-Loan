import { Button } from "@mui/material";
import { useState } from "react";
import SectionTitle from "../../../components/generic/typography/SectionTitle";
import { useLoanDisbursementList } from "../../../hooks/useLoanDisbursementList";
import { ddCurrency, ddDateTime } from "../../../utils/data-format-helper";
import type { AppTableTab } from "../../../components/generic/tab/AppDataTableTab";
import type { AppTableColumn } from "../../../components/generic/table/AppDataTable";
import AppDataTableTabs from "../../../components/generic/tab/AppDataTableTab";
import type { LoanDisbursement } from "../../../schemas/loanSchema";
import { useCreateLoanDisbursement } from "../../../hooks/useCreateLoanDisbursement";
import ConfirmationModal from "../../../components/generic/modal/confirmation_modal";
import MaskedBankAccount from "../../../components/generic/MaskedBankAccount";
import LoanStatusChip from "../../../components/loan/chip/LoanStatusChip";

type DisbursementFilter = null | string;

const LoanDisbursementDashboard = () => {

    const [filter, setFilter] = useState<DisbursementFilter>(null);

    const {
        loanDisbursement,
        loading,
        refetch,
    } = useLoanDisbursementList(filter);

    const {
        disburseLoans,
        loading: disburseLoading,
    } = useCreateLoanDisbursement();

    const [selectedRows, setSelectedRows] = useState<LoanDisbursement[]>([]);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const handleDisburse = () => {
        if (selectedRows.length === 0) {
            return;
        }
    
        setConfirmationOpen(true);
    };
    
    const closeConfirmation = () => {
        setConfirmationOpen(false);
    };
    
    const handleConfirm = async () => {
        try {
            const loanIds = selectedRows.map((loan) => loan.id);
    
            await disburseLoans(loanIds);
            await refetch();
    
            setSelectedRows([]);
            setConfirmationOpen(false);
        } catch (error) {
            console.error("Failed to disburse loans:", error);
        }
    };                          

    const tabs: AppTableTab<DisbursementFilter>[] = [
        {
            label: "All",
            value: null,
        },
        {
            label: "Processing",
            value: "Processing",
        },
        {
            label: "Disbursed",
            value: "Success",
        },
        {
            label: "Failed",
            value: "Failed",
        },
    ];

    const baseColumns: AppTableColumn<LoanDisbursement>[] = [
        {
            label: "ID",
            render: (data) => data.id,
            searchable: true,
            searchValue: (data) => String(data.id),
        },
        {
            label: "Bank",
            render: (data) => data.bank_name,
            searchable: true,
            searchValue: (data) => data.bank_name,
        },
        {
            label: "Bank Account",
            render: (data) => <MaskedBankAccount accountNumber={data.borrower_bank_acc_no} /> ,
            searchable: true,
            searchValue: (data) => data.borrower_bank_acc_no,
        },
        {
            label: "Amount",
            render: (data) => ddCurrency(data.loan_approve_amount),
            sortable: true,
            sortValue: (data) =>
                data.loan_approve_amount ?? 0,
        },
    ];

    const scheduledColumn: AppTableColumn<LoanDisbursement> = {
        label: "Scheduled Date",
        render: (data) => ddDateTime(data.loan_disburse_date_schedule) ?? "-",
        sortable: true,
        sortValue: (data) =>
            data.loan_disburse_date_schedule
                ? new Date(
                      data.loan_disburse_date_schedule
                  ).getTime()
                : 0,
    };

    const queueSinceColumn: AppTableColumn<LoanDisbursement> = {
        label: "Queue Since",
        render: (data) => ddDateTime(data.loan_accept_date) ?? "-",
        sortable: true,
        sortValue: (data) =>
            data.loan_accept_date
                ? new Date(
                      data.loan_accept_date
                  ).getTime()
                : 0,
    };

    const statusColumn: AppTableColumn<LoanDisbursement> = {
        label: "Status",
        render: (data) =>
            <LoanStatusChip status={data.disburse_status_name??"Processing"}/>,
        searchable: true,
        searchValue: (data) =>
            data.disburse_status_name ?? "",
    }; 

    const failReasonColumn: AppTableColumn<LoanDisbursement> = {
        label: "Reason",
        render: (data) => "Payment Error...",
    };

    const lastAttemptDateColumn: AppTableColumn<LoanDisbursement> = {
        label: "Last Attempt",
        render: (data) => data.loan_disburse_date_actual,
    };

    const actualDateColumn: AppTableColumn<LoanDisbursement> = {
        label: "Disbursed At",
        render: (data) => ddDateTime(data.loan_disburse_date_actual )?? "-",
        sortable: true,
        sortValue: (data) =>
            data.loan_disburse_date_actual
                ? new Date(
                      data.loan_disburse_date_actual
                  ).getTime()
                : 0,
    };

    const disburseColumn: AppTableColumn<LoanDisbursement> = {
        label: "Action",
        render: () => (
            <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDisburse();
                }}
            >
                Disburse
            </Button>
        ),
    };

    const columns =
        filter === null ?[
            ...baseColumns,
            statusColumn,
        ]:
            filter === "Processing"
                ? [
                    ...baseColumns,
                    scheduledColumn,
                    queueSinceColumn,
                    disburseColumn,
                ]
                : filter === "Success"
                    ? [
                        ...baseColumns,
                        actualDateColumn,
                    ]
                    : filter === "Failed"
                        ? [
                            ...baseColumns,
                            scheduledColumn,
                            lastAttemptDateColumn,
                            failReasonColumn,
                            statusColumn,
                        ]
                        : [
                            ...baseColumns,
                            scheduledColumn,
                            actualDateColumn,
                        ];

    return (
        <>
            <div className="mx-15 my-12 min-h-screen">
                <SectionTitle
                    title="Loan Disbursements"
                    desc="Manage loan disbursements to borrowers"
                />

                {filter === "Processing" && (
                    <div className="mb-4 flex justify-end">
                        <Button
                            variant="contained"
                            disabled={selectedRows.length === 0 || disburseLoading}
                            onClick={handleDisburse}
                        >
                            {disburseLoading
                                ? "Disbursing..."
                                : `Disburse Selected (${selectedRows.length})`}
                        </Button>
                    </div>
                )}

                <AppDataTableTabs
                    tabs={tabs}
                    data={loanDisbursement}
                    columns={columns}
                    loading={loading}
                    onTabChange={setFilter}
                    onRowClick={() => {}}
                    emptyMessage="No loan disbursements found."
                    searchable
                    searchPlaceholder="Search disbursements..."
                    selectable={filter === "Processing"}
                    selectedRows={selectedRows}
                    onSelectionChange={setSelectedRows}
                    getRowId={(data) => data.id}
                />
            </div>
            
            {confirmationOpen && (
                <ConfirmationModal
                    title="Are you sure you want to disburse the selected loans ?"
                    confirmText="Disburse Loans"
                    data={selectedRows.map((loan) => loan.id)}
                    dataLabel="Selected Loan IDs"
                    onConfirm={handleConfirm}
                    onCancel={closeConfirmation}
                />
            )}
            
        </>
    );
};

export default LoanDisbursementDashboard;