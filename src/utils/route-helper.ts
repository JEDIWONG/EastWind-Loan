import { useNavigate } from "react-router-dom";
import { getUserTypeId } from "../auth/session";

export const AppRoutes = {
    home: "/",
    compare: "/compare",

    login: "/auth/login",
    register: "/auth/register",

    findLoan: "/find-loan",
    profile: "/borrower/profile",

    loanProduct: (id: string) => `/loan-product/${id}`,
    loanProductEdit: (id: string) => `/lender/product/${id}/edit`,

    loanApplicationForm: (id: string) => `/apply/${id}`,

    loanManagement: "/loan-management",

    loanApplicationDashboard: "/lender/applications",
    loanOfferDashboard: "/lender/offers",
    loanDisbursementDashboard: "/lender/disbursements",
    activeLoanDashboard: "/lender/active-loans",

    loanApplicationDetails: (id: string, userTypeId: number) =>
        userTypeId === 3
            ? `/lender/loan-application/${id}`
            : `/loan-application/${id}`,

    loanOfferDetails: (id: string, userTypeId: number) =>
        userTypeId === 3
            ? `/lender/loan-offer/${id}`
            : `/loan-offer/${id}`,
    
    loanDetails: (id: string, userTypeId: number) =>
        userTypeId === 3
            ? `/lender/loan/${id}`
            : `/loan/${id}`,

    lenderLoanApplicationDetails: (id: string) =>
        `/lender/loan-application/${id}`,

    lenderDashboard: "/lender/dashboard",
    borrowerDashboard: "/borrower/dashboard",
};

export const useRouteHelper = () => {
    const navigate = useNavigate();

    const routeAfterSignIn = () => {
        const userTypeId = getUserTypeId();

        if (userTypeId === 2) {
            navigate(AppRoutes.borrowerDashboard);
        } else if (userTypeId === 3) {
            navigate(AppRoutes.lenderDashboard);
        }
    };

    const navToHome = () => {
        navigate(AppRoutes.home);
    };

    const navToLogin = () => {
        navigate(AppRoutes.login);
    };

    const navToRegister = () => {
        navigate(AppRoutes.register);
    };

    const navToFindLoan = () => {
        navigate(AppRoutes.findLoan);
    };

    const navToLoanProduct = (id: string) => {
        navigate(AppRoutes.loanProduct(id));
    };

    const navToLoanApplicationForm = (id: string) => {
        navigate(AppRoutes.loanApplicationForm(id));
    };

    const navToLoanManagement = () => {
        navigate(AppRoutes.loanManagement);
    };

    const navToBorrowerDashboard = () => {
        navigate(AppRoutes.borrowerDashboard);
    };

    const navToLenderDashboard = () => {
        navigate(AppRoutes.lenderDashboard);
    };


    const navToLoanApplicationDashboard = () => {
        navigate(AppRoutes.loanApplicationDashboard);
    };

    const navToLoanOfferDashboard = () => {
        navigate(AppRoutes.loanOfferDashboard);
    };

    const navToLoanDisbursementDashboard = () => {
        navigate(AppRoutes.loanDisbursementDashboard);
    };

    const navToActiveLoanDashboard = () => {
        navigate(AppRoutes.activeLoanDashboard);
    };

    const navToLoanApplicationDetails = (id: string) => {
        const userTypeId = getUserTypeId();
        navigate(AppRoutes.loanApplicationDetails(id,userTypeId));
    };

    const navToLoanOfferDetails = (id: string) => {
        const userTypeId = getUserTypeId();
        navigate(AppRoutes.loanOfferDetails(id,userTypeId));
    };

    const navToLenderLoanApplicationDetails = (id: string) => {
        navigate(AppRoutes.lenderLoanApplicationDetails(id));
    };

    const navToLoanDetails = (id: string) => {
        const userTypeId = getUserTypeId();
        navigate(AppRoutes.loanDetails(id,userTypeId));
    };

    const navToEditLoanProduct = (id: string) => {
        navigate(AppRoutes.loanProductEdit(id));
    };

    const navToCompare = () => {
        navigate(AppRoutes.compare);
    }

    return {
        routeAfterSignIn,

        navToHome,
        navToCompare,
        navToLogin,
        navToRegister,
        navToFindLoan,

        navToLoanProduct,
        navToLoanApplicationForm,
        navToLoanManagement,

        navToBorrowerDashboard, 
        navToLenderDashboard,

        navToLoanApplicationDashboard,
        navToLoanOfferDashboard,
        navToLoanDisbursementDashboard,
        navToActiveLoanDashboard,

        navToLoanApplicationDetails,
        navToLoanOfferDetails,
        navToLenderLoanApplicationDetails,
        navToLoanDetails, 
        navToEditLoanProduct, 
    };
};