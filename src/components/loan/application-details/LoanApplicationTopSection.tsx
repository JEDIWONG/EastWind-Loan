import { Grid } from "@mui/material";
import LoanApplicationProductInfoCard from "./LoanApplicationProductInfoCard.tsx";
import BorrowerLoanRequestCard from "./BorrowerLoanRequestCard.tsx";

interface LoanApplicationTopSectionProps {
    loanApplication: any;
}

const LoanApplicationTopSection = ({
    loanApplication,
}: LoanApplicationTopSectionProps) => {
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
                <BorrowerLoanRequestCard
                    loanApplication={loanApplication}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <LoanApplicationProductInfoCard
                    loanApplication={loanApplication}
                />
            </Grid>
        </Grid>
    );
};

export default LoanApplicationTopSection;