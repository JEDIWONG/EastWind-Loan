import { Card, Typography } from "@mui/material";

interface DashboardCardProps {
    label: string;
    value: string | number;
    trailingSymbol?: string;
}

const DashboardCard = ({
    label,
    value,
    trailingSymbol,
}: DashboardCardProps) => {
    return (
        <Card
            sx={{
                borderRadius: 3,
                p: 3,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    fontSize: 13,
                    fontWeight: 500,
                }}
            >
                {label}
            </Typography>

            <div className="flex gap-4 mt-3 justify-center items-end">
                <Typography
                    variant="h5"
                    sx={{
                        fontweight: 600,
                    }}
                >
                    {value} 
                </Typography>
                
                {trailingSymbol&&
                    <Typography>
                        {trailingSymbol}
                    </Typography>
                }
            </div>
            
        </Card>
    );
};

export default DashboardCard;
