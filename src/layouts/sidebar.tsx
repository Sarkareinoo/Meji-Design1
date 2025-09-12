"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";

import { LayoutGrid, List, AlignLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/meiji-logo.png";


export default function SidebarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const location = useLocation();
    

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                
                <Sidebar side="left" className="w-64 border-r bg-white shadow-sm">
                    <SidebarHeader>
                        <div className="flex items-center justify-between px-4 py-2">
                            <img src={logo} alt="Logo" className="h-8" />
                            <AlignLeft className="h-5 w-5 text-red-500" />
                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <Link
                                            to="/"
                                            className={`flex items-center gap-3 rounded-md p-2 text-sm hover:bg-red-100 ${location.pathname === "/" ? "bg-red-200 font-bold" : ""
                                                }`}
                                        >
                                            <LayoutGrid className="h-8 w-5" />
                                            <span>ภาพรวม OCR</span>
                                        </Link>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <Link
                                            to="/list"
                                            className={`flex items-center gap-3 rounded-md p-2 text-sm hover:bg-red-100 ${location.pathname === "/list" ? "bg-red-200 font-bold" : ""
                                                }`}
                                        >
                                            <List className="h-8 w-5" />
                                            <span>รายการใบสั่งซื้อ</span>
                                        </Link>
                                    </SidebarMenuItem>


                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter>
                        <div className="px-4 py-2 text-xs text-muted-foreground">
                            © Meiji Dashboard
                        </div>
                    </SidebarFooter>
                </Sidebar>

                
                <main className="flex-1 bg-gray-50">{children}</main>
            </div>
        </SidebarProvider>
    );
}
