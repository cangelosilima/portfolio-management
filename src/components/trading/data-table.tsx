"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";

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
  onRowSelect?: (selectedIds: string[]) => void;
  onCellEdit?: (rowId: string, columnKey: string, value: any) => void;
  className?: string;
}

export default function DataTable({
  columns,
  data,
  onRowSelect = () => {},
  onCellEdit = () => {},
  className = "",
}: DataTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(data.map((row) => row.id));
      setSelectedRows(allIds);
      onRowSelect(Array.from(allIds));
    } else {
      setSelectedRows(new Set());
      onRowSelect([]);
    }
  };

  const handleSelectRow = (rowId: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }
    setSelectedRows(newSelected);
    onRowSelect(Array.from(newSelected));
  };

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
    <div className={`overflow-auto bg-white border border-gray-300 shadow-sm ${className}`}>
      <table className="w-full text-[10px] border-collapse">
        <thead className="sticky top-0 bg-gradient-to-b from-gray-100 to-gray-50 border-b border-gray-300 z-10">
          <tr>
            <th className="w-8 p-1.5 border-r border-gray-300">
              <Checkbox
                checked={selectedRows.size === data.length && data.length > 0}
                onCheckedChange={handleSelectAll}
                className="h-3 w-3"
              />
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`p-1.5 text-left font-semibold text-gray-700 border-r border-gray-300 cursor-pointer hover:bg-purple-50 transition-colors ${
                  column.width || ""
                } ${sortColumn === column.key ? "bg-purple-50" : ""}`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-1">
                  {column.label}
                  {sortColumn === column.key && (
                    <span className="text-purple-600 font-bold">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr
              key={row.id}
              className={`border-b border-gray-200 transition-colors ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } ${selectedRows.has(row.id) ? "bg-purple-100" : ""} ${
                hoveredRow === row.id ? "bg-purple-50" : ""
              }`}
              onMouseEnter={() => setHoveredRow(row.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td className="w-8 p-1.5 border-r border-gray-200">
                <Checkbox
                  checked={selectedRows.has(row.id)}
                  onCheckedChange={(checked) =>
                    handleSelectRow(row.id, checked as boolean)
                  }
                  className="h-3 w-3"
                />
              </td>
              {columns.map((column) => (
                <td key={column.key} className="p-1.5 border-r border-gray-200">
                  {column.key === "status" && row[column.key] === "confirmed" ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <span className="truncate block text-gray-800">
                      {row[column.key]}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}