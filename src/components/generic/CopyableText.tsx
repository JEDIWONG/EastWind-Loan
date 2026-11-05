import { useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material";
import { CheckRounded, ContentCopyRounded } from "@mui/icons-material";

interface CopyableTextProps {
    label?:string, 
    value: string | number | null | undefined;
    variant?: TypographyProps["variant"];
}

const CopyableText = ({
    label,
    value,
    variant = "body2",
}: CopyableTextProps) => {
    const [copied, setCopied] = useState(false);

    const text = value == null ? "" : String(value);

    const handleCopy = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
        } catch (error) {
            console.error("Failed to copy text:", error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                minWidth: 0,
            }}
        >
            <Typography
                variant={variant}
                title={text}
                color="textSecondary"
                sx={{
                    flex: 1,
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                }}
            >
                {label} {text || "-"}
            </Typography>

            {text && (
                <Tooltip title={copied ? "Copied!" : "Copy"}>
                    <IconButton
                        size="small"
                        aria-label="Copy text"
                        onClick={handleCopy}
                        sx={{ flexShrink: 0 }}
                    >
                        {copied ? (
                            <CheckRounded fontSize="small" color="success" />
                        ) : (
                            <ContentCopyRounded fontSize="small" />
                        )}
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
};

export default CopyableText;
