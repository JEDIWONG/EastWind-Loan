import {
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { ddCurrency, ddInterestRate } from "../../../utils/data-format-helper";
import { useLoanOfferList } from "../../../hooks/useLoanOfferList";
import { useRouteHelper } from "../../../utils/route-helper";

const LoanOfferListTab = () => {

    const {loanOffers} = useLoanOfferList();

    const getStatusColor = (
        status: string
    ): "default" | "warning" | "success" | "info" => {
        switch (status) {
            case "Pending":
                return "warning";
            case "Offered":
                return "info";
            case "Accepted":
                return "success";
            case "Rejected":
                return "default";
            default:
                return "default";
        }
    };

    const columns = [
        {
            label: "Product Name",
            render: (data) => (
                <Typography>{data.loan_product_name}</Typography>
            ),
        },
        {
            label: "Lender",
            render: (data) => data.lender_name,
        },
        {
            label: "Offer Amount",
            render: (data) => ddCurrency(data.loan_approve_amount),
        },
        {
            label: "Tenure",
            render: (data) => `${data.loan_approve_tenure_month} months`,
        },
        {
            label: "Interest Rate",
            render: (data) =>
                ddInterestRate(data.loan_approve_interest_rate),
        },
        {
            label: "Total Repayment",
            render: (data) =>
                ddCurrency(data.loan_total_repayment),
        },
        {
            label: "Monthly Repayment",
            render: (data) =>
                ddCurrency(data.loan_monthly_repayment),
        },
        {
            label: "Status",
            render: (data) => (
                <Chip
                    label={data.loan_status_name}
                    color={getStatusColor(data.loan_status_name)}
                    size="small"
                />
            ),
        },
        {
            label: "Offer Date",
            render: (data) => data.loan_approve_date,
        },
    ];

    const { navToLoanOfferDetails } = useRouteHelper();

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.label}>
                                <strong>{column.label}</strong>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {loanOffers.length > 0 ? (
                        loanOffers.map((loan) => (
                            <TableRow
                                key={loan.id}
                                onClick={() =>
                                    navToLoanOfferDetails(String(loan.id))
                                }
                                hover
                                sx={{ cursor: "pointer" }}
                            >
                                {columns.map((column) => (
                                    <TableCell key={column.label}>
                                        {column.render(loan)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                align="center"
                                sx={{ py: 6 }}
                            >
                                <Typography color="text.secondary">
                                    No loan offers found.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LoanOfferListTab;