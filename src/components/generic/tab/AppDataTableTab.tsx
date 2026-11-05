import {
    Box,
    InputAdornment,
    Paper,
    Tab,
    Tabs,
    TextField,
} from "@mui/material";

import { useEffect, useState } from "react";
import AppDataTable, { type AppTableColumn } from "../table/AppDataTable";
import { Search } from "@mui/icons-material";

export interface AppTableTab<TFilter> {
    label: string;
    value?: TFilter;
}

interface AppDataTableTabsProps<TData, TFilter> {
    tabs?: AppTableTab<TFilter>[];
    data: TData[];
    columns: AppTableColumn<TData>[];
    loading?: boolean;
    onTabChange?: (value: TFilter) => void;
    onRowClick?: (data: TData) => void;
    emptyMessage?: string;
    searchable?: boolean;
    searchPlaceholder?: string;

    selectable?: boolean;
    selectedRows?: TData[];
    onSelectionChange?: (rows: TData[]) => void;
    getRowId?: (data: TData) => string | number;
}

const AppDataTableTabs = <TData, TFilter>({
    tabs=null,
    data,
    columns,
    loading = false,
    onTabChange,
    onRowClick,
    emptyMessage = "No data found.",
    searchable,
    searchPlaceholder, 
    selectable = false,
    selectedRows = [],
    onSelectionChange,
    getRowId,
}: AppDataTableTabsProps<TData, TFilter>) => {

    const [activeTab, setActiveTab] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (tabs&&tabs.length > 0) {
            onTabChange?.(tabs[0].value);
        }
    }, []);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        onTabChange?.(tabs[newValue].value);
    };

    return (

        <>
            <Paper
                elevation={0}
                sx={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >
                {searchable && (
                    <Box
                        sx={{
                            px: 3,
                            py: 2,
                            backgroundColor: "#f8fafc",
                            borderBottom: "1px solid #e5e7eb",
                            display: "flex", 
                            justifyContent: "flex-end",
                        }}
                    >
                        <TextField
                            size="small"
                            variant="outlined"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            placeholder={searchPlaceholder}
                            sx={{
                                width: 400,
                                backgroundColor: "white",
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Box>
                )}

                <Box
                    sx={{
                        backgroundColor: "white",
                    }}
                >
                    {tabs&&
                        <Box
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                                px: 2,
                            }}
                        >
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                            >
                                {tabs.map((tab) => (
                                    <Tab
                                        key={String(tab.value)}
                                        label={tab.label}
                                    />
                                ))}
                            </Tabs>
                        </Box>
                    }

                    <AppDataTable
                        data={data}
                        columns={columns}
                        onRowClick={onRowClick}
                        emptyMessage={
                            loading
                                ? "Loading..."
                                : emptyMessage
                        }
                        search={search}
                        selectable={selectable}
                        selectedRows={selectedRows}
                        onSelectionChange={onSelectionChange}
                        getRowId={getRowId}
                    />
                </Box>
            </Paper>
        </>
    );
};

export default AppDataTableTabs;