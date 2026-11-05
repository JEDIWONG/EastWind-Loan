export const formatCurrencyWithUnit = (amount: string) => {
    const numericAmount = parseFloat(amount);
  
    if (isNaN(numericAmount)) {
      return "Invalid amount";
    }
  
    if (numericAmount >= 1_000_000) {
      return `RM ${(numericAmount / 1_000_000).toFixed(
        numericAmount % 1_000_000 === 0 ? 0 : 1
      )} M`;
    }
  
    if (numericAmount >= 1_0000) {
      return `RM ${(numericAmount / 1_000).toFixed(
        numericAmount % 1_000 === 0 ? 0 : 1
      )} K`;
    }
  
    return `RM ${numericAmount.toLocaleString("en-MY", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
};

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
  });
};

export const ddCurrencyWithUnit = (amount: string | number) => {
  const numericAmount = Number(amount);

  if (isNaN(numericAmount)) {
      return "Invalid amount";
  }

  if (numericAmount >= 1_000_000) {
      return `RM ${(numericAmount / 1_000_000).toFixed(
          numericAmount % 1_000_000 === 0 ? 0 : 1
      )} M`;
  }

  if (numericAmount >= 1_000) {
      return `RM ${(numericAmount / 1_000).toFixed(
          numericAmount % 1_000 === 0 ? 0 : 1
      )} K`;
  }

  return `RM ${numericAmount.toLocaleString("en-MY", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
  })}`;
};

export const ddCurrency = (amount: string | number) => {
  const numericAmount = Number(amount);

  if (isNaN(numericAmount)) {
      return "Invalid amount";
  }

  return numericAmount.toLocaleString("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const ddInterestRate = (interestRate: string | number) => {
  const numericInterestRate = Number(interestRate);

  if (isNaN(numericInterestRate)) {
      return "Invalid interest rate";
  }

  return `${numericInterestRate.toLocaleString("en-MY", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  })} %`;
};

export const ddTenureMonths = (tenure: number) => {
  return `${tenure} month${tenure > 1 ? "s" : ""}`;
};

export const ddDateTime  = (timestamp:string)=>{
  return new Date(timestamp).toLocaleString(); 
}; 

export const ddDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString();
};   

export const formatTenureWithMonth = (tenure: number) => {

  if (isNaN(tenure)) {
    return "Invalid tenure";
  }

  if (tenure >= 12) {
    const years = Math.floor(tenure / 12);
    const months = tenure % 12;
    return months > 0
      ? `${years} year${years > 1 ? "s" : ""} ${months} month${
          months > 1 ? "s" : ""
        }`
      : `${years} year${years > 1 ? "s" : ""}`;
  }

  return `${tenure} month${tenure > 1 ? "s" : ""}`;
}
