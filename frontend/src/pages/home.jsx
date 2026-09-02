
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getETA } from "../services/api";
import {
  TrainFront,
  Radar,
  MapPinned,
  BrainCircuit,
  Target,
  ArrowRight,
  LayoutDashboard,
  Database,
  Cpu,
  TrendingUp,
  Users,
  Radio,
  Activity,
  Gauge,
  Zap,
} from "lucide-react";


const stats = [
  { icon: Radar, value: "128", label: "Active trains", suffix: "" },
  { icon: MapPinned, value: "42", label: "Stations monitored", suffix: "" },
  { icon: BrainCircuit, value: "3,540", label: "ETA predictions today", suffix: "" },
  { icon: Target, value: "91.4", label: "Prediction accuracy", suffix: "%" },
];

const steps = [
  {
    icon: Database,
    title: "Live conditions captured",
    body: "Position, speed, delay, and upcoming halts are read from the train's current running data.",
  },
  {
    icon: Cpu,
    title: "Model recalculates",
    body: "A trained ML model re-scores the route segment the moment any input changes.",
  },
  {
    icon: TrendingUp,
    title: "ETA updates instantly",
    body: "The predicted arrival time shifts to reflect what's actually happening on the line.",
  },
  {
    icon: Users,
    title: "Reaches passengers & officers",
    body: "The same forecast reaches the passenger tracking view and the operations dashboard together.",
  },
];


  export default function App() {
  const navigate = useNavigate();

  const [eta, setEta] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [etaHistory, setEtaHistory] = useState([]);
  const previousDelayRef = useRef(null);

  // Home should start with NO selected train
 const [selectedTrain, setSelectedTrain] = useState(() => {
  return sessionStorage.getItem("selectedTrain") || "";
});

const [trainSearch, setTrainSearch] = useState(() => {
  return sessionStorage.getItem("selectedTrain") || "";
});

  const [searchError, setSearchError] = useState("");
const refreshETA = async () => {
  if (!selectedTrain) return;

  try {
    const data = await getETA(selectedTrain);

    if (data.error) {
      setSearchError("Unable to load train data.");
      return;
    }

    setEta(data);
    setLastUpdated(new Date().toLocaleTimeString());

  } catch (error) {
    console.error("ETA Error:", error);
    setSearchError("Unable to connect to the RailPulse AI server.");
  }
};
const handleTrackTrain = async () => {
  const trainNumber = trainSearch.trim();

  if (!trainNumber) {
    setSearchError("Please enter a train number.");
    return;
  }

  setSearchError("");

  try {
    const data = await getETA(trainNumber);

    if (data.error) {
      setSearchError(
        "Train not found. Please enter a valid train number."
      );
      return;
    }

    // Only reset history when switching to a different train
    if (trainNumber !== selectedTrain) {
      setEtaHistory([]);
      previousDelayRef.current = null;
    }

    // Select the new train
    setSelectedTrain(trainNumber);

    // Store for other pages
    sessionStorage.setItem("selectedTrain", trainNumber);

    // Show current ETA
    setEta(data);
    setLastUpdated(new Date().toLocaleTimeString());

  } catch (error) {
    setSearchError("Unable to connect to the RailPulse AI server.");
  }
};
useEffect(() => {
  if (!selectedTrain) {
    setEta(null);
    return;
  }

const loadETA = async () => {
  try {
    const data = await getETA(selectedTrain);

    // Add history only when delay actually changes
    if (
      previousDelayRef.current !== null &&
      previousDelayRef.current !== data.delay_minutes
    ) {
      setEtaHistory((history) => [
        ...history.slice(-4),
        {
          time: new Date().toLocaleTimeString(),
          eta: data.predicted_arrival,
          delay: data.delay_minutes,
          speed: data.speed_kmph,
        },
      ]);
    }

    // Remember current delay
    previousDelayRef.current = data.delay_minutes;

    // Update current ETA
    setEta(data);
    setLastUpdated(new Date().toLocaleTimeString());

  } catch (error) {
    console.error("Failed to fetch ETA:", error);
  }
};


  loadETA();

  const interval = setInterval(loadETA, 10000);

  return () => clearInterval(interval);

}, [selectedTrain]);
  return ( 
    <div className="min-h-screen bg-[#060B14] text-[#E8EEF7] selection:bg-[#2FE0C7] selection:text-[#060B14]"> 
      <style>{` 
        @keyframes travel { 
          0%   { left: -2%; opacity: 0; } 
          8%   { opacity: 1; } 
          92%  { opacity: 1; } 
          100% { left: 100%; opacity: 0; } 
        } 
        .font-display { font-family: 'Rajdhani', 'Inter', sans-serif; } 
        .font-mono-data { font-family: 'JetBrains Mono', ui-monospace, monospace; } 
        body { font-family: 'Inter', sans-serif; } 
      `}</style> 
 
      {/* Top bar */} 
      <header className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-10 py-5 border-b border-[#16233A]"> 
        <div className="flex items-center gap-2"> 
          <TrainFront className="w-6 h-6 text-[#2FE0C7]" strokeWidth={1.75} /> 
          <span className="font-display text-lg tracking-wide font-semibold">RailPulse AI</span> 
        </div> 
        <div className="flex items-center gap-2 rounded-full border border-[#22D3B0]/30 bg-[#0B1526] px-3 py-1.5"> 
          <span className="relative flex h-2 w-2"> 
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB238] opacity-75" /> 
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFB238]" /> 
          </span> 
          <span className="font-mono-data text-[11px] tracking-wider text-[#FFB238]"> 
            DEMO MODE — SIMULATED DATA 
          </span> 
        </div> 
      </header> 
 
      {/* Hero */} 
<section className="relative overflow-hidden px-6 sm:px-10 pt-16 pb-20 sm:pt-24 sm:pb-28"> 
  <div className="grid lg:grid-cols-2 gap-12 items-center"> 
 
    {/* LEFT — Existing Hero Content */} 
    <div className="max-w-3xl"> 
      <span className="font-mono-data text-xs tracking-[0.25em] text-[#5EEAD4]"> 
        SIH 2026 PROTOTYPE 
      </span> 
 
      <h1 className="font-display mt-4 text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"> 
        RailPulse <span className="text-[#2FE0C7]">AI</span> 
      </h1> 
 
      <p className="mt-4 text-xl sm:text-2xl text-[#B9C7DD] font-display font-medium"> 
        Dynamic Train ETA Intelligence Platform 
      </p> 
 
      <p className="mt-5 max-w-xl text-[#8FA3C0] leading-relaxed"> 
        AI-assisted, real-time ETA forecasting that recalculates the moment a 
        train's speed, delay, or stops change — for smarter, more reliable 
        passenger information. 
      </p> 
 
      <div className="mt-8 flex flex-col sm:flex-row gap-4"> 
        <button 
onClick={() => navigate("/tracking")}
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#2FE0C7] px-6 py-3 font-medium text-[#06251F] transition hover:bg-[#5EEAD4]" 
        > 
          Track a Train 
          <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" /> 
        </button> 
 
        <button 
          onClick={() => 
            document 
              .getElementById("operations") 
              ?.scrollIntoView({ behavior: "smooth" }) 
          } 
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#22344F] bg-[#0B1526] px-6 py-3 font-medium text-[#E8EEF7] transition hover:border-[#2FE0C7]/50 hover:bg-[#101F35]" 
        > 
          <LayoutDashboard className="w-4 h-4" /> 
          Operations Dashboard 
        </button> 
      </div> 
    </div> 
 
 
    {/* RIGHT — AI RAILWAY NETWORK VISUAL */} 
    <div className="relative"> 
 
      {/* Main visualization card */} 
      <div className="relative h-[360px] overflow-hidden rounded-2xl border border-[#1B2B44] bg-[#0B1526] shadow-[0_0_60px_rgba(47,224,199,0.08)]"> 
 
        {/* Background grid */} 
        <div 
          className="absolute inset-0 opacity-30" 
          style={{ 
            backgroundImage: 
              "linear-gradient(#16233A 1px, transparent 1px), linear-gradient(90deg, #16233A 1px, transparent 1px)", 
            backgroundSize: "40px 40px", 
          }} 
        /> 
 
        {/* Glow */} 
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2FE0C7]/5 blur-3xl" /> 
 
        {/* Header */} 
        <div className="absolute left-5 right-5 top-5 flex items-center justify-between"> 
          <div className="flex items-center gap-2"> 
            <Radar className="h-4 w-4 text-[#2FE0C7]" /> 
 
            <span className="font-mono-data text-[10px] tracking-[0.2em] text-[#5EEAD4]"> 
              AI NETWORK MONITOR 
            </span> 
          </div> 
 
          <div className="flex items-center gap-2 rounded-full border border-[#2FE0C7]/20 bg-[#2FE0C7]/5 px-3 py-1"> 
            <span className="h-1.5 w-1.5 rounded-full bg-[#2FE0C7] animate-pulse" /> 
            <span className="font-mono-data text-[9px] text-[#2FE0C7]"> 
              ACTIVE 
            </span> 
          </div> 
        </div> 
 
 
        {/* Railway Network Map */} 
<div className="absolute inset-0 top-16"> 
 
  {/* Main horizontal route */} 
  <div className="absolute left-[10%] right-[10%] top-[52%] h-[2px] bg-[#22344F]" /> 
 
  {/* Active route */} 
  <div 
    className="absolute left-[10%] top-[52%] h-[2px] bg-gradient-to-r from-[#2FE0C7] to-[#5EEAD4] transition-all duration-1000" 
    style={{ 
      width: `${Math.min( 
        80, 
        Math.max(0, (eta?.progress_percent ?? 0) * 0.8) 
      )}%`, 
    }} 
  /> 
 
  {/* Upper network route */} 
  <div className="absolute left-[25%] top-[52%] h-[2px] w-[22%] origin-left rotate-[-28deg] bg-[#22344F]" /> 
 
  <div className="absolute left-[47%] top-[42%] h-[2px] w-[22%] origin-left rotate-[28deg] bg-[#22344F]" /> 
 
  {/* Lower network route */} 
  <div className="absolute left-[25%] top-[52%] h-[2px] w-[22%] origin-left rotate-[28deg] bg-[#22344F]" /> 
 
  <div className="absolute left-[47%] top-[62%] h-[2px] w-[22%] origin-left rotate-[-28deg] bg-[#22344F]" /> 
 
 
  {/* Network stations */} 
 
  {/* Origin */} 
  <div className="absolute left-[10%] top-[52%] -translate-x-1/2 -translate-y-1/2"> 
    <div className="h-4 w-4 rounded-full border-2 border-[#2FE0C7] bg-[#060B14] shadow-[0_0_10px_rgba(47,224,199,0.4)]" /> 
    <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-data text-[8px] text-[#5C6E88]"> 
      {eta?.source || "ORIGIN"} 
    </span> 
  </div> 
 
 
  {/* Upper station */} 
  <div className="absolute left-[25%] top-[42%] -translate-x-1/2 -translate-y-1/2"> 
    <div 
  className={`h-3 w-3 rounded-full border-2 transition-all duration-700 ${ 
    (eta?.progress_percent ?? 0) >= 25 
      ? "border-[#2FE0C7] bg-[#060B14] shadow-[0_0_8px_rgba(47,224,199,0.5)]" 
      : "border-[#3A5170] bg-[#0B1526]" 
  }`} 
/> 
   <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-data text-[8px] text-[#5C6E88]"> 
  {eta?.stations?.[1] || "STN 01"} 
</span> 
  </div> 
 
 
  {/* Lower station */} 
  <div className="absolute left-[25%] top-[62%] -translate-x-1/2 -translate-y-1/2"> 
  <div 
  className={`h-3 w-3 rounded-full border-2 transition-all duration-700 ${ 
    (eta?.progress_percent ?? 0) >= 25 
      ? "border-[#2FE0C7] bg-[#060B14] shadow-[0_0_8px_rgba(47,224,199,0.5)]" 
      : "border-[#3A5170] bg-[#0B1526]" 
  }`} 
/> 
    <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-data text-[8px] text-[#5C6E88]"> 
  {eta?.stations?.[2] || "STN 02"} 
</span> 
  </div> 
 
 
  {/* Central station */} 
  <div className="absolute left-[47%] top-[52%] -translate-x-1/2 -translate-y-1/2"> 
   <div 
  className={`h-4 w-4 rounded-full border-2 transition-all duration-700 ${ 
    (eta?.progress_percent ?? 0) >= 50 
      ? "border-[#2FE0C7] bg-[#060B14] shadow-[0_0_12px_rgba(47,224,199,0.6)]" 
      : "border-[#3A5170] bg-[#0B1526]" 
  }`} 
/> 
    <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-data text-[8px] text-[#5C6E88]"> 
      JUNCTION 
    </span> 
  </div> 
 
 
  {/* Upper-right station */} 
<div className="absolute left-[69%] top-[42%] -translate-x-1/2 -translate-y-1/2"> 
  <div 
  className={`h-3 w-3 rounded-full border-2 transition-all duration-700 ${ 
    (eta?.progress_percent ?? 0) >= 75 
      ? "border-[#2FE0C7] bg-[#060B14] shadow-[0_0_8px_rgba(47,224,199,0.5)]" 
      : "border-[#3A5170] bg-[#0B1526]" 
  }`} 
/> 
  <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-data text-[8px] text-[#5C6E88]"> 
    {eta?.stations?.[4] || "STN 03"} 
  </span> 
</div> 
 
  {/* Lower-right station */} 
 <div className="absolute left-[69%] top-[62%] -translate-x-1/2 -translate-y-1/2"> 
<div 
  className={`h-3 w-3 rounded-full border-2 transition-all duration-700 ${ 
    (eta?.progress_percent ?? 0) >= 75 
      ? "border-[#2FE0C7] bg-[#060B14] shadow-[0_0_8px_rgba(47,224,199,0.5)]" 
      : "border-[#3A5170] bg-[#0B1526]" 
  }`} 
/> 
  <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-data text-[8px] text-[#5C6E88]"> 
    {eta?.stations?.[5] || "STN 04"} 
  </span> 
</div> 
 
 
  {/* Destination */} 
  <div className="absolute left-[90%] top-[52%] -translate-x-1/2 -translate-y-1/2"> 
    <div className="h-4 w-4 rounded-full border-2 border-[#3A5170] bg-[#0B1526]" /> 
    <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-data text-[8px] text-[#5C6E88]"> 
      {eta?.destination || "DESTINATION"} 
    </span> 
  </div> 
 
 
  {/* Moving train */} 
  <div 
    className="absolute top-[52%] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000" 
    style={{ 
      left: `${10 + ((eta?.progress_percent ?? 0) * 0.8)}%`, 
    }} 
  > 
 
    {/* AI scanning rings */} 
    <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2FE0C7]/20 animate-ping" /> 
 
    <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2FE0C7]/30" /> 
 
    {/* Train */} 
    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#2FE0C7] bg-[#060B14] shadow-[0_0_25px_rgba(47,224,199,0.55)]"> 
      <TrainFront className="h-5 w-5 text-[#2FE0C7]" /> 
    </div> 
 
  </div> 
 
</div> 
 
 
     
         
 
 
        {/* AI scan line */} 
        <div className="absolute left-0 right-0 top-[46%] h-px bg-gradient-to-r from-transparent via-[#2FE0C7]/40 to-transparent animate-pulse" /> 
 
 
        {/* Bottom metrics */} 
        <div className="absolute bottom-5 left-5 right-5 grid grid-cols-4 gap-3"> 
 
          <div className="rounded-lg border border-[#16233A] bg-[#101F35]/80 p-3 backdrop-blur"> 
            <div className="flex items-center gap-2"> 
              <Activity className="h-3.5 w-3.5 text-[#2FE0C7]" /> 
              <span className="font-mono-data text-[8px] text-[#5C6E88]"> 
                TRACKING 
              </span> 
            </div> 
 
            <p className="mt-1 font-mono-data text-sm text-[#E8EEF7]"> 
              LIVE 
            </p> 
          </div> 
 
 
          <div className="rounded-lg border border-[#16233A] bg-[#101F35]/80 p-3 backdrop-blur"> 
            <div className="flex items-center gap-2"> 
              <Gauge className="h-3.5 w-3.5 text-[#2FE0C7]" /> 
              <span className="font-mono-data text-[8px] text-[#5C6E88]"> 
                SPEED 
              </span> 
            </div> 
 
            <p className="mt-1 font-mono-data text-sm text-[#E8EEF7]"> 
              {eta?.speed_kmph ?? "--"} KM/H 
            </p> 
          </div> 
 
 
          <div className="rounded-lg border border-[#16233A] bg-[#101F35]/80 p-3 backdrop-blur"> 
            <div className="flex items-center gap-2"> 
              <Zap className="h-3.5 w-3.5 text-[#2FE0C7]" /> 
              <span className="font-mono-data text-[8px] text-[#5C6E88]"> 
                AI ETA 
              </span> 
            </div> 
 
            <p className="mt-1 font-mono-data text-sm text-[#2FE0C7]"> 
              {eta?.predicted_arrival ?? "--"} 
            </p> 
          </div> 
                     
 
          {/* Confidence Card */} 
          <div className="rounded-lg border border-[#16233A] bg-[#101F35]/80 p-3 backdrop-blur"> 
            <div className="flex items-center gap-2"> 
              <Target className="h-3.5 w-3.5 text-[#2FE0C7]" /> 
 
              <span className="font-mono-data text-[8px] text-[#5C6E88]"> 
                CONFIDENCE 
              </span> 
            </div> 
 
            <p className="mt-1 font-mono-data text-sm text-[#2FE0C7]"> 
              {eta?.confidence ?? "--"}% 
            </p> 
 
            <div className="mt-2 h-1 rounded-full bg-[#16233A] overflow-hidden"> 
              <div 
                className="h-full rounded-full bg-[#2FE0C7] transition-all duration-1000" 
                style={{ 
                  width: `${eta?.confidence ?? 0}%`, 
                }} 
              /> 
            </div> 
          </div> 
 
        </div> 
 
       
 
         
 
      </div> 
 
      {/* Small floating status */} 
      <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-xl border border-[#1B2B44] bg-[#0B1526] px-4 py-3 shadow-xl"> 
 
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2FE0C7]/10"> 
          <BrainCircuit className="h-4 w-4 text-[#2FE0C7]" /> 
        </div> 
 
        <div> 
          <p className="font-mono-data text-[9px] text-[#5C6E88]"> 
            PREDICTION ENGINE 
          </p> 
 
          <p className="text-xs font-medium text-[#E8EEF7]"> 
            Continuously recalculating 
          </p> 
        </div> 
 
      </div> 
 
    </div> 
 
  </div> 
 
 
  {/* Signature: animated pulse route line */} 
  <div className="relative mt-20 h-16 max-w-5xl"> 
 
    <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#22344F] to-transparent" /> 
 
    {[6, 24, 42, 58, 76, 94].map((pos, i) => ( 
      <div 
        key={i} 
        className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full border border-[#2FE0C7]/60 bg-[#0B1526]" 
        style={{ left: `${pos}%` }} 
      /> 
    ))} 
 
    <div 
      className="motion-safe:animate-[travel_4s_linear_infinite] absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#2FE0C7] shadow-[0_0_12px_3px_rgba(47,224,199,0.55)]" 
      style={{ left: "0%" }} 
    /> 
 
    <p className="font-mono-data absolute -bottom-1 left-0 text-[11px] text-[#5C6E88]"> 
      live position → predicted arrival, recalculated continuously 
    </p> 
 
  </div> 
</section> 
   
      {/* Live ETA */} 

 
      {/* Stats */} 
      {/* Stats */} 
<section id="operations" className="px-6 sm:px-10 pb-20"> 
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4"> 
          {stats.map(({ icon: Icon, value, label, suffix }) => ( 
            <div 
              key={label} 
              className="rounded-xl border border-[#16233A] bg-[#0B1526] p-5 transition hover:border-[#22344F]" 
            > 
              <Icon className="w-5 h-5 text-[#2FE0C7]" strokeWidth={1.75} /> 
              <div className="font-mono-data mt-3 text-3xl font-semibold text-[#E8EEF7]"> 
                {value} 
                <span className="text-lg text-[#5EEAD4]">{suffix}</span> 
              </div> 
              <div className="mt-1 text-sm text-[#8FA3C0]">{label}</div> 
            </div> 
          ))} 
        </div> 
        <p className="mt-4 text-xs text-[#5C6E88]"> 
          Figures shown are simulated for this SIH 2026 prototype and are not 
          live Indian Railways data. 
        </p> 
      </section> 
      {/* Network Monitoring */} 
<section className="px-6 sm:px-10 pb-24"> 
  <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-6"> 
    <div className="flex items-center gap-2"> 
      <Radar className="w-5 h-5 text-[#2FE0C7]" /> 
      <span className="font-mono-data text-xs tracking-wider text-[#5EEAD4]"> 
        NETWORK MONITORING 
      </span> 
    </div> 
 
    <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold"> 
      Railway Network Status 
    </h2> 
 
    <p className="mt-2 text-sm text-[#8FA3C0]"> 
      Simulated network conditions for the SIH 2026 prototype. 
    </p> 
 
    <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4"> 
 
      <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-4"> 
        <p className="text-xs text-[#5C6E88]">ACTIVE TRAINS</p> 
        <p className="mt-2 font-mono-data text-2xl text-[#2FE0C7]"> 
          128 
        </p> 
        <p className="mt-1 text-xs text-[#5C6E88]"> 
          Currently monitored 
        </p> 
      </div> 
 
      <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-4"> 
        <p className="text-xs text-[#5C6E88]">DELAYED TRAINS</p> 
        <p className="mt-2 font-mono-data text-2xl text-[#FFB238]"> 
          17 
        </p> 
        <p className="mt-1 text-xs text-[#5C6E88]"> 
          Requiring attention 
        </p> 
      </div> 
 
      <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-4"> 
        <p className="text-xs text-[#5C6E88]">STATIONS</p> 
        <p className="mt-2 font-mono-data text-2xl text-[#E8EEF7]"> 
          42 
        </p> 
        <p className="mt-1 text-xs text-[#5C6E88]"> 
          Network monitored 
        </p> 
      </div> 
 
      <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-4"> 
        <p className="text-xs text-[#5C6E88]">PREDICTIONS</p> 
        <p className="mt-2 font-mono-data text-2xl text-[#2FE0C7]"> 
          3,540 
        </p> 
        <p className="mt-1 text-xs text-[#5C6E88]"> 
          Generated today 
        </p> 
      </div> 
 
    </div> 
  </div> 
</section> 
{/* AI Prediction Analysis */} 
<section className="px-6 sm:px-10 pb-24"> 
  <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-6"> 
 
    <div className="flex items-center gap-2"> 
      <BrainCircuit className="w-5 h-5 text-[#2FE0C7]" /> 
      <span className="font-mono-data text-xs tracking-wider text-[#5EEAD4]"> 
        AI PREDICTION ANALYSIS 
      </span> 
    </div> 
 
    <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold"> 
      Factors influencing ETA 
    </h2> 
 
    <p className="mt-2 text-sm text-[#8FA3C0]"> 
      The prediction engine evaluates current train conditions before 
      generating the expected arrival time. 
    </p> 
 
    <div className="mt-8 grid sm:grid-cols-2 gap-5"> 
 
      {/* Speed */} 
      <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5"> 
        <div className="flex justify-between"> 
          <span className="text-sm text-[#8FA3C0]"> 
            Train Speed 
          </span> 
          <span className="font-mono-data text-sm text-[#2FE0C7]"> 
            {eta?.speed_kmph ?? "--"} km/h 
          </span> 
        </div> 
 
        <div className="mt-3 h-2 rounded-full bg-[#16233A] overflow-hidden"> 
          <div 
            className="h-full rounded-full bg-[#2FE0C7]" 
            style={{ 
              width: `${Math.min(100, ((eta?.speed_kmph ?? 0) / 120) * 100)}%`, 
            }} 
          /> 
        </div> 
      </div> 
 
      {/* Delay */} 
      <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5"> 
        <div className="flex justify-between"> 
          <span className="text-sm text-[#8FA3C0]"> 
            Current Delay 
          </span> 
          <span className="font-mono-data text-sm text-[#FFB238]"> 
            {eta?.delay_minutes ?? "--"} min 
          </span> 
        </div> 
 
        <div className="mt-3 h-2 rounded-full bg-[#16233A] overflow-hidden"> 
          <div 
            className="h-full rounded-full bg-[#FFB238]" 
            style={{ 
              width: `${Math.min(100, ((eta?.delay_minutes ?? 0) / 30) * 100)}%`, 
            }} 
          /> 
        </div> 
      </div> 
 
      {/* Confidence */} 
      <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5"> 
        <div className="flex justify-between"> 
          <span className="text-sm text-[#8FA3C0]"> 
            AI Confidence 
          </span> 
          <span className="font-mono-data text-sm text-[#2FE0C7]"> 
            {eta?.confidence ?? "--"}% 
          </span> 
        </div> 
 
        <div className="mt-3 h-2 rounded-full bg-[#16233A] overflow-hidden"> 
          <div 
            className="h-full rounded-full bg-[#2FE0C7]" 
            style={{ 
              width: `${eta?.confidence ?? 0}%`, 
            }} 
          /> 
        </div> 
      </div> 
 
      {/* Progress */} 
      <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5"> 
        <div className="flex justify-between"> 
          <span className="text-sm text-[#8FA3C0]"> 
            Route Progress 
          </span> 
          <span className="font-mono-data text-sm text-[#2FE0C7]"> 
            {eta?.progress_percent ?? "--"}% 
          </span> 
        </div> 
 
        <div className="mt-3 h-2 rounded-full bg-[#16233A] overflow-hidden"> 
          <div 
            className="h-full rounded-full bg-[#2FE0C7]" 
            style={{ 
              width: `${eta?.progress_percent ?? 0}%`, 
            }} 
          /> 
        </div> 
      </div> 
 
    </div> 
  </div> 
</section> 
 
      {/* How it works */} 
      <section className="px-6 sm:px-10 pb-24 border-t border-[#16233A] pt-16"> 
        <h2 className="font-display text-2xl sm:text-3xl font-semibold">How it works</h2> 
        <div className="mt-6 flex flex-wrap items-center gap-3 font-mono-data text-xs"> 
  <span className="rounded-md border border-[#22344F] bg-[#101F35] px-3 py-2 text-[#8FA3C0]"> 
    LIVE DATA 
  </span> 
 
  <ArrowRight className="w-4 h-4 text-[#2FE0C7]" /> 
 
  <span className="rounded-md border border-[#22344F] bg-[#101F35] px-3 py-2 text-[#8FA3C0]"> 
    AI MODEL 
  </span> 
 
  <ArrowRight className="w-4 h-4 text-[#2FE0C7]" /> 
 
  <span className="rounded-md border border-[#22344F] bg-[#101F35] px-3 py-2 text-[#8FA3C0]"> 
    ETA 
  </span> 
 
  <ArrowRight className="w-4 h-4 text-[#2FE0C7]" /> 
 
  <span className="rounded-md border border-[#22344F] bg-[#101F35] px-3 py-2 text-[#8FA3C0]"> 
    PASSENGERS 
  </span> 
</div> 
        <p className="mt-2 max-w-xl text-[#8FA3C0]"> 
          Every predicted ETA moves through the same four-stage pipeline, from 
          raw running data to the officer's dashboard. 
        </p> 
 
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"> 
          {steps.map(({ icon: Icon, title, body }, i) => ( 
            <div key={title} className="relative rounded-xl border border-[#16233A] bg-[#0B1526] p-5"> 
              <span className="font-mono-data text-xs text-[#3A5170]">0{i + 1}</span> 
              <Icon className="w-5 h-5 mt-2 text-[#2FE0C7]" strokeWidth={1.75} /> 
              <h3 className="mt-3 font-medium text-[#E8EEF7]">{title}</h3> 
              <p className="mt-2 text-sm leading-relaxed text-[#8FA3C0]">{body}</p> 
              {i < steps.length - 1 && ( 
                <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3A5170]" /> 
              )} 
            </div> 
          ))} 
        </div> 
      </section> 
 
      <footer className="px-6 sm:px-10 py-6 border-t border-[#16233A] flex flex-wrap items-center justify-between gap-2 text-xs text-[#5C6E88]"> 
        <span className="font-mono-data">RAILPULSE AI · SIH 2026 PROTOTYPE</span> 
        <span className="flex items-center gap-1.5"> 
          <Radio className="w-3.5 h-3.5" /> 
          Demo/Simulated Data 
        </span> 
      </footer> 
    </div> 
  ); 
} 