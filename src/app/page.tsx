"use client";

import { useState } from "react";
import TopNavigation from "@/components/trading/top-navigation";
import BottomTabs from "@/components/trading/bottom-tabs";
import DataTable, { TableColumn } from "@/components/trading/data-table";
import PortfolioEditorModal from "@/components/trading/portfolio-editor-modal";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Ban } from "lucide-react";
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
  { key: "name", label: "Name", sortable: true, width: "w-32" },
  { key: "tradeDesk", label: "Trade Desk", sortable: true, width: "w-40" },
  { key: "cashiers", label: "Cashiers", sortable: true, width: "w-32" },
  { key: "alias", label: "Alias", sortable: true, width: "w-24" },
  { key: "dataflow", label: "Dataflow", sortable: true, width: "w-32" },
  { key: "realPC", label: "Real-PC", sortable: true, width: "w-28" },
  { key: "bookStore", label: "Book Store", sortable: true, width: "w-40" },
  { key: "bookBS", label: "Book BS", sortable: true, width: "w-32" },
  { key: "status", label: "Status", sortable: false, width: "w-20" },
];

const tradeDeskColumns: TableColumn[] = [
  { key: "id", label: "ID", sortable: true, width: "w-20" },
  { key: "desk", label: "Desk", sortable: true, width: "w-40" },
  { key: "trader", label: "Trader", sortable: true, width: "w-32" },
  { key: "position", label: "Position", sortable: true, width: "w-28" },
  { key: "pnl", label: "P&L", sortable: true, width: "w-28" },
];

const cashiersColumns: TableColumn[] = [
  { key: "account", label: "Account", sortable: true, width: "w-32" },
  { key: "description", label: "Description", sortable: true, width: "w-48" },
  { key: "balance", label: "Balance", sortable: true, width: "w-32" },
  { key: "currency", label: "Currency", sortable: true, width: "w-24" },
];

export default function Page() {
  const [activeTopTab, setActiveTopTab] = useState("portfolio");
  const [activeBottomTab, setActiveBottomTab] = useState("tradedesk");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const getBottomPanelData = () => {
    switch (activeBottomTab) {
      case "tradedesk":
        return { columns: tradeDeskColumns, data: tradeDeskData };
      case "cashiers":
        return { columns: cashiersColumns, data: cashiersData };
      case "subcashiers":
        return { columns: cashiersColumns, data: subCashiersData };
      case "bookstore":
        return { columns: cashiersColumns, data: bookStoreData };
      default:
        return { columns: tradeDeskColumns, data: tradeDeskData };
    }
  };

  const bottomPanelData = getBottomPanelData();

  const handleCreate = () => {
    setModalMode("create");
    setSelectedRowId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (rowId?: string) => {
    setModalMode("edit");
    if (rowId) {
      setSelectedRowId(rowId);
    }
    setIsModalOpen(true);
  };

  const handleInactivate = (rowId: string) => {
    console.log("Inactivate row:", rowId);
    // Add your inactivate logic here
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <TopNavigation
        activeTab={activeTopTab}
        onTabChange={setActiveTopTab}
        onSearch={() => {}}
      />

      <ResizablePanelGroup direction="vertical" className="flex-1">
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="h-full flex flex-col bg-gray-50">
            <div className="flex gap-2 p-3 bg-white border-b border-gray-200">
              <Button
                size="sm"
                onClick={handleCreate}
                className="h-8 px-4 text-xs font-semibold bg-green-600 hover:bg-green-700 text-white shadow-sm"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Create
              </Button>
              <Button
                size="sm"
                onClick={() => handleEdit()}
                className="h-8 px-4 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              >
                <Edit className="h-4 w-4 mr-1.5" />
                Edit
              </Button>
              <Button
                size="sm"
                className="h-8 px-4 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-sm"
              >
                <Ban className="h-4 w-4 mr-1.5" />
                Inactive
              </Button>
            </div>
            <div className="flex-1 overflow-hidden p-3">
              <DataTable
                columns={portfolioColumns}
                data={portfolioData}
                onEdit={handleEdit}
                onInactivate={handleInactivate}
                className="h-full rounded-lg shadow-sm"
              />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle className="h-1 bg-gray-300 hover:bg-blue-400 transition-colors" />

        <ResizablePanel defaultSize={40} minSize={20}>
          <div className="h-full flex flex-col bg-gray-50">
            <BottomTabs
              activeTab={activeBottomTab}
              onTabChange={setActiveBottomTab}
            />
            <div className="flex-1 overflow-hidden p-3">
              <DataTable
                columns={bottomPanelData.columns}
                data={bottomPanelData.data}
                onEdit={handleEdit}
                onInactivate={handleInactivate}
                className="h-full rounded-lg shadow-sm"
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <PortfolioEditorModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        mode={modalMode}
      />
    </div>
  );
}