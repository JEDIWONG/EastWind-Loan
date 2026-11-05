import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import { useMemo, useState } from "react";

export interface AppTableColumn<T> {
    label: string;
    render: (data: T) => React.ReactNode;
    sortable?: boolean;
    sortValue?: (data: T) => string | number;
    searchable?: boolean;
    searchValue?: (data: T) => string;
}

interface AppDataTableProps<T> {
    data: T[];
    columns: AppTableColumn<T>[];
    onRowClick?: (data: T) => void;
    emptyMessage?: string;
    rowsPerPageOptions?: number[];
    search?: string;
    onSearchChange?: (value: string) => void;

    selectable?: boolean;
    selectedRows?: T[];
    onSelectionChange?: (rows: T[]) => void;
    getRowId?: (data: T) => string | number;
}

const AppDataTable = <T,>({
    data,
    columns,
    onRowClick,
    emptyMessage = "No data found.",
    rowsPerPageOptions = [5, 10, 25],
    search,
    selectable = false,
    selectedRows = [],
    onSelectionChange,
    getRowId,
}: AppDataTableProps<T>) => {

    const searchValue = search ?? "";
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const getId = (item: T, index?: number) => {
        return getRowId
            ? getRowId(item)
            : index ?? 0;
    };

    const isSelected = (item: T) => {
        const id = getRowId
            ? getRowId(item)
            : item;

        return selectedRows.some((row) => {
            const rowId = getRowId
                ? getRowId(row)
                : row;

            return rowId === id || (!getRowId && row === item);
        });
    };

    const handleSelect = (item: T) => {
        if (!onSelectionChange) {
            return;
        }

        if (isSelected(item)) {
            onSelectionChange(
                selectedRows.filter((row) => {
                    if (getRowId) {
                        return getRowId(row) !== getRowId(item);
                    }

                    return row !== item;
                })
            );
        } else {
            onSelectionChange([...selectedRows, item]);
        }
    };

    const handleSelectAll = () => {
        if (!onSelectionChange) {
            return;
        }

        const allSelected = paginatedData.every((item) =>
            isSelected(item)
        );

        if (allSelected) {
            const pageIds = new Set(
                paginatedData.map((item) =>
                    getRowId ? getRowId(item) : item
                )
            );

            onSelectionChange(
                selectedRows.filter((row) => {
                    const id = getRowId
                        ? getRowId(row)
                        : row;

                    return !pageIds.has(id);
                })
            );
        } else {
            const newRows = [...selectedRows];

            paginatedData.forEach((item) => {
                if (!isSelected(item)) {
                    newRows.push(item);
                }
            });

            onSelectionChange(newRows);
        }
    };

    const handleSort = (column: AppTableColumn<T>) => {
        if (!column.sortable) {
            return;
        }

        if (sortColumn === column.label) {
            setSortDirection((prev) =>
                prev === "asc" ? "desc" : "asc"
            );
        } else {
            setSortColumn(column.label);
            setSortDirection("asc");
        }

        setPage(0);
    };

    const filteredData = useMemo(() => {
        if (!searchValue.trim()) {
            return data;
        }

        const keyword = searchValue.toLowerCase().trim();

        const searchableColumns = columns.filter(
            (column) => column.searchable && column.searchValue
        );

        return data.filter((item) =>
            searchableColumns.some((column) =>
                column
                    .searchValue!(item)
                    .toLowerCase()
                    .includes(keyword)
            )
        );
    }, [data, columns, searchValue]);

    const sortedData = useMemo(() => {
        if (!sortColumn) {
            return filteredData;
        }

        const column = columns.find(
            (column) => column.label === sortColumn
        );

        if (!column?.sortValue) {
            return filteredData;
        }

        return [...filteredData].sort((a, b) => {
            const valueA = column.sortValue!(a);
            const valueB = column.sortValue!(b);

            if (valueA < valueB) {
                return sortDirection === "asc" ? -1 : 1;
            }

            if (valueA > valueB) {
                return sortDirection === "asc" ? 1 : -1;
            }

            return 0;
        });
    }, [filteredData, columns, sortColumn, sortDirection]);

    const paginatedData = sortedData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const allSelected =
        paginatedData.length > 0 &&
        paginatedData.every((item) => isSelected(item));

    const someSelected =
        paginatedData.some((item) => isSelected(item));

    const handlePageChange = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer sx={{ minHeight: 500 }}>
                <Table sx={{tableLayout:"fixed", width:"100%"}}>
                    <TableHead>
                        <TableRow>
                            {selectable && (
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={allSelected}
                                        indeterminate={
                                            someSelected && !allSelected
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                            )}

                            {columns.map((column) => (
                                <TableCell 
                                    key={column.label}
                                    sx={{
                                        whiteSpace:"nowrap",
                                        width:"100%",
                                    }}
                                >
                                    {column.sortable ? (
                                        <TableSortLabel
                                            active={
                                                sortColumn === column.label
                                            }
                                            direction={
                                                sortColumn === column.label
                                                    ? sortDirection
                                                    : "asc"
                                            }
                                            onClick={() =>
                                                handleSort(column)
                                            }
                                        >
                                            <strong>
                                                {column.label}
                                            </strong>
                                        </TableSortLabel>
                                    ) : (
                                        <strong>{column.label}</strong>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        columns.length + (selectable ? 1 : 0)
                                    }
                                    align="center"
                                    sx={{ height: 400}}
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((item, index) => (
                                <TableRow
                                    key={String(getId(item, index))}
                                    hover
                                    onClick={() =>
                                        onRowClick?.(item)
                                    }
                                    sx={{
                                        cursor: onRowClick? "pointer": "default",
                                    }}
                                >
                                    {selectable && (
                                        <TableCell
                                            padding="checkbox"
                                            onClick={(e) =>
                                                e.stopPropagation()
                                            }
                                        >
                                            <Checkbox
                                                checked={isSelected(item)}
                                                onChange={() =>
                                                    handleSelect(item)
                                                }
                                            />
                                        </TableCell>
                                    )}

                                    {columns.map((column) => (
                                        <TableCell key={column.label}
                                            sx={{
                                                whiteSpace:"nowrap",
                                                overflow:"hidden",
                                                textOverflow:"ellipsis",
                                                width:"100%"
                                            }}
                                        >
                                            {column.render(item)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={sortedData.length}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageOptions={rowsPerPageOptions}
            />
        </>
    );
};

export default AppDataTable;