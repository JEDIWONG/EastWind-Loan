import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { ddCurrency, ddInterestRate } from "../../../utils/data-format-helper";
import { useRouteHelper } from "../../../utils/route-helper";

interface Column {
    label: string;
    render: (data: any) => React.ReactNode;
}

interface LoanApplicationTabProps {
    loanApplications: any[];
}

const LoanApplicationTab = ({
    loanApplications,
}: LoanApplicationTabProps) => {

    const columns: Column[] = [
        {
            label: "ID",
            render: (data) => (
                <Typography>{data.id}</Typography>
            ),
        },
        {
            label: "Product Name",
            render: (data) => (
                <Typography>{data.loan_product_name}</Typography>
            ),
        }, 
        {
            label: "Amount",
            render: (data) => ddCurrency(data.loan_amount),
        },
        {
            label: "Tenure",
            render: (data) => `${data.loan_tenure_month} months`,
        },
        {
            label: "Interest Rate",
            render: (data) => ddInterestRate(data.loan_interest_rate),
        },
        {
            label: "Approval Status",
            render: (data) => data.application_status_name,
        },
        {
            label: "Submitted At",
            render: (data) => data.loan_application_date,
        },
    ];

    const { navToLoanApplicationDetails } = useRouteHelper();

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
                    {loanApplications.length > 0 ? (
                        loanApplications.map((loan) => (
                            <TableRow
                                key={loan.id}
                                onClick={() =>
                                    navToLoanApplicationDetails(String(loan.id))
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
                                    No loan applications found.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LoanApplicationTab;