import { Box, Typography } from "@mui/material";

interface InfoRowProps {
    label: string;
    value: string | number | null | undefined;
}

const InfoRow = ({
    label,
    value,
}: InfoRowProps) => {
    return (
        <Box className="flex justify-between gap-6 border-b border-gray-100 py-3 last:border-0">
            <Typography color="text.secondary">
                {label}
            </Typography>

            <Typography >
                {value || "-"}
            </Typography>
        </Box>
    );
};

export default InfoRow; 