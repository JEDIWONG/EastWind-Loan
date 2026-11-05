export const calculateLoanRepayment = (
    approvedAmount: number,
    interestRate: number,
    tenureMonth: number
) => {

    interestRate = interestRate /12/100;

    const monthlyRepayment = tenureMonth > 0 ? (approvedAmount*interestRate*Math.pow((1+interestRate),tenureMonth))/(Math.pow((1+interestRate),tenureMonth)-1): 0;

    const totalRepayment = monthlyRepayment * tenureMonth;

    const totalInterest = totalRepayment - approvedAmount;

    return {
        totalInterest: totalInterest,
        totalRepayment: totalRepayment,
        monthlyRepayment: monthlyRepayment,
    };
};

export const offsetAmount = (amount: number):number => {
    return Math.round(amount);
}

