"use client";

import { useState } from "react";
import TopNavigation from "@/components/trading/top-navigation";
import BottomTabs from "@/components/trading/bottom-tabs";
import DataTable, { TableColumn } from "@/components/trading/data-table";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  portfolioData,
  tradeDeskData,
  cashiersData,
  subCashiersData,
  bookStoreData,
} from "@/lib/mock-data";

const portfolioColumns: TableColumn[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "tradeDesk", label: "Trade Desk", sortable: true },
  { key: "cashiers", label: "Cashiers", sortable: true },
  { key: "subCashiers", label: "SubCashiers", sortable: true },
  { key: "alias", label: "Alias", sortable: true },
  { key: "dataflow", label: "Dataflow", sortable: true },
  { key: "realPC", label: "Real-PC", sortable: true },
  { key: "bookStore", label: "Book Store", sortable: true },
  { key: "bookBS", label: "Book BS", sortable: true },
];

const tradeDeskColumns: TableColumn[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "description", label: "Description", sortable: true },
  { key: "account", label: "Account", sortable: true },
  { key: "alias", label: "Alias", sortable: true },
  { key: "code", label: "Code", sortable: true },
  { key: "description2", label: "Description", sortable: true },
  { key: "date", label: "Date", sortable: true },
  { key: "description3", label: "Description", sortable: true },
];

const cashiersColumns: TableColumn[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "description", label: "Description", sortable: true },
  { key: "account", label: "Account", sortable: true },
  { key: "alias", label: "Alias", sortable: true },
  { key: "code", label: "Code", sortable: true },
  { key: "description2", label: "Description", sortable: true },
  { key: "date", label: "Date", sortable: true },
  { key: "description3", label: "Description", sortable: true },
];

export default function Page() {
  const [activeTopTab, setActiveTopTab] = useState("portfolio");
  const [activeBottomTab, setActiveBottomTab] = useState("tradedesk");
  const [searchQuery, setSearchQuery] = useState("");

  const filterData = (data: any[]) => {
    if (!searchQuery) return data;
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const getBottomPanelData = () => {
    switch (activeBottomTab) {
      case "tradedesk":
        return { columns: tradeDeskColumns, data: filterData(tradeDeskData) };
      case "cashiers":
        return { columns: cashiersColumns, data: filterData(cashiersData) };
      case "subcashiers":
        return { columns: cashiersColumns, data: filterData(subCashiersData) };
      case "bookstore":
        return { columns: cashiersColumns, data: filterData(bookStoreData) };
      default:
        return { columns: tradeDeskColumns, data: filterData(tradeDeskData) };
    }
  };

  const bottomPanelData = getBottomPanelData();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50">
      <TopNavigation
        activeTab={activeTopTab}
        onTabChange={setActiveTopTab}
        onSearch={setSearchQuery}
      />

      <ResizablePanelGroup direction="vertical" className="flex-1">
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="h-full p-3">
            <div className="h-full rounded-sm overflow-hidden shadow-md">
              <DataTable
                columns={portfolioColumns}
                data={filterData(portfolioData)}
                className="h-full"
              />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle className="h-1 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200 hover:from-purple-300 hover:via-purple-400 hover:to-purple-300 transition-all" />

        <ResizablePanel defaultSize={40} minSize={20}>
          <div className="h-full flex flex-col">
            <BottomTabs
              activeTab={activeBottomTab}
              onTabChange={setActiveBottomTab}
            />
            <div className="flex-1 p-3 overflow-hidden">
              <div className="h-full rounded-sm overflow-hidden shadow-md">
                <DataTable
                  columns={bottomPanelData.columns}
                  data={bottomPanelData.data}
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}