import { Card, Typography, Button } from "@mui/material";
import {
    DescriptionRounded,
    LocalOfferRounded,
    AccountBalanceRounded,
} from "@mui/icons-material";
import { ddCurrency, ddInterestRate } from "../../../utils/data-format-helper";
import { useRouteHelper } from "../../../utils/route-helper";
import InfoCard from "../../generic/card/InfoCard";
import LoanStatusChip from "../chip/LoanStatusChip";
import CardSectionHeader from "../../generic/typography/CardSectionHeader";

const LoanCard = ({ loan }) => {
    const {
        navToLoanApplicationDetails,
        navToLoanOfferDetails,
        navToLoanDetails,
    } = useRouteHelper();

    const isDisbursed = loan.loan_disburse_date_actual !== null;
    const hasOffer = loan.loan_approve_date !== null;

    const amount = isDisbursed
        ? loan.loan_approve_amount
        : loan.loan_requested_amount;

    const interestRate = loan.loan_approve_interest_rate ?? loan.loan_requested_interest_rate;

    const tenure = loan.loan_approve_tenure_month ?? loan.loan_requested_tenure_month;

    return (
        <Card
            elevation={1}
            sx={{
                boxShadow:"1px 1px 3px #f8fafc", 
                borderRadius: 3,
                p: 3,
            }}
        >
            <div className="flex justify-between items-start gap-5">
                <CardSectionHeader 
                    title={loan.loan_product_name}
                    subtitle={loan.lender_name}
                />  

                <LoanStatusChip status={loan.loan_status_name} />
            </div>

            {isDisbursed ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <InfoCard
                        label="Outstanding"
                        value={ddCurrency(
                            loan.loan_outstanding_balance
                        )}
                        bgColor="#f8fafc"
                    />

                    <InfoCard
                        label="Monthly Repayment"
                        value={ddCurrency(
                            loan.loan_monthly_repayment
                        )}
                        bgColor="#f8fafc"
                    />

                    <InfoCard
                        label="Next Payment"
                        value={
                            loan.loan_next_payment
                                ? ddCurrency(
                                      loan.loan_next_payment
                                  )
                                : "-"
                        }
                        bgColor="#f8fafc"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <InfoCard
                        label={
                            hasOffer
                                ? "Approved Amount"
                                : "Requested Amount"
                        }
                        value={ddCurrency(amount)}
                    />

                    <InfoCard
                        label="Interest Rate"
                        value={ddInterestRate(interestRate)}
                    />

                    <InfoCard
                        label="Tenure"
                        value={`${tenure} months`}
                    />
                </div>
            )}

            <div className="flex items-center justify-between gap-5 mt-7 pt-5">
                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    Applied on {loan.loan_application_date}
                </Typography>

                <div className="flex flex-wrap justify-end gap-3">
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DescriptionRounded />}
                        onClick={() =>
                            navToLoanApplicationDetails(
                                loan.loan_id
                            )
                        }
                    >
                        Application
                    </Button>

                    {hasOffer && (
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<LocalOfferRounded />}
                            onClick={() =>
                                navToLoanOfferDetails(
                                    loan.loan_id
                                )
                            }
                        >
                            Offer
                        </Button>
                    )}

                    {isDisbursed && (
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<AccountBalanceRounded />}
                            onClick={() =>
                                navToLoanDetails(
                                    loan.loan_id
                                )
                            }
                        >
                            View Loan
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default LoanCard;