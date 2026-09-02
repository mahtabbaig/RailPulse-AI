import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/home";
import Tracking from "./pages/tracking";
import AIPrediction from "./pages/AIPrediction";
import Dashboard from "./pages/dashboard";

function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#16233A] bg-[#060B14]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center px-6 sm:px-10 py-4">

        {/* Logo */}
        <Link
          to="/"
           className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2FE0C7]/30 bg-[#2FE0C7]/10">
            🚆
          </div>

          <div>
            <div className="font-semibold text-[#E8EEF7]">
              RailPulse <span className="text-[#2FE0C7]">AI</span>
            </div>

            <div className="text-[10px] tracking-wider text-[#5C6E88]">
              DYNAMIC ETA SYSTEM
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <div className="ml-auto flex items-center gap-2">

          <Link
            to="/"
            className="rounded-lg px-4 py-2 text-sm text-[#8FA3C0] transition hover:bg-[#101F35] hover:text-[#2FE0C7]"
          >
            Home
          </Link>

          <Link
            to="/tracking"
            className="rounded-lg px-4 py-2 text-sm text-[#8FA3C0] transition hover:bg-[#101F35] hover:text-[#2FE0C7]"
          >
            Tracking
          </Link>

          <Link
            to="/ai-prediction"
            className="rounded-lg px-4 py-2 text-sm text-[#8FA3C0] transition hover:bg-[#101F35] hover:text-[#2FE0C7]"
          >
            AI Prediction
          </Link>

          <Link
            to="/dashboard"
            className="rounded-lg px-4 py-2 text-sm text-[#8FA3C0] transition hover:bg-[#101F35] hover:text-[#2FE0C7]"
          >
            Dashboard
          </Link>

        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#2FE0C7] animate-pulse"></span>
          SYSTEM ONLINE
        </div>

      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/ai-prediction" element={<AIPrediction />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;