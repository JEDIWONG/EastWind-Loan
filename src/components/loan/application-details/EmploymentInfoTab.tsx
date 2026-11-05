import { Paper } from "@mui/material";
import InfoRow from "../../generic/InfoRow";
import { ddCurrency } from "../../../utils/data-format-helper";

interface EmploymentInfoTabProps {
    loanApplication: any;
}

const EmploymentInfoTab = ({
    loanApplication,
}: EmploymentInfoTabProps) => {
    return (
        <Paper
            elevation={0}
        >
            <InfoRow
                label="Occupation"
                value={loanApplication.borrower_occupation}
            />

            <InfoRow
                label="Employment Status"
                value={loanApplication.borrower_employment_status}
            />

            <InfoRow
                label="Employment Duration"
                value={`${loanApplication.borrower_employment_duration_year || 0} years ${loanApplication.borrower_employment_duration_month || 0} months`}
            />

            <InfoRow
                label="Employer Name"
                value={loanApplication.borrower_employer_name}
            />

            <InfoRow
                label="Sector"
                value={loanApplication.borrower_employer_sector}
            />

            <InfoRow
                label="Employer Contact No."
                value={loanApplication.borrower_employer_contact_no}
            />

            <InfoRow
                label="Office Address"
                value={loanApplication.borrower_employment_addr_lines}
            />

            <InfoRow
                label="Postcode"
                value={loanApplication.borrower_employment_postcode}
            />

            <InfoRow
                label="City"
                value={loanApplication.borrower_employment_city}
            />

            <InfoRow
                label="State"
                value={loanApplication.borrower_employment_state}
            />

            <InfoRow
                label="Monthly Income"
                value={ddCurrency(loanApplication.monthly_income)}
            />
        </Paper>
    );
};

export default EmploymentInfoTab;