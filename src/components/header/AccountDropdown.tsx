import { AccountCircleRounded } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AppRoutes } from "../../utils/route-helper";
import { logout } from "../../auth/login";

const AccountDropdown = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isOpen = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout =()=>{
        logout(); 
        handleClose(); 
    }

    return (
    <>
        <div>
            <button
                className="flex cursor-pointer items-center gap-1 text-gray-700 transition hover:text-black hover:cursor-pointer"
                onClick={handleClick}
            >
                <AccountCircleRounded/>
                <p>Account</p>
            </button>

            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                disableScrollLock
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            minWidth: 220,
                            borderRadius: 3,
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                            p: 1,
                        },
                    },
                }}
            >
                <MenuItem
                    component={Link}
                    to={AppRoutes.profile}
                    onClick={handleClose}
                    sx={{
                        borderRadius: 2,
                        px: 2,
                        py: 1.5,
                        fontSize: 16,
                        "&:hover": {
                            backgroundColor: "#f3f4f6",
                        },
                    }}                    
                >
                    Profile
                </MenuItem>

                <MenuItem
                    component={Link}
                    to={AppRoutes.borrowerDashboard}
                    onClick={handleClose}
                    sx={{
                        borderRadius: 2,
                        px: 2,
                        py: 1.5,
                        fontSize: 16,
                        "&:hover": {
                            backgroundColor: "#f3f4f6",
                        },
                    }}                    
                >
                    My Loan
                </MenuItem>

                <MenuItem
                    component={Link}
                    to="/"
                    onClick={handleLogout}
                    sx={{
                        borderRadius: 2,
                        px: 2,
                        py: 1.5,
                        fontSize: 16,
                        "&:hover": {
                            backgroundColor: "#f3f4f6",
                        },
                    }}                    
                >
                    Log Out
                </MenuItem>
            </Menu>
        </div>
    </>
    );
};

export default AccountDropdown;