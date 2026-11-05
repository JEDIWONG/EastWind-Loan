import CardSectionHeader from "../../generic/typography/CardSectionHeader";
import { BusinessRounded, PersonRounded } from "@mui/icons-material";
import InfoRow from "../../generic/InfoRow";
import { Paper } from "@mui/material";


const LoanAgreementParties = ({ loan }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Paper
                elevation={0}
                sx={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 3,
                    p: 3,
                    height: "100%",
                }}
            >
                <CardSectionHeader
                    title="Borrower"
                    subtitle="Borrower information"
                    icon={<PersonRounded />}
                    iconBackgroundClassName="bg-purple-50"
                    iconClassName="text-purple-600"
                />

                <InfoRow
                    label="Full Name"
                    value={`${loan.borrower_f_name} ${loan.borrower_l_name}`}
                />

                <InfoRow
                    label="NRIC"
                    value={loan.borrower_nric}
                />
            </Paper>

            <Paper
                elevation={0}
                sx={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 3,
                    p: 3,
                    height: "100%",
                }}
            >
                <CardSectionHeader
                    title="Lender"
                    subtitle="Lender information"
                    icon={<BusinessRounded />}
                    iconBackgroundClassName="bg-blue-50"
                    iconClassName="text-blue-600"
                />

                <InfoRow
                    label="Company Name"
                    value={loan.lender_name}
                />

                <InfoRow
                    label="Registration No."
                    value={loan.lender_reg_no}
                />
            </Paper>
        </div>
    );
};

export default LoanAgreementParties;