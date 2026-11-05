import { Typography, Chip, Stack } from "@mui/material";
import { ddCurrency } from "../../../utils/data-format-helper";
import CardSectionHeader from "../../generic/typography/CardSectionHeader";
import { DescriptionRounded } from "@mui/icons-material";

interface LoanProductRequirement {
    rule_type_id: number;
    rule_type_name: string;
    rule_condition: string;
    rule_value: string;
}

interface LoanProductRequirementsProps {
    requirements: string;
}

const LoanProductRequirements = ({
    requirements,
}: LoanProductRequirementsProps) => {
    const data: LoanProductRequirement[] = JSON.parse(requirements);

    const annualIncome = data.find((item) => item.rule_type_name === "ANNUAL_INCOME");

    const minAge = data.find((item) => item.rule_type_name === "MIN_AGE");
    const maxAge = data.find((item) => item.rule_type_name === "MAX_AGE");

    const employmentStatus = data.find(
        (item) => item.rule_type_name === "EMPLOYMENT_STATUS"
    );

    const employmentStatuses = employmentStatus
        ? JSON.parse(employmentStatus.rule_value)
        : [];

    return (
        <div className="my-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
            <CardSectionHeader 
                icon={<DescriptionRounded/>}
                iconBackgroundClassName="bg-indigo-50"
                iconClassName="text-indigo-600"
                title="Requirements" 
                subtitle="Following requirements must be met to apply for this loan product. Subject to lender's terms and condition."
            />

            <div className="divide-y divide-gray-200">
                <div className="flex items-center py-4">
                    <Typography
                        variant="body2"
                        className="w-1/3 text-gray-500"
                    >
                        Minimum Annual Income
                    </Typography>

                    <Typography
                        variant="body1"
                        className="font-semibold text-gray-800"
                    >
                        {ddCurrency(annualIncome?.rule_value || 0)}
                    </Typography>
                </div>

                <div className="flex items-center py-4">
                    <Typography
                        variant="body2"
                        className="w-1/3 text-gray-500"
                    >
                        Age
                    </Typography>

                    <Typography
                        variant="body1"
                        className="font-semibold text-gray-800"
                    >
                        {minAge
                            ? `${minAge.rule_value} - ${maxAge?.rule_value || "Not specified"}`
                            : "Not specified"}
                    </Typography>
                </div>

                <div className="flex items-center py-4">
                    <Typography
                        variant="body2"
                        className="w-1/3 text-gray-500"
                    >
                        Who Can Apply
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        {employmentStatuses.map((status: string) => (
                            <Chip
                                key={status}
                                label={status}
                                size="small"
                            />
                        ))}
                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default LoanProductRequirements;