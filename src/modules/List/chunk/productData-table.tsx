"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { ArrowUpDown } from "lucide-react";

interface ProductDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    loading?: boolean;
}

export function ProductDataTable<TData, TValue>({
    columns,
    data,
    loading,
}: ProductDataTableProps<TData, TValue>) {
    const [filter, setFilter] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter: filter, sorting },
        onGlobalFilterChange: setFilter,
        onSortingChange: setSorting,
        enableRowSelection: true,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (loading) return <p>Loading...</p>;

    return (
        <Card className="w-full shadow-md pt-3">
            <CardContent>


                <div className="text-sm">

                    <div className="flex border-b">
                        {table.getHeaderGroups()[0].headers.map((header, index) => {
                            let className = "px-4 py-2";

                            switch (index) {
                                case 0:
                                    className += " w-12";
                                    break;
                                case 9:
                                    className += " flex-[2]";
                                    break;
                                default:
                                    className += " flex-[1]";
                            }


                            return (
                                <div key={header.id} className={className}>
                                    <div
                                        className={
                                            index === 1 && header.column.getCanSort()
                                                ? "flex items-center cursor-pointer select-none"
                                                : ""
                                        }
                                        onClick={index === 1 ? header.column.getToggleSortingHandler() : undefined}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {index === 1 && header.column.getCanSort() && (
                                            <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground text-red-500" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>


                    <div>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => {
                                const isSelected = row.getIsSelected();

                                return (
                                    <div
                                        key={row.id}
                                        className={`flex items-center transition-colors my-1 px-0 ${isSelected
                                            ? "bg-red-100 border-2 border-red-500 rounded-xl"
                                            : "hover:bg-red-100"
                                            }`}
                                    >
                                        {row.getVisibleCells().map((cell, index) => {
                                            let className = "px-4 py-2";

                                            switch (index) {
                                                case 0:
                                                    className += " w-12";
                                                    break;
                                                case 9:
                                                    className += " flex-[2]";
                                                    break;
                                                default:
                                                    className += " flex-[1]";
                                            }

                                            return (
                                                <div key={cell.id} className={className}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-6 w-full">No results.</div>
                        )}
                    </div>
                </div>


            </CardContent>


            <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
