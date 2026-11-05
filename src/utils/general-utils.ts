export const getGenderFromNRIC = (nric: string) => {
    const lastDigit = parseInt(nric.slice(-1), 10);
    return lastDigit % 2 === 1 ? "Male" : "Female";
};
  
export const getAgeFromNRIC = (nric: string) => {
    const yy = parseInt(nric.slice(0, 2), 10);
    const mm = parseInt(nric.slice(2, 4), 10);
    const dd = parseInt(nric.slice(4, 6), 10);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const currentYY = currentYear % 100;

    const birthYear =
        yy <= currentYY
        ? 2000 + yy
        : 1900 + yy;

    const birthDate = new Date(birthYear, mm - 1, dd);

    let age = currentYear - birthYear;

    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
};