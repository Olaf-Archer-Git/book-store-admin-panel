import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./Sidebar";

const Layout = () => {
  const getTokenFromLocalStorage = localStorage?.user;

  return getTokenFromLocalStorage ? (
    <main className="app">
      <SideBar />
      <div className="content">
        <Header />
        <Outlet />
      </div>
    </main>
  ) : (
    <Navigate to="/" />
  );
};

export default Layout;
