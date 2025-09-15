"use client";
import { useState } from "react"
import background from "@/assets/background.png";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  RotateCcw,
  Search,
  CalendarDays,
  ChevronRight,
  ChevronLeft,
  Bell,
  Upload,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.png";

import { ProductDataTable } from "@/modules/List/chunk/productData-table";
import { getProductColumns } from "@/modules/List/chunk/productColumns";
import api from "@/api";

export default function Dashboard() {
  const columns = getProductColumns();
  const [selectedDate, setSelectedDate] = useState("14/06/25")
  const [open, setOpen] = useState(true)
  const [startIndex, setStartIndex] = useState(0)


  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })

  
  const normalizeDate = (dateStr: string) => {
    if (!dateStr) return ""


    if (dateStr.includes(".")) {
      const parts = dateStr.split(".")
      if (parts.length === 3) {
        const day = parts[0].padStart(2, "0")
        const month = parts[1].padStart(2, "0")
        const year = parts[2].slice(-2) 
        return `${day}/${month}/${year}`
      }
    }

    
    if (dateStr.includes("/")) {
      const parts = dateStr.split("/")
      if (parts.length === 3) {
        const day = parts[0].padStart(2, "0")
        const month = parts[1].padStart(2, "0")
        const year = parts[2].slice(-2)
        return `${day}/${month}/${year}`
      }
    }

    return dateStr
  }

 
  const filteredProducts = api.products.filter(
    (p) => normalizeDate(p.delDate) === selectedDate
  )


  const generateDates = () => {
    const start = new Date(2025, 0, 1) 
    const end = new Date(2025, 11, 31) 
    const dates: string[] = []

    let current = new Date(start)
    while (current <= end) {
      dates.push(formatDate(current)) 
      current.setDate(current.getDate() + 1)
    }
    return dates
  }

  const dates = generateDates()
  const visibleDates = dates.slice(startIndex, startIndex + 7) 

  const getRowCountByDate = (date: string) => {
    return api.products.filter((p) => normalizeDate(p.delDate) === date).length
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center p-3 sm:p-4 md:p-6"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="ml-0 md:ml-64 transition-all">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-900">
            รายการใบสั่งซื้อ
          </h1>

          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border bg-white cursor-pointer hover:bg-gray-100">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>

            <button className="flex items-center space-x-2 px-2 py-1 border rounded-full bg-white hover:bg-gray-100 cursor-pointer transition">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
              ตัวกรอง{" "}
              <span className="text-red-700 text-xs sm:text-sm ml-2">
                ผลลัพธ์การค้นหาจะแสดงด้านล่าง
              </span>
            </CardTitle>

            <button
              onClick={() => setOpen(!open)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </CardHeader>

          {open && (
            <CardContent>
              <div className="flex flex-col md:flex-row md:space-x-4 mb-4 gap-3">
                <div className="flex items-center w-full md:w-1/2 gap-2">
                  <label className="w-24 sm:w-28 text-gray-700 text-sm sm:text-base font-medium">
                    เลขที่ใบสั่งซื้อ
                  </label>
                  <input
                    type="text"
                    placeholder="กรุณากรอก"
                    className="flex-1 border border-gray-300 rounded-lg px-2 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center w-full md:w-1/2 gap-2">
                  <label className="w-24 sm:w-24 text-gray-700 text-sm sm:text-base font-medium">
                    ชื่อลูกค้า
                  </label>
                  <input
                    type="text"
                    placeholder="กรุณากรอก"
                    className="flex-1 border border-gray-300 rounded-lg px-2 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              
              <div className="flex flex-col md:flex-row md:space-x-4 mb-6 gap-3">
                <div className="flex items-center w-full md:w-1/2 gap-2">
                  <label
                    htmlFor="order-date"
                    className="w-24 sm:w-28 text-gray-700 text-sm sm:text-base font-medium"
                  >
                    วันที่ใบสั่งซื้อ
                  </label>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      id="order-date"
                      placeholder="วว-ดด-ปปปป ถึง วว-ดด-ปปปป"
                      className="w-full border border-gray-300 rounded-lg px-2 py-2 pr-8 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <CalendarDays className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
                  </div>
                </div>
                <div className="flex items-center w-full md:w-1/2 gap-2"></div>
              </div>

             
              <div className="flex flex-wrap items-center gap-5 mb-4">
                <span className="text-gray-700 text-sm sm:text-base font-medium">สถานะ :</span>
                {[
                  "ทั้งหมด",
                  "รอเจ้าหน้าที่ตรวจสอบ",
                  "AI กำลังประมวลผล",
                  "ตรวจสอบแล้ว",
                  "ไม่ผ่านการตรวจสอบ",
                ].map((label, idx) => (
                  <label key={idx} className="flex items-center space-x-1 text-sm sm:text-base">
                    <Checkbox className="data-[state=checked]:bg-red-700 data-[state=checked]:border-red-700" />
                    <span className="text-gray-700">{label}</span>
                  </label>
                ))}
              </div>

              <hr />

              
              <div className="mt-3 flex flex-col sm:flex-row justify-end items-center gap-3">
                <div
                  className="flex items-center gap-1 text-red-500 cursor-pointer text-sm sm:text-base font-medium hover:text-red-700"
                  onClick={() => console.log("Retry clicked")}
                >
                  <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>ล้างค่า</span>
                </div>
                <Button className="flex items-center justify-center gap-2 bg-red-500 rounded-lg hover:bg-red-700 text-white border-red-500 w-full sm:w-32 md:w-36">
                  <Search className="h-4 w-4" />
                  <span>ค้นหา</span>
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 my-5">
          <h1 className="text-lg sm:text-xl md:text-2xl text-gray-900">
            รายการใบสั่งซื้อทั้งหมด
          </h1>
          <Button className="flex items-center justify-center gap-2 bg-red-500 py-2 sm:py-3 md:py-4 rounded-lg hover:bg-red-700 text-white border-red-500 w-full sm:w-32 md:w-36">
            <Upload className="h-5 w-5" />
            <span>อัปโหลด</span>
          </Button>
        </div>

        {/* Date Bar */}
        <div className="w-full overflow-x-auto">
          <div className="flex w-full items-center">
            
            <div
              onClick={() => startIndex > 0 && setStartIndex(startIndex - 1)}
              className={`px-3 py-4 cursor-pointer rounded-t-xl flex items-center justify-center ${startIndex === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-red-700 hover:bg-red-500 hover:text-white"
                }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            {/* Dates */}
            {visibleDates.map((day, index) => {
              const count = getRowCountByDate(day)
              const isActive = selectedDate === day

              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`px-4 sm:px-6 py-3 cursor-pointer rounded-t-xl text-sm sm:text-base flex-1 text-center ${isActive
                      ? "bg-red-500 text-white font-medium"
                      : "bg-gray-200 text-gray-900 border border-gray-300 hover:bg-red-500 hover:text-white"
                    }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {day}
                    {isActive && count > 0 && (
                      <span className="bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {count}
                      </span>
                    )}
                  </span>
                </div>
              )
            })}
            
            <div
              onClick={() =>
                startIndex < dates.length - 7 && setStartIndex(startIndex + 1)
              }
              className={`px-3 py-4 cursor-pointer rounded-t-xl flex items-center justify-center ${startIndex >= dates.length - 7
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-red-700 hover:bg-red-500 hover:text-white"
                }`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          <div className="border-x border-b rounded-b-lg overflow-hidden">
            <ProductDataTable columns={columns} data={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
