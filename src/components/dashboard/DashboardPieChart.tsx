import { Card, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface DashboardPieChartData {
    label: string;
    value: number;
}

interface DashboardPieChartProps {
    title: string;
    data: DashboardPieChartData[];
    chartHeight?: number;
    chartWidth?: number;
}

const DashboardPieChart = ({
    title,
    data,
    chartHeight = 300,
    chartWidth = 300,
}: DashboardPieChartProps) => {
    return (
        <Card
            sx={{
                borderRadius: 3,
                p: 3,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                alignContent: "center",
                justifyItems: "center",
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    mb: 5,
                    fontWeight: 600,
                    textAlign: "center",
                }}
            >
                {title}
            </Typography>

            <PieChart
                series={[
                    {
                        data: data.map((item, index) => ({
                            id: index,
                            label: item.label,
                            value: item.value,
                        })),
                        innerRadius: 50,
                        outerRadius: 100,
                        paddingAngle: 3,
                        cornerRadius: 4,
                    },
                ]}
                height={chartHeight}
                width={chartWidth}
            />
        </Card>
    );
};

export default DashboardPieChart;
