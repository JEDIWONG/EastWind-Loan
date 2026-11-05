import { Paper } from "@mui/material";
import InfoRow from "../../generic/InfoRow";
import { ddCurrency } from "../../../utils/data-format-helper";

interface DebtInfoTabProps {
    loanApplication: any;
}

const DebtInfoTab = ({
    loanApplication,
}: DebtInfoTabProps) => {
    const debtInfo = JSON.parse(loanApplication.debt_info)|| [];
    return (
        <Paper
            elevation={0}
        >
            {debtInfo.length === 0 ? (
                <p className="text-gray-500">
                    No debt information provided.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-5">
                    {debtInfo.map((debt: any, index: number) => (
                        <div
                            key={index}
                            className="rounded-xl border border-gray-200 p-5"
                        >
                            <InfoRow
                                label="Debt Type"
                                value={debt.debt_type_name}
                            />

                            <InfoRow
                                label="Monthly Debt Commitment"
                                value={ddCurrency(debt.monthly_debt_commitment)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </Paper>
    );
};

export default DebtInfoTab;