import { useState } from "react";
import {
    Box,
    Paper,
    Tab,
    Tabs,
} from "@mui/material";
import {
    PersonOutlined,
    WorkOutlined,
    AccountBalanceWalletOutlined,
    DescriptionRounded,
} from "@mui/icons-material";
import BorrowerInfoTab from "./BorrowerInfoTab";
import EmploymentInfoTab from "./EmploymentInfoTab";
import DebtInfoTab from "./DebtInfoTab";
import CardSectionHeader from "../../generic/typography/CardSectionHeader";

interface ApplicantDetailSectionProps {
    loanApplication: any;
}

const ApplicantDetailSection = ({
    loanApplication,
}: ApplicantDetailSectionProps) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            
            <div className="px-5 pt-5">
                <CardSectionHeader 
                    icon={<DescriptionRounded/>}
                    iconBackgroundClassName="bg-blue-50"
                    iconClassName="text-blue-600"
                    title="Application Details"
                    subtitle="Review the applicant's personal, employment and debt information."
                />
            </div>
            

            <Tabs
                value={activeTab}
                onChange={(_, value) => setActiveTab(value)}
                variant="fullWidth"
                sx={{
                    mt: 3,
                    borderBottom: "1px solid #e5e7eb",
                    "& .MuiTab-root": {
                        minHeight: 56,
                        textTransform: "none",
                        fontWeight: 500,
                        color: "#6b7280",
                    },
                    "& .Mui-selected": {
                        color: "#2563eb",
                        fontWeight: 600,
                    },
                    "& .MuiTabs-indicator": {
                        height: 3,
                    },
                }}
            >
                <Tab
                    icon={<PersonOutlined />}
                    iconPosition="start"
                    label="Borrower Information"
                />

                <Tab
                    icon={<WorkOutlined />}
                    iconPosition="start"
                    label="Employment Information"
                />

                <Tab
                    icon={<AccountBalanceWalletOutlined />}
                    iconPosition="start"
                    label="Debt Information"
                />
            </Tabs>

            <Box sx={{ p: 3 }}>
                {activeTab === 0 && (
                    <BorrowerInfoTab
                        loanApplication={loanApplication}
                    />
                )}

                {activeTab === 1 && (
                    <EmploymentInfoTab
                        loanApplication={loanApplication}
                    />
                )}

                {activeTab === 2 && (
                    <DebtInfoTab
                        loanApplication={loanApplication}
                    />
                )}
            </Box>
        </Paper>
    );
};

export default ApplicantDetailSection;