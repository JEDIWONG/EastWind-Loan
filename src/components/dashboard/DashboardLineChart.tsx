import { Card, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

interface DashboardLineChartData {
    label: string;
    value: number;
}

interface DashboardLineChartProps {
    title: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    data: DashboardLineChartData[];
    chartHeight?: number;
}

const DashboardLineChart = ({
    title,
    data,
    xAxisLabel,
    yAxisLabel, 
    chartHeight = 300,
}: DashboardLineChartProps) => {
    return (
        <Card
            sx={{
                borderRadius: 3,
                p: 3,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                width:"100%",
                minWidth: 0,
            }}
        >
            <Typography
                variant="h6"
                
                sx={{
                    mb: 2,
                    fontWeight:600,
                    letterSpacing: 1,
                }}
            >
                {title}
            </Typography>

            <LineChart
                margin={{ top: 0, right: 50, bottom: 0, left: 0 }}
                xAxis={[
                    {
                        scaleType: "point",
                        data: data.map((item) => item.label),
                        label: xAxisLabel,
                    },
                ]}
                series={[
                    {
                        data: data.map((item) => item.value),
                        label: yAxisLabel,
                    },
                ]}
                height={chartHeight}
                
            />
        </Card>
    );
};

export default DashboardLineChart