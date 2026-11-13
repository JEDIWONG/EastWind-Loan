
import { useMemo, useState } from "react";
import { Box, Button, Collapse, Typography } from "@mui/material";
import { ExpandMoreRounded, ExpandLessRounded } from "@mui/icons-material";
import LoanCard from "./LoanCard";
import {
    AssignmentRounded,
    LocalOfferRounded,
    AccountBalanceRounded,
} from "@mui/icons-material";

const LoanCardList = ({ loanData }) => {
    const [expandedSections, setExpandedSections] = useState({});

    const loanGroups = useMemo(() => ({
        applications: loanData.filter(
            (loan) =>
                loan.loan_status_name === "Pending" ||
                loan.loan_status_name === "Rejected" ||
                loan.loan_status_name === "Cancelled"
        ),

        offers: loanData.filter(
            (loan) =>
                loan.loan_status_name === "Offered" ||
                loan.loan_status_name === "Accepted"
        ),

        active: loanData.filter(
            (loan) =>
                loan.loan_status_name === "Active" ||
                loan.loan_status_name === "Delinquent" ||
                loan.loan_status_name === "In Collections" ||
                loan.loan_status_name === "Completed" ||
                loan.loan_status_name === "Defaulted" ||
                loan.loan_status_name === "Written Off"
        ),
    }), [loanData]);

    const sections = [
        {
            id: "applications",
            title: "Loan Applications",
            description: "Track your submitted loan applications.",
            loans: loanGroups.applications,
            icon: AssignmentRounded,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            countBg: "bg-blue-100 text-blue-700",
        },
        {
            id: "offers",
            title: "Loan Offers",
            description: "Review and respond to loan offers.",
            loans: loanGroups.offers,
            icon: LocalOfferRounded,
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
            countBg: "bg-amber-100 text-amber-700",
        },
        {
            id: "active",
            title: "Active Loans",
            description: "Monitor your ongoing loan repayments.",
            loans: loanGroups.active,
            icon: AccountBalanceRounded,
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
            countBg: "bg-emerald-100 text-emerald-700",
        },
    ];

    const toggleSection = (sectionId) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    return (
        <div className="space-y-7">
            {sections.map((section) => {
                const sortedLoans = [...section.loans].sort(
                    (a, b) =>
                        new Date(b.loan_application_date).getTime() -
                        new Date(a.loan_application_date).getTime()
                );

                const isExpanded = expandedSections[section.id] ?? false;
                const hasMore = sortedLoans.length > 1;
                const visibleLoans = isExpanded
                    ? sortedLoans
                    : sortedLoans.slice(0, 1);

                return (
                    <Box
                        key={section.id}
                        sx={{
                            bgcolor: "white",
                            p: { xs: 3, md: 5 },
                            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                        }}
                    >
                        <div className="mb-6 flex items-center justify-between gap-3  p-4">
                            <div className="flex items-center gap-3">
                                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${section.iconBg}`}>
                                    <section.icon className={section.iconColor} />
                                </div>

                                <div>
                                    <Typography
                                        variant="h5"
                                        sx={{ fontWeight: 800, lineHeight: 1.4 }}
                                    >
                                        {section.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {section.description}
                                    </Typography>
                                </div>
                            </div>

                            <span className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold ${section.countBg}`}>
                                {sortedLoans.length}
                            </span>
                        </div>

                        {sortedLoans.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 gap-5">
                                    <LoanCard
                                        key={sortedLoans[0].loan_id}
                                        loan={sortedLoans[0]}
                                    />
                                </div>

                                <Collapse in={isExpanded} timeout="auto">
                                    <div className="mt-5 grid grid-cols-1 gap-5">
                                        {sortedLoans.slice(1).map((loan) => (
                                            <LoanCard
                                                key={loan.loan_id}
                                                loan={loan}
                                            />
                                        ))}
                                    </div>
                                </Collapse>

                                {hasMore && (
                                    <div className="mt-5 flex justify-center border-t border-slate-100 pt-3">
                                        <Button
                                            size="small"
                                            onClick={() => toggleSection(section.id)}
                                            color="secondary"
                                            endIcon={
                                                isExpanded
                                                    ? <ExpandLessRounded />
                                                    : <ExpandMoreRounded />
                                            }
                                        >
                                            {isExpanded
                                                ? "View Less"
                                                : `View More (${sortedLoans.length - 1})`}
                                        </Button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center">
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    No {section.title.toLowerCase()} found.
                                </Typography>
                            </div>
                        )}
                    </Box>
                );
            })}
        </div>
    );
};

export default LoanCardList;
