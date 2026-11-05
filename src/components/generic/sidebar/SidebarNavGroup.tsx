import { useState } from "react";
import {
    ExpandMore,
    ExpandLess,
} from "@mui/icons-material";
import SidebarNavItem from "./SidebarNavItem";

interface SidebarNavGroupItem {
    label: string;
    to: string;
}

interface SidebarNavGroupProps {
    label: string;
    items: SidebarNavGroupItem[];
    defaultOpen?: boolean;
}

const SidebarNavGroup = ({
    label,
    items,
    defaultOpen = true,
}: SidebarNavGroupProps) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
                <span>{label}</span>

                {open ? <ExpandLess /> : <ExpandMore />}
            </button>

            {open && (
                <div className="ml-3 space-y-1 border-l border-slate-700 pl-3">
                    {items.map((item) => (
                        <SidebarNavItem
                            key={item.to}
                            label={item.label}
                            to={item.to}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SidebarNavGroup;