"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/api/products/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreVertical } from "lucide-react";
import { useProductActions } from "@/modules/List/chunk/productAction";

export const getProductColumns = (refresh?: () => void): ColumnDef<Product>[] => {
  const { edit, remove } = useProductActions();

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
    },
    { accessorKey: "index", header: "ลำดับ" },
    { accessorKey: "soldTo", header: "Sold-to" },
    { accessorKey: "shipPO", header: "Ship-PO" },
    { accessorKey: "poNo", header: "PO no." },
    { accessorKey: "delDate", header: "Del. date" },
    { accessorKey: "matCode", header: "mat code" },
    { accessorKey: "qty", header: "q’ty", cell: ({ row }) => <div >{row.getValue("qty")}</div> },
    { accessorKey: "uploadTime", header: "เวลาอัปโหลด" },

    {
      accessorKey: "ocrStatus",
      header: () => <div className="text-center">สถานะ OCR</div>,
      cell: ({ row }) => {
        const status = row.getValue("ocrStatus") as string;
        return (
          <Button
            variant="outline"
            size="sm"
            className="w-full border bg-yellow-100 border-yellow-500 rounded-xl text-xs hover:bg-yellow-200"
          >
            {status}
          </Button>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => edit(row.original)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => remove(row.original, refresh)} className="text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
};
