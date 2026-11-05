import { ExpandMoreRounded, GavelRounded } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Paper,
} from "@mui/material";
import CardSectionHeader from "../../generic/typography/CardSectionHeader";

const terms = [
    {
        label: "Loan Agreement",
        desc: "The lender agrees to provide the loan amount stated in this agreement, subject to the terms and conditions of the loan.",
    },
    {
        label: "Repayment",
        desc: "The borrower agrees to repay the loan through the scheduled monthly repayments within the agreed loan tenure.",
    },
    {
        label: "Late Payment",
        desc: "Late payments may be subject to applicable charges or other consequences specified by the lender.",
    },
    {
        label: "Borrower Obligations",
        desc: "The borrower is responsible for providing accurate information and fulfilling all repayment obligations under this agreement.",
    },
];

const LoanAgreementTerms = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 2,
                overflow: "hidden",
            }}
        >
            <Accordion
                disableGutters
                elevation={0}
                sx={{
                    "&:before": {
                        display: "none",
                    },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreRounded />}
                    sx={{
                        px: 2,
                        py: 1,
                    }}
                >
                    <CardSectionHeader
                        title="Terms and Conditions"
                        subtitle="Please review the terms of this agreement"
                        icon={<GavelRounded />}
                        iconBackgroundClassName="bg-gray-100"
                        iconClassName="text-gray-600"
                    />
                </AccordionSummary>

                <AccordionDetails className="px-4 pb-4">
                    <div className="space-y-4">
                        {terms.map((term) => (
                            <div key={term.label}>
                                <p
                                    className="font-bold text-gray-700"
                                >
                                   {term.label}
                                </p>

                                <p
                                    className="mt-1 text-gray-500"
                                >
                                    {term.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
};

export default LoanAgreementTerms;