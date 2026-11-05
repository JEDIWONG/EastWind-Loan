import { Card, Typography } from "@mui/material";

interface InfoCardProps {
    label: string;
    value: string | number;
    bgColor?: string;
    fgColor?: string;
}

const InfoCard = ({
    label,
    value,
    bgColor = "#ffffff",
    fgColor = "#111827",
}: InfoCardProps) => {
    return (
        <Card
            elevation={0}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 0.75,
                minWidth: 0,
                
                p: { xs: 2, sm: 2.5 },
                backgroundColor: bgColor,
                border: "1px solid #e5e7eb",
                borderRadius: 1,
                boxShadow: "none",
                transition: "border-color 0.2s ease",
                "&:hover": {
                    borderColor: "#d1d5db",
                },
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    color: fgColor,
                    opacity: 0.65,
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    lineHeight: 1.4,
                }}
            >
                {label}
            </Typography>

            <Typography
                variant="body2"
                title={String(value)}
                sx={{
                    color: fgColor,
                    fontWeight: 700,
                    lineHeight: 1.4,
                    letterSpacing: "-0.02em",
                    overflowWrap: "anywhere",
                    fontVariantNumeric: "tabular-nums",
                }}
            >
                {value}
            </Typography>
        </Card>
    );
};

export default InfoCard;