// src/components/layout/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import ProtectedRoute from "../../routes/ProtectedRoute";
import "../../assets/css/Layout.css";
import {useLogout} from "../../hooks/useLogout.ts";

const Layout: React.FC = () => {
    console.log("Layout component rendering");
    useLogout();
    return (
        <ProtectedRoute>
            <div className="layout">
                <Sidebar />
                <main className="main-content">
                    <TopBar />
                    <div className="page-content">
                        <Outlet />
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
};

export default Layout;