interface CardSectionHeaderProps {
    title: string;
    subtitle?: string;
    icon?: any;
    iconClassName?: string;
    iconBackgroundClassName?: string;
    showPrefixLine?: boolean;
}

const CardSectionHeader = ({
    title,
    subtitle,
    icon,
    iconClassName = "text-blue-600",
    iconBackgroundClassName = "bg-blue-50",
    showPrefixLine = false,
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
                <h2 className="font-bold text-gray-900">
                    {title}
                </h2>

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