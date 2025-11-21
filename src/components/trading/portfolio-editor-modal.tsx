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
      <DialogContent className="max-w-[900px] h-[700px] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 p-0 gap-0 border-2 border-gray-400">
        <DialogHeader className="bg-gradient-to-r from-gray-300 to-gray-200 border-b-2 border-gray-400 px-4 py-2">
          <DialogTitle className="text-sm font-bold text-gray-800">
            PortfolioEditor
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-full overflow-hidden">
          {/* Left Panel - Form */}
          <div className="w-[280px] bg-gray-100 border-r-2 border-gray-400 p-4 space-y-4 overflow-y-auto">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold text-gray-700">Name:</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-7 text-[10px] border-2 border-gray-400 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold text-gray-700">Trade Desk:</Label>
              <Select value={tradeDesk} onValueChange={setTradeDesk}>
                <SelectTrigger className="h-7 text-[10px] border-2 border-gray-400 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EQUITY DERIVATIVES">EQUITY DERIVATIVES</SelectItem>
                  <SelectItem value="FIXED INCOME">FIXED INCOME</SelectItem>
                  <SelectItem value="FX">FX</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold text-gray-700">Cantera:</Label>
              <Select value={cantera} onValueChange={setCantera}>
                <SelectTrigger className="h-7 text-[10px] border-2 border-gray-400 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COE">COE</SelectItem>
                  <SelectItem value="FLP">FLP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold text-gray-700">Subcateira:</Label>
              <Select value={subcateira} onValueChange={setSubcateira}>
                <SelectTrigger className="h-7 text-[10px] border-2 border-gray-400 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FLP">FLP</SelectItem>
                  <SelectItem value="COE">COE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="ativo"
                checked={ativo}
                onCheckedChange={(checked) => setAtivo(checked as boolean)}
                className="h-4 w-4 border-2 border-gray-400"
              />
              <Label htmlFor="ativo" className="text-[10px] font-semibold text-gray-700">
                Ativo:
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Label className="text-[10px] font-semibold text-gray-700">
                Book BS = Book PC:
              </Label>
              <Checkbox
                id="bookBSEqualsBookPC"
                checked={bookBSEqualsBookPC}
                onCheckedChange={(checked) => setBookBSEqualsBookPC(checked as boolean)}
                className="h-4 w-4 border-2 border-gray-400"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="dualBook" className="text-[10px] font-semibold text-gray-700">
                DualBook:
              </Label>
              <Checkbox
                id="dualBook"
                checked={dualBook}
                onCheckedChange={(checked) => setDualBook(checked as boolean)}
                className="h-4 w-4 border-2 border-gray-400"
              />
            </div>
          </div>

          {/* Right Panel - Tables */}
          <div className="flex-1 p-3 space-y-3 overflow-y-auto">
            {/* Book PC Section */}
            <div className="bg-white border-2 border-gray-400 rounded">
              <div className="flex items-center gap-2 p-2 border-b-2 border-gray-400 bg-gray-50">
                <Label className="text-[10px] font-semibold text-gray-700">Book PC:</Label>
                <Select value={bookPC} onValueChange={setBookPC}>
                  <SelectTrigger className="h-6 w-32 text-[10px] border-2 border-gray-400 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AF84B10">AF84B10</SelectItem>
                  </SelectContent>
                </Select>
                <Label className="text-[10px] font-semibold text-gray-700">Company Id:</Label>
                <Select value={companyIdPC} onValueChange={setCompanyIdPC}>
                  <SelectTrigger className="h-6 w-20 text-[10px] border-2 border-gray-400 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="001">001</SelectItem>
                    <SelectItem value="002">002</SelectItem>
                    <SelectItem value="003">003</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="h-6 px-3 text-[10px] bg-blue-600 hover:bg-blue-700 text-white">
                  Add
                </Button>
              </div>
              <div className="p-2">
                <div className="text-[10px] font-bold text-center mb-1 text-gray-700">Book PC</div>
                <table className="w-full text-[9px] border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="p-1 text-left font-bold border-r border-gray-300 w-8">
                        <ChevronRight className="h-3 w-3" />
                      </th>
                      <th className="p-1 text-left font-bold border-r border-gray-300">Book</th>
                      <th className="p-1 text-left font-bold border-r border-gray-300">Book Description</th>
                      <th className="p-1 text-left font-bold border-r border-gray-300">Category</th>
                      <th className="p-1 text-left font-bold border-r border-gray-300">Atom Code</th>
                      <th className="p-1 text-left font-bold">Company Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookPCData.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-1 border-r border-gray-300">
                          <ChevronRight className="h-3 w-3" />
                        </td>
                        <td className="p-1 border-r border-gray-300">{row.book}</td>
                        <td className="p-1 border-r border-gray-300">{row.description}</td>
                        <td className="p-1 border-r border-gray-300">{row.category}</td>
                        <td className="p-1 border-r border-gray-300">{row.atomCode}</td>
                        <td className="p-1">{row.companyId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Book BS Section */}
            <div className="bg-white border-2 border-gray-400 rounded">
              <div className="flex items-center gap-2 p-2 border-b-2 border-gray-400 bg-gray-50">
                <Label className="text-[10px] font-semibold text-gray-700">Book BS:</Label>
                <Select value={bookBS} onValueChange={setBookBS}>
                  <SelectTrigger className="h-6 w-32 text-[10px] border-2 border-gray-400 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AF84B10">AF84B10</SelectItem>
                  </SelectContent>
                </Select>
                <Label className="text-[10px] font-semibold text-gray-700">Company Id:</Label>
                <Select value={companyIdBS} onValueChange={setCompanyIdBS}>
                  <SelectTrigger className="h-6 w-20 text-[10px] border-2 border-gray-400 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="001">001</SelectItem>
                    <SelectItem value="002">002</SelectItem>
                    <SelectItem value="003">003</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="h-6 px-3 text-[10px] bg-blue-600 hover:bg-blue-700 text-white">
                  Add
                </Button>
              </div>
              <div className="p-2">
                <div className="text-[10px] font-bold text-center mb-1 text-gray-700">Book BS</div>
                <table className="w-full text-[9px] border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="p-1 text-left font-bold border-r border-gray-300 w-8">
                        <ChevronRight className="h-3 w-3" />
                      </th>
                      <th className="p-1 text-left font-bold border-r border-gray-300">Book</th>
                      <th className="p-1 text-left font-bold border-r border-gray-300">Book Descri...</th>
                      <th className="p-1 text-left font-bold border-r border-gray-300">Category</th>
                      <th className="p-1 text-left font-bold border-r border-gray-300">Atom Code</th>
                      <th className="p-1 text-left font-bold">Id_Emp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookBSData.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-1 border-r border-gray-300">
                          <ChevronRight className="h-3 w-3" />
                        </td>
                        <td className="p-1 border-r border-gray-300">{row.book}</td>
                        <td className="p-1 border-r border-gray-300">{row.description}</td>
                        <td className="p-1 border-r border-gray-300">{row.category}</td>
                        <td className="p-1 border-r border-gray-300">{row.atomCode}</td>
                        <td className="p-1">{row.idEmp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Book Store Section */}
            <div className="bg-white border-2 border-gray-400 rounded">
              <div className="flex items-center gap-2 p-2 border-b-2 border-gray-400 bg-gray-50">
                <Label className="text-[10px] font-semibold text-gray-700">Book Store:</Label>
                <Select value={bookStore} onValueChange={setBookStore}>
                  <SelectTrigger className="h-6 w-48 text-[10px] border-2 border-gray-400 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="031500001132DFLT09">031500001132DFLT09</SelectItem>
                  </SelectContent>
                </Select>
                <Label className="text-[10px] font-semibold text-gray-700">Company:</Label>
                <Select value={companyStore} onValueChange={setCompanyStore}>
                  <SelectTrigger className="h-6 w-20 text-[10px] border-2 border-gray-400 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="001">001</SelectItem>
                    <SelectItem value="002">002</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="h-6 px-3 text-[10px] bg-blue-600 hover:bg-blue-700 text-white">
                  Add
                </Button>
              </div>
              <div className="p-2">
                <div className="text-[10px] font-bold text-center mb-1 text-gray-700">Book Store</div>
                <table className="w-full text-[9px] border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="p-1 text-left font-bold border-r border-gray-300 w-8">
                        <ChevronRight className="h-3 w-3" />
                      </th>
                      <th className="p-1 text-left font-bold border-r border-gray-300">Code</th>
                      <th className="p-1 text-left font-bold">Company Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookStoreData.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-1 border-r border-gray-300">
                          <ChevronRight className="h-3 w-3" />
                        </td>
                        <td className="p-1 border-r border-gray-300">{row.code}</td>
                        <td className="p-1">{row.companyId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 p-3 border-t-2 border-gray-400 bg-gray-100">
          <Button
            onClick={() => onOpenChange(false)}
            className="h-7 px-6 text-[10px] bg-gray-300 hover:bg-gray-400 text-gray-800 border-2 border-gray-400"
          >
            OK
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="h-7 px-6 text-[10px] bg-gray-300 hover:bg-gray-400 text-gray-800 border-2 border-gray-400"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}