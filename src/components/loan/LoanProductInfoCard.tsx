

const LoanProductInfoCard = ({
    title,
    value
}) => {
    return (
        <>
            <div className="rounded-lg bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                    {title}
                </p>

                <p className="mt-1 text-lg font-bold">
                    {value}
                </p>
            </div>
        </>
    )
} 

export default LoanProductInfoCard;