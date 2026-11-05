import { Paper } from "@mui/material";
import InfoRow from "../../generic/InfoRow";

interface BorrowerInfoTabProps {
    loanApplication: any;
}

const BorrowerInfoTab = ({
    loanApplication,
}: BorrowerInfoTabProps) => {
    return (
        <Paper
            elevation={0}
        >
            <InfoRow
                label="Full Name"
                value={`${loanApplication.borrower_f_name} ${loanApplication.borrower_l_name}`}
            />

            <InfoRow
                label="NRIC"
                value={loanApplication.borrower_nric}
            />

            <InfoRow
                label="Email"
                value={loanApplication.borrower_email}
            />

            <InfoRow
                label="Age"
                value={loanApplication.borrower_age}
            />

            <InfoRow
                label="Gender"
                value={loanApplication.borrower_gender}
            />

            <InfoRow
                label="Education"
                value={loanApplication.borrower_edu_status || "-"}
            />

            <InfoRow
                label="Address"
                value={loanApplication.borrower_addr_lines}
            />

            <InfoRow
                label="Postcode"
                value={loanApplication.borrower_postcode}
            />

            <InfoRow
                label="City"
                value={loanApplication.borrower_city}
            />

            <InfoRow
                label="State"
                value={loanApplication.borrower_state}
            />

            <InfoRow
                label="Home Ownership"
                value={loanApplication.home_ownership_status}
            />
        </Paper>
    );
};

export default BorrowerInfoTab;