import { Typography } from "@mui/material";

interface CardSectionHeaderProps {
    title: string;
    subtitle?: string;
    icon?: any;
    iconClassName?: string;
    iconBackgroundClassName?: string;
    showPrefixLine?: boolean;
    titleVariant?:any;
}

const CardSectionHeader = ({
    title,
    subtitle,
    icon,
    iconClassName = "text-blue-600",
    iconBackgroundClassName = "bg-blue-50",
    showPrefixLine = false,
    titleVariant = "h6",
}: CardSectionHeaderProps) => {
    return (
        <div className="flex mt-5 mb-5 mx-5 items-center gap-5">
            {icon && (
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${iconBackgroundClassName}`}>
                    <span className={iconClassName}>
                        {icon}
                    </span>
                </div>
            )}

            <div className={`flex flex-col ${showPrefixLine ? "border-l-4 border-yellow-500 pl-4" : ""}`}>
                <Typography variant={titleVariant} sx={{fontWeight:"700"}}>
                    {title}
                </Typography>

                {subtitle && (
                    <p className="text-sm text-gray-500 mt-0.5">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CardSectionHeader;