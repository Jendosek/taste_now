import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

import './style.css'

const Layout = () => {
    return (
        <div className="layout-content">
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;