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

interface CompletedLoanData {
    id: number;
    loanProduct: string;
    lender: string;
    loanAmount: number;
    totalRepaid: number;
    tenure: number;
    completedDate: string;
    status: string;
}

const LoanCompletedLoanTab = () => {

    const completedLoans: CompletedLoanData[] = [
        {
            id: 1,
            loanProduct: "Personal Financing",
            lender: "ABC Bank",
            loanAmount: 15000,
            totalRepaid: 16200,
            tenure: 24,
            completedDate: "05 Jan 2025",
            status: "Completed",
        },
    ];

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString("en-MY", {
            style: "currency",
            currency: "MYR",
            minimumFractionDigits: 0,
        });
    };

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Loan Product</strong></TableCell>
                        <TableCell><strong>Lender</strong></TableCell>
                        <TableCell><strong>Loan Amount</strong></TableCell>
                        <TableCell><strong>Total Repaid</strong></TableCell>
                        <TableCell><strong>Tenure</strong></TableCell>
                        <TableCell><strong>Completed Date</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {completedLoans.length > 0 ? (
                        completedLoans.map((loan) => (
                            <TableRow key={loan.id} hover>
                                <TableCell>
                                    <Typography>
                                        {loan.loanProduct}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    {loan.lender}
                                </TableCell>

                                <TableCell>
                                    {formatCurrency(loan.loanAmount)}
                                </TableCell>

                                <TableCell>
                                    {formatCurrency(loan.totalRepaid)}
                                </TableCell>

                                <TableCell>
                                    {loan.tenure} months
                                </TableCell>

                                <TableCell>
                                    {loan.completedDate}
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={loan.status}
                                        color="success"
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                                <Typography color="text.secondary">
                                    No completed loans found.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LoanCompletedLoanTab;