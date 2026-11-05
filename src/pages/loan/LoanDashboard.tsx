import { useState } from "react";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import LoanApplicationTab from "../../components/loan/dashboard/LoanApplicationTab";
import LoanActiveLoanTab from "../../components/loan/dashboard/LoanActiveLoanTab";
import LoanCompletedLoanTab from "../../components/loan/dashboard/LoanCompleteLoanTab";
import { useLoanApplications } from "../../hooks/useLoanApplicationList";
import { getUserTypeId } from "../../auth/session";
import LoanOfferListTab from "../../components/loan/dashboard/LoanOfferListTab";

const LoanDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);

    const userTypeId = getUserTypeId();

    const {
        loanApplications
    } = useLoanApplications();

    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                return (
                    <LoanApplicationTab
                        loanApplications={loanApplications}
                    />
                );
                
            case 1:
                return (
                    <LoanOfferListTab/>
                ); 
            case 2:
                return <LoanActiveLoanTab />;

            case 3:
                return <LoanCompletedLoanTab />;

            default:
                return null;
        }
    };

    const pageTitle =
        userTypeId === 2
            ? "My Loans"
            : "Loan Management";

    const pageDescription =
        userTypeId === 2
            ? "View and manage your loan applications and active loans."
            : "Review and manage loan applications and ongoing loans.";

    return (
        <div className="mx-20 my-12 min-h-screen">
            <div className="mb-8">
                <h1>{pageTitle}</h1>

                <p>
                    {pageDescription}
                </p>
            </div>

            <Paper
                elevation={0}
                sx={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        sx={{ px: 2 }}
                    >
                        <Tab label="Loan Applications" />
                        <Tab label="Loan Offers" />
                        <Tab label="Active Loans" />
                        <Tab label="Completed Loans" />
                    </Tabs>
                </Box>

                {renderTabContent()}
            </Paper>
        </div>
    );
};

export default LoanDashboard;