import { logout } from "../../../auth/login";
import { getUserSession } from "../../../auth/session";
import { AppRoutes, useRouteHelper } from "../../../utils/route-helper";
import AppSidebar from "./AppSidebar";
import SidebarNavItem from "./SidebarNavItem";

const BorrowerSidebar = () => {
    const userSessionData = getUserSession();

    const { navToHome } = useRouteHelper();

    const confirmLogout = () => {
        logout();
        navToHome();
    };

    return (
        <AppSidebar
            name={"Exp"}
            subtitle="Email"
            onLogout={confirmLogout}
            open={true}
            onClose={() => {}}
        >
            <SidebarNavItem
                label="My Loans"
                to={"/borrower/my-loans"}
            />

            <SidebarNavItem
                label="Find a Loan"
                to={AppRoutes.findLoan}
            />

            <SidebarNavItem
                label="Profile"
                to="/borrower/profile"
            />
        </AppSidebar>
    );
};

export default BorrowerSidebar;