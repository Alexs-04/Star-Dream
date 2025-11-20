import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import "../../assets/css/Layout.css";

const Layout: React.FC = () => {
    return (
        <div className="layout">
            <Sidebar />

            <main className="main-content">
                <TopBar />
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
