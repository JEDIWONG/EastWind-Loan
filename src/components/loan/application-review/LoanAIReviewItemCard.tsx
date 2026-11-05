interface LoanAIReviewItemCardProps {
    title: string;
    value?: string|number;
    subtitle?: string;
    children?: any;
    className?: string;
}

const LoanAIReviewItemCard = ({
    title,
    value,
    subtitle,
    children,
    className = "",
}: LoanAIReviewItemCardProps) => {
    return (
        <div
            className={`relative overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-5 ${className}`}
        >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {title}
                </p>

                {value !== undefined && (
                    <p className="mt-2 text-xl font-semibold text-white">
                        {value}
                    </p>
                )}

                {subtitle && (
                    <p className="mt-1 text-xs text-slate-500">
                        {subtitle}
                    </p>
                )}

                {children && (
                    <div className="mt-3">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoanAIReviewItemCard;