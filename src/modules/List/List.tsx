"use client";

import background from "@/assets/background.png";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  RotateCcw,
  Search,
  CalendarDays,
  ChevronRight,
  Bell,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.png";

import { ProductDataTable } from "@/modules/List/chunk/productData-table";
import { getProductColumns } from "@/modules/List/chunk/productColumns";
import { products } from "@/api/products/product";

export default function Dashboard() {
  const columns = getProductColumns();

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
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-semibold">
              ตัวกรอง{" "}
              <span className="text-red-700 text-xs sm:text-sm ml-2">
                ผลลัพธ์การค้นหาจะแสดงด้านล่าง
              </span>
            </CardTitle>
          </CardHeader>
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

              <div className="flex items-center w-full md:w-1/2 gap-2">
              </div>
            </div>


            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-gray-700 text-sm sm:text-base font-medium">
                สถานะ :
              </span>
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


        <div className="w-full overflow-x-auto">
          <div className="flex w-full">

            <div className="flex items-center bg-red-500 text-white px-4 py-2 font-medium cursor-pointer rounded-t-xl text-sm sm:text-base flex-1 justify-center">
              วันนี้ 14/06/25
              <span className="ml-2 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                5
              </span>
            </div>


            {["13/06/25", "12/06/25", "11/06/25", "10/06/25", "9/06/25", "8/06/25", "7/06/25"].map(
              (day, index) => (
                <div
                  key={index}
                  className="px-4 sm:px-6 py-2 bg-gray-200 text-gray-900 border border-gray-300 cursor-pointer hover:bg-gray-100 rounded-t-xl text-sm sm:text-base flex-1 text-center"
                >
                  {day}
                </div>
              )
            )}


            <div className="px-4 sm:px-6 py-2 bg-gray-200 text-red-700 border cursor-pointer hover:bg-gray-100 rounded-t-xl flex items-center justify-center flex-1">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          <ProductDataTable columns={columns} data={products} />
        </div>
      </div>
    </div>
  );
}
