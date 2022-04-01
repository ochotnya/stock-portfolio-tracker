import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyDetails from "./components/CompanyDetails";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companydetails/:symbol" element={<CompanyDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
