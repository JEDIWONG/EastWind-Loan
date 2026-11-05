import { Card, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

interface DashboardBarChartData {
    label: string;
    [key: string]: string | number;
}

interface DashboardBarChartSeries {
    dataKey: string;
    label: string;
    stack?: string;
}

interface DashboardBarChartProps {
    title: string;
    data: DashboardBarChartData[];
    series: DashboardBarChartSeries[];
    chartHeight?: number;
    chartWidth?: number;
}

const DashboardBarChart = ({
    title,
    data,
    series,
    chartHeight = 300,
    chartWidth,
}: DashboardBarChartProps) => {
    return (
        <Card
            sx={{
                borderRadius: 3,
                p: 3,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
        >
            <Typography
                variant="h6"
                sx={{ mb: 2 }}
            >
                {title}
            </Typography>

            <BarChart
                dataset={data}
                xAxis={[
                    {
                        scaleType: "band",
                        dataKey: "label",
                    },
                ]}
                series={series.map((item) => ({
                    dataKey: item.dataKey,
                    label: item.label,
                    stack: item.stack,
                }))}
                height={chartHeight}
                width={chartWidth}
            />
        </Card>
    );
};

export default DashboardBarChart;
