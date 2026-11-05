import { Box, Card, CardContent, Typography } from "@mui/material";
import LoanStatusChip from "../chip/LoanStatusChip";
import CopyableText from "../../generic/CopyableText";
import { ddDate } from "../../../utils/data-format-helper";


const LoanAgreementHeader = ({ loan }) => {

    return (
        <Card
            elevation={0}
            sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                boxShadow: "none",
            }}
        >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box className="flex flex-wrap items-start justify-between gap-4">
                    <Box >
                        <Typography
                            variant="h6"
                        >
                            Loan Agreement
                        </Typography>

                        <CopyableText label={"ID : "} value={loan.id} />

                        <Typography
                            variant="body2"
                        >
                            Offerred At {loan.loan_approve_date ? ddDate(loan.loan_approve_date) : "-"}
                        </Typography>
                    </Box>

                    <LoanStatusChip status={loan.loan_status_name} />
                </Box>

            </CardContent>
        </Card>
    );
};

export default LoanAgreementHeader;