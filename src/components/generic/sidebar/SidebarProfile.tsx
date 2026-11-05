interface SidebarProfileProps {
    imageUrl: string | null;
    name: string | null;
    subtitle: string | null;
}

const SidebarProfile = ({
    imageUrl,
    name,
    subtitle,
}: SidebarProfileProps) => {
    return (
        <div className="flex items-center gap-3 border-b border-slate-700 p-4">
            <img
                src={imageUrl ?? ""}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
            />

            <div>
                <p>{name}</p>
                <p className="text-sm text-slate-400">
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

export default SidebarProfile;