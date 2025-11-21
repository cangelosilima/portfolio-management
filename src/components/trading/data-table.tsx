"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
}

export interface TableRow {
  id: string;
  [key: string]: any;
}

interface DataTableProps {
  columns: TableColumn[];
  data: TableRow[];
  onCellEdit?: (rowId: string, columnKey: string, value: any) => void;
  onEdit?: (rowId: string) => void;
  onInactivate?: (rowId: string) => void;
  className?: string;
}

export default function DataTable({
  columns,
  data,
  onCellEdit = () => {},
  onEdit = () => {},
  onInactivate = () => {},
  className = "",
}: DataTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    const direction = sortDirection === "asc" ? 1 : -1;
    return aVal > bVal ? direction : -direction;
  });

  return (
    <div className={`overflow-auto bg-white border border-gray-200 rounded-lg ${className}`}>
      <table className="w-full text-xs border-collapse">
        <thead className="sticky top-0 bg-gray-50 z-10">
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`p-3 text-left font-semibold text-gray-700 border-r border-gray-200 last:border-r-0 cursor-pointer hover:bg-gray-100 select-none ${
                  column.width || ""
                } ${sortColumn === column.key ? "bg-blue-50" : ""}`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2 uppercase tracking-wide text-[10px]">
                  {column.label}
                  {sortColumn === column.key && (
                    <span className="text-blue-600 font-bold">
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <ContextMenu key={row.id}>
              <ContextMenuTrigger asChild>
                <tr
                  className={`border-b border-gray-100 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } ${
                    hoveredRow === row.id ? "bg-blue-50" : ""
                  } hover:bg-blue-50 transition-colors cursor-context-menu`}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="p-3 border-r border-gray-100 last:border-r-0">
                      {column.key === "status" && row[column.key] === "confirmed" ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <span className="truncate block text-gray-900">
                          {row[column.key]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-48">
                <ContextMenuItem
                  onClick={() => onEdit(row.id)}
                  className="cursor-pointer"
                >
                  Edit
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => onInactivate(row.id)}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  Inactivate
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </tbody>
      </table>
    </div>
  );
}