import React from "react";
import Header from "../../components/common/Header";
import SideBar from "../../components/common/SideBar";
import { Route, Routes } from "react-router-dom";
import BlacklistPackage from "./BlacklistPackage";
import ServiceOrderTypes from "./ServiceOrderTypes";
import SlabDemarcation from "./SlabDemarcation";
import UserAccountManagement from "./UserAccountManagement";
import PackageRates from "./PackageRates";
import BearerRates from "./BearerRates";
import Scheme from "./Scheme";
import SalesSummary from "./SalesSummary";
import SalesDataAvailability from "./SalesDataAvailability";
import Analytics from "./Analytics";
import CommisionCalculation from "./CommissionCalculation"; 
import SalesDetailReportStage1 from "./SalesDetailReportStage1";
import SalesDetailReportStage2 from "./SalesDetailReportStage2";
import SalesCountReport from "./SalesCountReport";
import NewScheme from "./NewSchemes";


function DealerLayout({ tag }) {
  return (
    <div>
      {/* Main layout of the application */}
      <div className="min-h-screen background-img">
        {/* Header component */}
        <Header />
        {/* Sidebar component */}
        <div className="flex gap-5 px-5 mt-10">
          <SideBar />

          {/* Main content area */}
          <div className="w-full h-auto p-5 rounded-lg shadow-2xl">
            <Routes>
              {/* Dashboard routes */}
              <Route path="/usermanagement" element={<UserAccountManagement/>} />
              <Route path="/analytics" element={<Analytics/>} />
              <Route path="/serviceordertypes" element={<ServiceOrderTypes/>} />
              <Route path="/blacklistpackage" element={<BlacklistPackage/>} />
              <Route path="/slabdemarcation" element={<SlabDemarcation/>} />
              <Route path="/packagerates" element={<PackageRates/>} />
              <Route path="/bearerrates" element={<BearerRates/>} />
              <Route path="/salesdataavailability" element={<SalesDataAvailability/>} />
              <Route path="/calculation" element={<CommisionCalculation/>} />
              <Route path="/scheme" element={<Scheme/>} />
              <Route path="/newscheme" element={<NewScheme/>} />
              <Route path="/salessummary" element={<SalesSummary/>} />
              <Route path="/salesdetailreportstage1" element={<SalesDetailReportStage1/>} />
              <Route path="/salesdetailreportstage2" element={<SalesDetailReportStage2/>} />
              <Route path="/salescountreport" element={<SalesCountReport/>} />
            </Routes>
          </div>
        </div>
        <div className="flex justify-center text-[10px] text-gray-50/20">
          <h2>{tag}</h2>
        </div>
      </div>
    </div>
  );
}

export default DealerLayout;