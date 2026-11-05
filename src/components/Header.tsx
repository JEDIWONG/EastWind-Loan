import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import AccountDropdown from "./header/AccountDropdown";
import { isUserLoggedIn, getUserTypeId } from "../auth/session";
import { AppRoutes } from "../utils/route-helper";
import LenderSidebar from "./LenderSideBar";

const Header = () => {
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(() => isUserLoggedIn());
    const [userTypeId, setUserTypeId] = useState<number | null>(() => {
        const id = getUserTypeId();
        return id == null ? null : Number(id);
    });

    useEffect(() => {
        const loggedIn = isUserLoggedIn();
        const id = getUserTypeId();

        setIsLoggedIn(loggedIn);
        setUserTypeId(loggedIn && id != null ? Number(id) : null);
    }, [location.pathname]);

    const isLender = isLoggedIn && userTypeId === 3;

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
            <div className="mx-auto flex min-h-20 items-center justify-between gap-4 px-5 sm:px-8">
                <div className="flex items-center gap-3">
                    {isLender && <LenderSidebar />}

                    <Link to="/" >
                        <img
                          src={logo}
                          alt="EastWind Loan"
                          className="h-5 w-auto object-contain"
                        />
                    </Link>
                </div>

                {!isLender && (
                    <nav
                        aria-label="Main navigation"
                        className="flex flex-wrap items-center justify-end gap-4 sm:gap-6"
                    >
                        <Link
                            to="/find-loan/"
                            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
                        >
                            Explore
                        </Link>

                        <Link
                            to={AppRoutes.compare}
                            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
                        >
                            Calculator
                        </Link>

                        {isLoggedIn ? (
                            <AccountDropdown />
                        ) : (
                            <>
                                <Link
                                    to="/auth/login"
                                    className="text-sm font-medium text-gray-700 transition hover:text-gray-950"
                                >
                                    Sign In
                                </Link>

                                <Link
                                    to="/find-loan/"
                                    className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-yellow-500"
                                >
                                    Apply Now
                                </Link>
                            </>
                        )}
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;