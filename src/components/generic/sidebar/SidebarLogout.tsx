import { LogoutRounded } from "@mui/icons-material";

interface SidebarLogoutProps {
    onClick: () => void;
}

const SidebarLogout = ({
    onClick,
}: SidebarLogoutProps) => {
    return (
        <div className="mt-auto p-4">
            <button
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition hover:cursor-pointer hover:bg-red-500/10 hover:text-red-300"
                onClick={onClick}
            >
                <LogoutRounded />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default SidebarLogout;