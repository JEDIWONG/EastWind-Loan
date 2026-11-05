import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import ConfirmationModal from "../modal/confirmation_modal";

const AppSidebar = ({
    open,
    onClose,
    imageUrl,
    name,
    subtitle,
    children,
    onLogout,
}: {
    open: boolean;
    onClose: () => void;
    imageUrl?: string | null;
    name: string | null;
    subtitle: string | null;
    children: React.ReactNode;
    onLogout: () => void;
}) => {
    const [openLogout, setOpenLogout] = useState(false);

    const confirmLogout = () => {
        onLogout();
        setOpenLogout(false);
    };

    return (
        <>
            <Drawer
                open={open}
                onClose={onClose}
                sx={{ zIndex: 998 }}
            >
                <div className="flex h-screen w-64 flex-col bg-slate-900 text-white">
                    <div className="flex items-center gap-5 border-b border-slate-700 p-4">
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt=""
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        )}

                        <div>
                            <p>{name}</p>
                            <p className="text-sm text-slate-400">
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2 p-4">
                        {children}
                    </nav>

                    <div className="mt-auto p-4">
                        <button
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition hover:cursor-pointer hover:bg-red-500/10 hover:text-red-300"
                            onClick={() => setOpenLogout(true)}
                        >
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

export default AppSidebar;