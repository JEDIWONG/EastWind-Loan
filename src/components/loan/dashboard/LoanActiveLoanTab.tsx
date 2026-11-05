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
import { ddCurrency } from "../../../utils/data-format-helper";
import { useActiveLoanList } from "../../../hooks/useActiveLoanList";

const LoanActiveLoanTab = () => {

    const {activeLoanList} = useActiveLoanList(); 

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Loan Product</strong></TableCell>
                        <TableCell><strong>Disbursed Amount</strong></TableCell>
                        <TableCell><strong>Interest Rate</strong></TableCell>
                        <TableCell><strong>Monthly Repayment</strong></TableCell>
                        <TableCell><strong>Outstanding Balance</strong></TableCell>
                        <TableCell><strong>Next Payment</strong></TableCell>
                        <TableCell><strong>End Date</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {activeLoanList.length > 0 ? (
                        activeLoanList.map((loan) => (
                            <TableRow key={loan.id} hover>
                                <TableCell>
                                    <Typography>
                                        {loan.loan_product_name}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    {ddCurrency(loan.loan_approve_amount)}
                                </TableCell>

                                <TableCell>
                                    {ddCurrency(loan.loan_monthly_repayment)}
                                </TableCell>

                                <TableCell>
                                    {ddCurrency(loan.loan_outstanding_balance)}
                                </TableCell>

                                <TableCell>
                                    <Chip
                                        label={loan.loan_status_name}
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
                                    No active loans found.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LoanActiveLoanTab;