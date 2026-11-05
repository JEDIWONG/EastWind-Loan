import { Chip } from "@mui/material";
import type { success } from "zod";

interface LoanStatusChipProps {
    status: string;
}

const LoanStatusChip = ({
    status,
}: LoanStatusChipProps) => {
    const normalizedStatus = status.toLowerCase();

    const statusConfig = {
        pending: {
            label: "Pending",
            color: "#b45309",
            backgroundColor: "#fef3c7",
        },
        processing: {
            label: "Processing",
            color: "#b45309",
            backgroundColor: "#fef3c7",
        },
        offered: {
            label: "Offered",
            color: "#1d4ed8",
            backgroundColor: "#dbeafe",
        },
        approved: {
            label: "Approved",
            color: "#15803d",
            backgroundColor: "#dcfce7",
        },
        accepted: {
            label: "Accepted",
            color: "#15803d",
            backgroundColor: "#dcfce7",
        },
        rejected: {
            label: "Rejected",
            color: "#b91c1c",
            backgroundColor: "#fee2e2",
        },
        "offer rejected": {
            label: "Offer Rejected",
            color: "#b91c1c",
            backgroundColor: "#fee2e2",
        },
        active: {
            label: "Active",
            color: "#7e22ce",
            backgroundColor: "#f3e8ff",
        },
        success: {
            label: "Success",
            color: "#047857",
            backgroundColor: "#d1fae5",
        },
        paid: {
            label: "Paid",
            color: "#047857",
            backgroundColor: "#d1fae5",
        },
        completed: {
            label: "Completed",
            color: "#047857",
            backgroundColor: "#d1fae5",
        },
        defaulted: {
            label: "Defaulted",
            color: "#991b1b",
            backgroundColor: "#fecaca",
        },
        cancelled: {
            label: "Cancelled",
            color: "#6b7280",
            backgroundColor: "#f3f4f6",
        },
    };

    const config = statusConfig[normalizedStatus] ?? {
        label: status,
        color: "#374151",
        backgroundColor: "#f3f4f6",
    };

    return (
        <Chip
            label={config.label}
            size="medium"
            sx={{
                color: config.color,
                backgroundColor: config.backgroundColor,
                fontWeight: 500,
            }}
        />
    );
};

export default LoanStatusChip;