import { Button, Typography } from "@mui/material";
import { PaymentRounded } from "@mui/icons-material";
import { useState } from "react";
import SectionTitle from "../../generic/typography/SectionTitle";
import AppDataTableTabs from "../../../components/generic/tab/AppDataTableTab";
import type { AppTableTab } from "../../../components/generic/tab/AppDataTableTab";
import type { AppTableColumn } from "../../../components/generic/table/AppDataTable";
import { ddCurrency, ddDate } from "../../../utils/data-format-helper";
import type { LoanRepayment } from "../../../schemas/loanSchema";
import { useLoanRepaymentList } from "../../../hooks/useLoanRepaymentList";
import useCreateLoanRepaymentPayment from "../../../hooks/useCreateLoanRepaymentPayment";
import PaymentConfirmationModal from "./PaymentConfirmationModal";
import LoanStatusChip from "../chip/LoanStatusChip";
import { getUserTypeId } from "../../../auth/session";


type RepaymentFilter = null | string;

const LoanDetailsPaymentScheduleSection = ({
    loanData,
}) => {
    const [filter, setFilter] = useState<RepaymentFilter>(null);
    const [selectedRepayment, setSelectedRepayment] = useState<LoanRepayment | null>(null);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);

    const {
        loanRepaymentList,
        loading,
        refetch,
    } = useLoanRepaymentList(
        loanData.id,
        filter
    );

    const {
        createPayment,
        loading: paymentLoading,
    } = useCreateLoanRepaymentPayment();

    const tabs: AppTableTab<RepaymentFilter>[] = [
        {
            label: "All",
            value: null,
        },
        {
            label: "Pending",
            value: "Pending",
        },
        {
            label: "Paid",
            value: "Paid",
        },
        {
            label: "Overdue",
            value: "Overdue",
        },
    ];

    const handlePay = (repayment: LoanRepayment) => {
        setSelectedRepayment(repayment);
        setPaymentModalOpen(true);
    };

    const handleConfirmPayment = async (paymentMethodId: number) => {
        if (!selectedRepayment) return;

        try {
            await createPayment(
                selectedRepayment.id,
                paymentMethodId
            );

            await refetch();

            setPaymentModalOpen(false);
            setSelectedRepayment(null);
        } catch (error) {
            console.error(
                "Failed to create loan repayment payment:",
                error
            );
        }
    };

    const handleCancelPayment = () => {
        if (paymentLoading) return;

        setPaymentModalOpen(false);
        setSelectedRepayment(null);
    };

    const columns: AppTableColumn<LoanRepayment>[] = [
        {
            label: "Installment",
            render: (data) => (
                <Typography>
                    #{data.installment_no}
                </Typography>
            ),
            sortable: true,
            sortValue: (data) => data.installment_no,
        },
        {
            label: "Due Date",
            render: (data) => ddDate(data.due_date),
            sortable: true,
            sortValue: (data) =>
                new Date(data.due_date).getTime(),
        },
        {
            label: "Repayment",
            render: (data) =>
                ddCurrency(data.repayment_amount),
            sortable: true,
            sortValue: (data) =>
                data.repayment_amount,
        },
        {
            label: "Principal",
            render: (data) =>
                ddCurrency(data.principal_amount),
            sortable: true,
            sortValue: (data) =>
                data.principal_amount,
        },
        {
            label: "Interest",
            render: (data) =>
                ddCurrency(data.interest_amount),
            sortable: true,
            sortValue: (data) =>
                data.interest_amount,
        },
        {
            label: "Closing Balance",
            render: (data) =>
                ddCurrency(data.closing_balance),
            sortable: true,
            sortValue: (data) =>
                data.closing_balance,
        },
        {
            label: "Status",
            render: (data) =>
                <LoanStatusChip status={data.repayment_status_name} />,
            searchable: true,
            searchValue: (data) =>
                data.repayment_status_name,
        },
        {
            label: "Payment Date",
            render: (data) =>
                data.payment_date ?? "-",
            sortable: true,
            sortValue: (data) =>
                data.payment_date
                    ? new Date(data.payment_date).getTime()
                    : 0,
        },
    ];

    if (getUserTypeId()!== 3) {
        columns.push({
            label: "Payment",
            render: (data) => {
                const isPaid =
                    data.repayment_status_name.toUpperCase() === "PAID";
    
                if (!isPaid && Number(data.is_payable) !== 1) {
                    return null;
                }
    
                return (
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={isPaid ? undefined : <PaymentRounded />}
                        disabled={isPaid || paymentLoading}
                        onClick={() => handlePay(data)}
                    >
                        {isPaid ? "Paid" : "Pay"}
                    </Button>
                );
            },
        });
    }

    return (
        <>
            <div className="mt-8">
                <SectionTitle
                    title="Repayment Schedule"
                    desc="View and manage loan repayment schedule"
                />

                <AppDataTableTabs
                    tabs={tabs}
                    data={loanRepaymentList}
                    columns={columns}
                    loading={loading}
                    onTabChange={setFilter}
                    emptyMessage="No repayment records found."
                    searchPlaceholder="Search repayment schedule..."
                />
            </div>

            {paymentModalOpen && selectedRepayment && (
                <PaymentConfirmationModal
                    repayment={selectedRepayment}
                    loading={paymentLoading}
                    onConfirm={handleConfirmPayment}
                    onCancel={handleCancelPayment}
                />
            )}
        </>
    );
};

export default LoanDetailsPaymentScheduleSection;
