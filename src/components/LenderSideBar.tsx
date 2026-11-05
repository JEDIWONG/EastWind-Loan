import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
    LogoutRounded,
    ExpandMore,
    ExpandLess,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppRoutes, useRouteHelper } from "../utils/route-helper";
import ConfirmationModal from "./generic/modal/confirmation_modal";
import { logout } from "../auth/login";
import { getLenderEmployeeDetails } from "../api/userApi";

const LenderSidebar = () => {
    const [open, setOpen] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);
    const [loanManagementOpen, setLoanManagementOpen] = useState(true);

    const [lenderImgUrl, setLenderImgUrl] = useState<string | null>(null);
    const [lenderName, setLenderName] = useState<string | null>(null);
    const [employeeFirstname, setEmployeeFirstname] = useState<string | null>(null);
    const [employeeLastname, setEmployeeLastname] = useState<string | null>(null);

    const { navToHome } = useRouteHelper();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const fetchLenderEmployeeDetails = async () => {
        try {
            const response = await getLenderEmployeeDetails();
            const employee = response.data?.[0];

            if (response.success && employee) {
                setLenderImgUrl(employee.lender_img_url ?? null);
                setLenderName(employee.lender_name ?? null);
                setEmployeeFirstname(
                    employee.employee_f_name ??
                    employee.reviewer_f_name ??
                    null
                );
                setEmployeeLastname(
                    employee.employee_l_name ??
                    employee.reviewer_l_name ??
                    null
                );
            }
        } catch (error) {
            console.error("Failed to fetch lender employee details:", error);
        }
    };

    const confirmLogout = async () => {
        try {
            await logout();
            setOpenLogout(false);
            setOpen(false);
            navToHome();
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    useEffect(() => {
        fetchLenderEmployeeDetails();
    }, []);

    return (
        <>
            <IconButton
                aria-label="Open lender navigation"
                onClick={toggleDrawer(true)}
                sx={{ color: "#334155" ,alignSelf:"center"}}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                sx={{
                    zIndex:100
                }}
            >
                <div className="flex min-h-screen w-64 flex-col bg-slate-900 text-white">
                    <div className="border-b border-slate-700 p-4">
                        <div className="flex items-center gap-3">
                            {lenderImgUrl && (
                                <img
                                    src={lenderImgUrl}
                                    alt={lenderName ?? "Lender"}
                                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                                />
                            )}

                            <div className="min-w-0">
                                <p className="truncate font-semibold">
                                    {lenderName ?? "Lender"}
                                </p>
                                <p className="truncate text-sm text-slate-400">
                                    {employeeFirstname} {employeeLastname}
                                </p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2 p-4">
                        <Link
                            to={AppRoutes.lenderDashboard}
                            onClick={toggleDrawer(false)}
                            className="flex items-center rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            Dashboard
                        </Link>

                        <button
                            type="button"
                            onClick={() =>
                                setLoanManagementOpen((prev) => !prev)
                            }
                            className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <span>Loan Management</span>
                            {loanManagementOpen ? <ExpandLess /> : <ExpandMore />}
                        </button>

                        {loanManagementOpen && (
                            <div className="ml-3 space-y-1 border-l border-slate-700 pl-3">
                                <Link
                                    to={AppRoutes.loanApplicationDashboard}
                                    onClick={toggleDrawer(false)}
                                    className="flex items-center rounded-lg px-4 py-2.5 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                >
                                    Applications
                                </Link>

                                <Link
                                    to={AppRoutes.loanOfferDashboard}
                                    onClick={toggleDrawer(false)}
                                    className="flex items-center rounded-lg px-4 py-2.5 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                >
                                    Offers
                                </Link>

                                <Link
                                    to={AppRoutes.loanDisbursementDashboard}
                                    onClick={toggleDrawer(false)}
                                    className="flex items-center rounded-lg px-4 py-2.5 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                >
                                    Disbursements
                                </Link>

                                <Link
                                    to={AppRoutes.activeLoanDashboard}
                                    onClick={toggleDrawer(false)}
                                    className="flex items-center rounded-lg px-4 py-2.5 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                >
                                    Active Loans
                                </Link>
                            </div>
                        )}

                        <Link
                            to="/lender/product"
                            onClick={toggleDrawer(false)}
                            className="flex items-center rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            Loan Products
                        </Link>

                        <Link
                            to="/lender/profile"
                            onClick={toggleDrawer(false)}
                            className="flex items-center rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            Profile
                        </Link>
                    </nav>

                    <div className="mt-auto p-4">
                        <button
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                            onClick={() => setOpenLogout(true)}
                        >
                            <LogoutRounded />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </Drawer>

            {openLogout && (
                <ConfirmationModal
                    title="Are you sure you want to logout?"
                    confirmText="Logout"
                    cancelText="Cancel"
                    onConfirm={confirmLogout}
                    onCancel={() => setOpenLogout(false)}
                />
            )}
        </>
    );
};

export default LenderSidebar;