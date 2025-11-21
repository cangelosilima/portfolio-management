"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BottomTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function BottomTabs({
  activeTab = "tradedesk",
  onTabChange = () => {},
}: BottomTabsProps) {
  return (
    <div className="border-t border-b border-gray-300 bg-gradient-to-b from-gray-50 to-white px-2 py-1.5 shadow-sm">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="h-7 bg-transparent border-0 p-0 space-x-0.5">
          <TabsTrigger
            value="tradedesk"
            className="text-xs px-4 py-1 rounded-sm data-[state=active]:bg-purple-200 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50 transition-all"
          >
            Trade Desk
          </TabsTrigger>
          <TabsTrigger
            value="cashiers"
            className="text-xs px-4 py-1 rounded-sm data-[state=active]:bg-purple-200 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50 transition-all"
          >
            Cashiers
          </TabsTrigger>
          <TabsTrigger
            value="subcashiers"
            className="text-xs px-4 py-1 rounded-sm data-[state=active]:bg-purple-200 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50 transition-all"
          >
            SubCashiers
          </TabsTrigger>
          <TabsTrigger
            value="bookstore"
            className="text-xs px-4 py-1 rounded-sm data-[state=active]:bg-purple-200 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50 transition-all"
          >
            Book Store
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}