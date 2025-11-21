"use client";

import { useState } from "react";
import { Check, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
  className?: string;
}

export default function DataTable({
  columns,
  data,
  onCellEdit = () => {},
  className = "",
}: DataTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const handleColumnFilterChange = (columnKey: string, value: string) => {
    setColumnFilters((prev) => ({
      ...prev,
      [columnKey]: value,
    }));
  };

  const filteredData = data.filter((row) => {
    // Global search filter
    const matchesGlobalSearch = Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Column-specific filters
    const matchesColumnFilters = Object.entries(columnFilters).every(
      ([columnKey, filterValue]) => {
        if (!filterValue) return true;
        return String(row[columnKey])
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      }
    );

    return matchesGlobalSearch && matchesColumnFilters;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    const direction = sortDirection === "asc" ? 1 : -1;
    return aVal > bVal ? direction : -direction;
  });

  return (
    <div className={`overflow-auto bg-white border-2 border-gray-400 shadow-lg ${className}`}>
      <div className="sticky top-0 z-20 bg-white border-b-2 border-gray-400 p-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-500" />
          <Input
            placeholder="Filter table..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-6 pl-7 text-[10px] border-2 border-gray-400 bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>
      <table className="w-full text-[10px] border-collapse">
        <thead className="sticky top-[52px] bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 z-10 shadow-sm">
          <tr className="border-b-2 border-gray-400">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`p-1.5 text-left font-bold text-gray-800 border-r border-gray-400 cursor-pointer hover:bg-indigo-100 select-none ${
                  column.width || ""
                } ${sortColumn === column.key ? "bg-indigo-50" : ""}`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-1 uppercase tracking-wide text-[9px]">
                  {column.label}
                  {sortColumn === column.key && (
                    <span className="text-indigo-700 font-black text-[11px]">
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
          <tr className="border-b-2 border-gray-400 bg-gray-50">
            {columns.map((column) => (
              <th
                key={`filter-${column.key}`}
                className={`p-1 border-r border-gray-400 ${column.width || ""}`}
              >
                <Input
                  placeholder={`Filter ${column.label}...`}
                  value={columnFilters[column.key] || ""}
                  onChange={(e) => handleColumnFilterChange(column.key, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="h-5 text-[9px] border border-gray-300 bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-1.5"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr
              key={row.id}
              className={`border-b border-gray-300 ${
                idx % 2 === 0 ? "bg-white" : "bg-slate-50"
              } ${
                hoveredRow === row.id ? "bg-indigo-50" : ""
              }`}
              onMouseEnter={() => setHoveredRow(row.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {columns.map((column) => (
                <td key={column.key} className="p-1.5 border-r border-gray-300">
                  {column.key === "status" && row[column.key] === "confirmed" ? (
                    <Check className="h-3.5 w-3.5 text-green-600 font-bold" />
                  ) : (
                    <span className="truncate block text-gray-900 font-medium">
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