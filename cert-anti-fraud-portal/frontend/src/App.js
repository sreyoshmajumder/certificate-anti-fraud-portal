import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import IssuerPortal from "./pages/IssuerPortal";
import StudentPortal from "./pages/StudentPortal";
import VerifierPortal from "./pages/VerifierPortal";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/students" element={<StudentPortal />} />
            <Route path="/institutions" element={<IssuerPortal />} />
            <Route path="/verify" element={<VerifierPortal />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
