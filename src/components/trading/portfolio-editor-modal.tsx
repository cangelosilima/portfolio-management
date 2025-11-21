"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight } from "lucide-react";

interface PortfolioEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
}

export default function PortfolioEditorModal({
  open,
  onOpenChange,
  mode,
}: PortfolioEditorModalProps) {
  const [name, setName] = useState("Geg");
  const [tradeDesk, setTradeDesk] = useState("EQUITY DERIVATIVES");
  const [cantera, setCantera] = useState("COE");
  const [subcateira, setSubcateira] = useState("FLP");
  const [ativo, setAtivo] = useState(true);
  const [bookBSEqualsBookPC, setBookBSEqualsBookPC] = useState(false);
  const [dualBook, setDualBook] = useState(false);

  // Book PC state
  const [bookPC, setBookPC] = useState("AF84B10");
  const [companyIdPC, setCompanyIdPC] = useState("001");

  // Book BS state
  const [bookBS, setBookBS] = useState("AF84B10");
  const [companyIdBS, setCompanyIdBS] = useState("001");

  // Book Store state
  const [bookStore, setBookStore] = useState("031500001132DFLT09");
  const [companyStore, setCompanyStore] = useState("001");

  const bookPCData = [
    { book: "071JOB10", description: "EQ DER STRUCTURED", category: "Trading", atomCode: "B10_071JOB10", companyId: "001" },
    { book: "071JOB10", description: "EQ DER STRUCTURED", category: "Trading", atomCode: "B10_071JOB10", companyId: "002" },
    { book: "071JOB10", description: "EQ DER STRUCTURED", category: "Trading", atomCode: "B10_071JOB10", companyId: "003" },
    { book: "071JOB10", description: "EQ DER STRUCTURED", category: "Trading", atomCode: "B10_071JOB10", companyId: "019" },
  ];

  const bookBSData = [
    { book: "071JOB10", description: "EQ DER ST...", category: "Trading", atomCode: "B10_071JOB10", idEmp: "001" },
    { book: "071JOB10", description: "EQ DER ST...", category: "Trading", atomCode: "B10_071JOB10", idEmp: "002" },
    { book: "071JOB10", description: "EQ DER ST...", category: "Trading", atomCode: "B10_071JOB10", idEmp: "003" },
    { book: "071JOB10", description: "EQ DER ST...", category: "Trading", atomCode: "B10_071JOB10", idEmp: "019" },
    { book: "071JOB10", description: "EQ DER ST...", category: "Trading", atomCode: "B10_071JOB10", idEmp: "022" },
  ];

  const bookStoreData = [
    { code: "BR_GED_E...", companyId: "051" },
    { code: "BR_GED_E...", companyId: "51G" },
    { code: "BR_GED_E...", companyId: "52G" },
    { code: "BR_GED_E...", companyId: "U51" },
    { code: "BR_GED_E...", companyId: "001" },
    { code: "BR_GED_E...", companyId: "002" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px] h-[750px] bg-white p-0 gap-0 border border-gray-300 rounded-lg shadow-xl">
        <DialogHeader className="bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-base font-semibold text-gray-800">
            Portfolio Editor
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-full overflow-hidden">
          {/* Left Panel - Form */}
          <div className="w-[300px] bg-gray-50 border-r border-gray-200 p-6 space-y-5 overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-700">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 text-sm border-gray-300 bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-700">Trade Desk</Label>
              <Select value={tradeDesk} onValueChange={setTradeDesk}>
                <SelectTrigger className="h-9 text-sm border-gray-300 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EQUITY DERIVATIVES">EQUITY DERIVATIVES</SelectItem>
                  <SelectItem value="FIXED INCOME">FIXED INCOME</SelectItem>
                  <SelectItem value="FX">FX</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-700">Cantera</Label>
              <Select value={cantera} onValueChange={setCantera}>
                <SelectTrigger className="h-9 text-sm border-gray-300 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COE">COE</SelectItem>
                  <SelectItem value="FLP">FLP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-700">Subcateira</Label>
              <Select value={subcateira} onValueChange={setSubcateira}>
                <SelectTrigger className="h-9 text-sm border-gray-300 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FLP">FLP</SelectItem>
                  <SelectItem value="COE">COE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 space-y-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="ativo"
                  checked={ativo}
                  onCheckedChange={(checked) => setAtivo(checked as boolean)}
                  className="h-4 w-4 border-gray-300"
                />
                <Label htmlFor="ativo" className="text-xs font-medium text-gray-700 cursor-pointer">
                  Active
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="bookBSEqualsBookPC"
                  checked={bookBSEqualsBookPC}
                  onCheckedChange={(checked) => setBookBSEqualsBookPC(checked as boolean)}
                  className="h-4 w-4 border-gray-300"
                />
                <Label htmlFor="bookBSEqualsBookPC" className="text-xs font-medium text-gray-700 cursor-pointer">
                  Book BS = Book PC
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="dualBook"
                  checked={dualBook}
                  onCheckedChange={(checked) => setDualBook(checked as boolean)}
                  className="h-4 w-4 border-gray-300"
                />
                <Label htmlFor="dualBook" className="text-xs font-medium text-gray-700 cursor-pointer">
                  Dual Book
                </Label>
              </div>
            </div>
          </div>

          {/* Right Panel - Tables */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-white">
            {/* Book PC Section */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gray-50">
                <Label className="text-xs font-semibold text-gray-700">Book PC:</Label>
                <Select value={bookPC} onValueChange={setBookPC}>
                  <SelectTrigger className="h-8 w-36 text-xs border-gray-300 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AF84B10">AF84B10</SelectItem>
                  </SelectContent>
                </Select>
                <Label className="text-xs font-semibold text-gray-700">Company ID:</Label>
                <Select value={companyIdPC} onValueChange={setCompanyIdPC}>
                  <SelectTrigger className="h-8 w-24 text-xs border-gray-300 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="001">001</SelectItem>
                    <SelectItem value="002">002</SelectItem>
                    <SelectItem value="003">003</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="h-8 px-4 text-xs bg-blue-600 hover:bg-blue-700 text-white ml-auto">
                  Add
                </Button>
              </div>
              <div className="p-4">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-2 text-left font-semibold border-r border-gray-200 w-10"></th>
                      <th className="p-2 text-left font-semibold border-r border-gray-200">Book</th>
                      <th className="p-2 text-left font-semibold border-r border-gray-200">Description</th>
                      <th className="p-2 text-left font-semibold border-r border-gray-200">Category</th>
                      <th className="p-2 text-left font-semibold border-r border-gray-200">Atom Code</th>
                      <th className="p-2 text-left font-semibold">Company ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookPCData.map((row, idx) => (
                      <tr key={idx} className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                        <td className="p-2 border-r border-gray-100">
                          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                        </td>
                        <td className="p-2 border-r border-gray-100 text-gray-900">{row.book}</td>
                        <td className="p-2 border-r border-gray-100 text-gray-900">{row.description}</td>
                        <td className="p-2 border-r border-gray-100 text-gray-900">{row.category}</td>
                        <td className="p-2 border-r border-gray-100 text-gray-900">{row.atomCode}</td>
                        <td className="p-2 text-gray-900">{row.companyId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Book BS Section */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gray-50">
                <Label className="text-xs font-semibold text-gray-700">Book BS:</Label>
                <Select value={bookBS} onValueChange={setBookBS}>
                  <SelectTrigger className="h-8 w-36 text-xs border-gray-300 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AF84B10">AF84B10</SelectItem>
                  </SelectContent>
                </Select>
                <Label className="text-xs font-semibold text-gray-700">Company ID:</Label>
                <Select value={companyIdBS} onValueChange={setCompanyIdBS}>
                  <SelectTrigger className="h-8 w-24 text-xs border-gray-300 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="001">001</SelectItem>
                    <SelectItem value="002">002</SelectItem>
                    <SelectItem value="003">003</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="h-8 px-4 text-xs bg-blue-600 hover:bg-blue-700 text-white ml-auto">
                  Add
                </Button>
              </div>
              <div className="p-4">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-2 text-left font-semibold border-r border-gray-200 w-10"></th>
                      <th className="p-2 text-left font-semibold border-r border-gray-200">Book</th>
                      <th className="p-2 text-left font-semibold border-r border-gray-200">Description</th>
                      <th className="p-2 text-left font-semibold border-r border-gray-200">Category</th>
                      <th className="p-2 text-left font-semibold border-r border-gray-200">Atom Code</th>
                      <th className="p-2 text-left font-semibold">ID Emp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookBSData.map((row, idx) => (
                      <tr key={idx} className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                        <td className="p-2 border-r border-gray-100">
                          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                        </td>
                        <td className="p-2 border-r border-gray-100 text-gray-900">{row.book}</td>
                        <td className="p-2 border-r border-gray-100 text-gray-900">{row.description}</td>
                        <td className="p-2 border-r border-gray-100 text-gray-900">{row.category}</td>
                        <td className="p-2 border-r border-gray-100 text-gray-900">{row.atomCode}</td>
                        <td className="p-2 text-gray-900">{row.idEmp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Book Store Section */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gray-50">
                <Label className="text-xs font-semibold text-gray-700">Book Store:</Label>
                <Select value={bookStore} onValueChange={setBookStore}>
                  <SelectTrigger className="h-8 w-52 text-xs border-gray-300 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="031500001132DFLT09">031500001132DFLT09</SelectItem>
                  </SelectContent>
                </Select>
                <Label className="text-xs font-semibold text-gray-700">Company:</Label>
                <Select value={companyStore} onValueChange={setCompanyStore}>
                  <SelectTrigger className="h-8 w-24 text-xs border-gray-300 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="001">001</SelectItem>
                    <SelectItem value="002">002</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="h-8 px-4 text-xs bg-blue-600 hover:bg-blue-700 text-white ml-auto">
                  Add
                </Button>
              </div>
              <div className="p-4">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-2 text-left font-semibold border-r border-gray-200 w-10"></th>
                      <th className="p-2 text-left font-semibold border-r border-gray-200">Code</th>
                      <th className="p-2 text-left font-semibold">Company ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookStoreData.map((row, idx) => (
                      <tr key={idx} className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                        <td className="p-2 border-r border-gray-100">
                          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                        </td>
                        <td className="p-2 border-r border-gray-100 text-gray-900">{row.code}</td>
                        <td className="p-2 text-gray-900">{row.companyId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
          <Button
            onClick={() => onOpenChange(false)}
            className="h-9 px-6 text-sm bg-white hover:bg-gray-100 text-gray-700 border border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="h-9 px-6 text-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}