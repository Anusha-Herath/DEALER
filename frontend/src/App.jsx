import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/common/Signin";
import DealerLayout from "./pages/dealer/DealerLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* main routes for modules */}
          <Route path="/" element={<Signin />} />

          {/* Route to Modules */}
          <Route
            path="/salesincentive/*"
            element={<div>Sales Incentive </div>}
          />
          <Route
            path="/dealer/*"
            element={<DealerLayout tag={"Dealer Module @2025"} />}
          />
          <Route path="/finance/*" element={<div>Finance Module</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
