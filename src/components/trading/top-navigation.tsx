"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TopNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onSearch?: (query: string) => void;
}

export default function TopNavigation({
  activeTab = "portfolio",
  onTabChange = () => {},
  onSearch = () => {},
}: TopNavigationProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 bg-gradient-to-b from-white to-gray-50 px-4 py-2 shadow-sm">
      <Tabs value={activeTab} onValueChange={onTabChange} className="flex-1">
        <TabsList className="h-8 bg-transparent border-0 p-0 space-x-0.5">
          <TabsTrigger
            value="portfolio"
            className="text-xs px-4 py-1.5 rounded-sm data-[state=active]:bg-purple-200 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50 transition-all"
          >
            Portfolio
          </TabsTrigger>
          <TabsTrigger
            value="tradedesk"
            className="text-xs px-4 py-1.5 rounded-sm data-[state=active]:bg-purple-200 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50 transition-all"
          >
            Trade Desk
          </TabsTrigger>
          <TabsTrigger
            value="cashiers"
            className="text-xs px-4 py-1.5 rounded-sm data-[state=active]:bg-purple-200 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50 transition-all"
          >
            Cashiers
          </TabsTrigger>
          <TabsTrigger
            value="subcashiers"
            className="text-xs px-4 py-1.5 rounded-sm data-[state=active]:bg-purple-200 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50 transition-all"
          >
            SubCashiers
          </TabsTrigger>
          <TabsTrigger
            value="alias"
            className="text-xs px-4 py-1.5 rounded-sm data-[state=active]:bg-purple-200 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50 transition-all"
          >
            Alias
          </TabsTrigger>
          <TabsTrigger
            value="dataflow"
            className="text-xs px-4 py-1.5 rounded-sm data-[state=active]:bg-purple-200 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50 transition-all"
          >
            Dataflow
          </TabsTrigger>
          <TabsTrigger
            value="realpc"
            className="text-xs px-4 py-1.5 rounded-sm data-[state=active]:bg-purple-200 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50 transition-all"
          >
            Real-PC
          </TabsTrigger>
          <TabsTrigger
            value="bookstore"
            className="text-xs px-4 py-1.5 rounded-sm data-[state=active]:bg-purple-200 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50 transition-all"
          >
            Book Store
          </TabsTrigger>
          <TabsTrigger
            value="bookbs"
            className="text-xs px-4 py-1.5 rounded-sm data-[state=active]:bg-purple-200 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm hover:bg-purple-50 transition-all"
          >
            Book BS
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="relative w-64">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
        <Input
          placeholder="Search..."
          className="h-7 pl-8 text-xs border-gray-300 bg-white focus:border-purple-400 focus:ring-purple-400"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}