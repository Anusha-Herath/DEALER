import "./App.css";
import React from "react";
import Header from "./components/common/Header";
import SideBar from "./components/common/SideBar";

function Layout() {
  return (
    <>
      {/* Main layout of the application */}
      <div className="background-img h-screen">
        {/* Header component */}
        <Header />
        {/* Sidebar component */}
        <div className="grid grid-cols-6 gap-5 px-5 mt-10">
          <div className="col-span-1">
            <SideBar />
          </div>
          {/* Main content area */}
          <div className="col-span-5 bg-white w-full h-40 rounded-lg shadow-2xl p-5">
            <h2>Buddhima</h2>
            <h2>Buddhima</h2>
            <h2>Buddhima</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
