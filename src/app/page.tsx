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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

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
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    setModalMode("edit");
    setIsModalOpen(true);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
      <TopNavigation
        activeTab={activeTopTab}
        onTabChange={setActiveTopTab}
        onSearch={() => {}}
      />

      <ResizablePanelGroup direction="vertical" className="flex-1">
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="h-full p-2 flex flex-col">
            <div className="flex gap-1.5 mb-2 px-1">
              <Button
                size="sm"
                onClick={handleCreate}
                className="h-7 text-[10px] font-semibold bg-green-600 hover:bg-green-700 text-white border-2 border-green-700 shadow-md"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Create
              </Button>
              <Button
                size="sm"
                onClick={handleEdit}
                className="h-7 text-[10px] font-semibold bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-700 shadow-md"
              >
                <Edit className="h-3.5 w-3.5 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                className="h-7 text-[10px] font-semibold bg-red-600 hover:bg-red-700 text-white border-2 border-red-700 shadow-md"
              >
                <Ban className="h-3.5 w-3.5 mr-1" />
                Inactive
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <DataTable
                columns={portfolioColumns}
                data={portfolioData}
                className="h-full"
              />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle className="h-1.5 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 hover:from-indigo-400 hover:via-indigo-500 hover:to-indigo-400 border-y border-gray-600 shadow-md cursor-row-resize" />

        <ResizablePanel defaultSize={40} minSize={20}>
          <div className="h-full flex flex-col">
            <BottomTabs
              activeTab={activeBottomTab}
              onTabChange={setActiveBottomTab}
            />
            <div className="flex-1 p-2 overflow-hidden">
              <div className="h-full overflow-hidden">
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

      <PortfolioEditorModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        mode={modalMode}
      />
    </div>
  );
}