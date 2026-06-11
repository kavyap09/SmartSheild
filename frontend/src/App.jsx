import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AwarenessPage from "./pages/AwarenessPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/awareness" element={<AwarenessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;