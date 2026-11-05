import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import {
    VisibilityRounded,
    VisibilityOffRounded,
} from "@mui/icons-material";

interface MaskedBankAccountProps {
    accountNumber: string;
}

const MaskedBankAccount = ({
    accountNumber,
}: MaskedBankAccountProps) => {
    const [visible, setVisible] = useState(false);

    if (!accountNumber) {
        return <span>-</span>;
    }

    const maskedAccountNumber = accountNumber.replace(/\d(?=(?:\D*\d){4})/g,"*");

    return (
        <div className="flex items-center gap-2">
            <span>
                {visible ? accountNumber : maskedAccountNumber}
            </span>

            <Tooltip
                title={
                    visible
                        ? "Hide account number"
                        : "Show account number"
                }
            >
                <IconButton
                    size="small"
                    aria-label={
                        visible
                            ? "Hide bank account number"
                            : "Show bank account number"
                    }
                    onClick={(event) => {
                        event.stopPropagation();
                        setVisible((prev) => !prev);
                    }}
                >
                    {visible ? (
                        <VisibilityOffRounded fontSize="small" />
                    ) : (
                        <VisibilityRounded fontSize="small" />
                    )}
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default MaskedBankAccount;
