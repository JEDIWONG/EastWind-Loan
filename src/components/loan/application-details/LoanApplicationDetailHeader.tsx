import {
    Box,
    Chip,
    IconButton,
    Paper,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    ContentCopy,
    DescriptionOutlined,
} from "@mui/icons-material";
import { ddDate } from "../../../utils/data-format-helper";
import CopyableText from "../../generic/CopyableText";
import LoanStatusChip from "../chip/LoanStatusChip";

interface LoanApplicationDetailHeaderProps {
    loanApplication: any;
}

const LoanApplicationDetailHeader = ({
    loanApplication,
}: LoanApplicationDetailHeaderProps) => {

    const getStatusColor = (
        status: string
    ): "default" | "warning" | "success" | "error" | "info" => {
        switch (status) {
            case "Pending":
                return "warning";
            case "Under Review":
                return "info";
            case "Approved":
                return "success";
            case "Rejected":
                return "error";
            default:
                return "default";
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                p: { xs: 2, sm: 3 },
            }}
        >
            <Box className="flex items-center justify-between">
                <Box className="flex items-center gap-4">
                    <Box>
                        <Typography
                            variant="h6"
                        >
                            Loan Application
                        </Typography>

                        <CopyableText label={"ID : "} value={loanApplication.loan_id}/>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Submitted At  {ddDate(loanApplication.loan_application_date)}
                        </Typography>
                    </Box>
                </Box>

                <LoanStatusChip status={loanApplication.application_status_name}/>
            </Box>
        </Paper>
    );
};

export default LoanApplicationDetailHeader;