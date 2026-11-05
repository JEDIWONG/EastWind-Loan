import { Link } from "react-router-dom";

interface SidebarNavItemProps {
    label: string;
    to: string;
}

const SidebarNavItem = ({
    label,
    to,
}: SidebarNavItemProps) => {
    return (
        <Link
            to={to}
            className="flex items-center rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
            <span>{label}</span>
        </Link>
    );
};

export default SidebarNavItem;