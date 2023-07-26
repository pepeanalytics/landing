import React from "react";
import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import Roadmap from "./Roadmap";

export default function Content() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </div>
  );
}
