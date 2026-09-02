
// import React, { useEffect, useState } from "react";
// import { getETA } from "../services/api";
// import {
//   TrainFront,
//   Radar,
//   MapPinned,
//   BrainCircuit,
//   Target,
//   ArrowRight,
//   LayoutDashboard,
//   Database,
//   Cpu,
//   TrendingUp,
//   Users,
//   Radio,
// } from "lucide-react";

// const stats = [
//   { icon: Radar, value: "128", label: "Active trains", suffix: "" },
//   { icon: MapPinned, value: "42", label: "Stations monitored", suffix: "" },
//   { icon: BrainCircuit, value: "3,540", label: "ETA predictions today", suffix: "" },
//   { icon: Target, value: "91.4", label: "Prediction accuracy", suffix: "%" },
// ];

// const steps = [
//   {
//     icon: Database,
//     title: "Live conditions captured",
//     body: "Position, speed, delay, and upcoming halts are read from the train's current running data.",
//   },
//   {
//     icon: Cpu,
//     title: "Model recalculates",
//     body: "A trained ML model re-scores the route segment the moment any input changes.",
//   },
//   {
//     icon: TrendingUp,
//     title: "ETA updates instantly",
//     body: "The predicted arrival time shifts to reflect what's actually happening on the line.",
//   },
//   {
//     icon: Users,
//     title: "Reaches passengers & officers",
//     body: "The same forecast reaches the passenger tracking view and the operations dashboard together.",
//   },
// ];

// export default function App() {
//   const [eta, setEta] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [selectedTrain, setSelectedTrain] = useState(
//   localStorage.getItem("selectedTrain") || "12627"
// );
// const refreshETA = () => {
//   getETA(selectedTrain).then((data) => {
//     setEta(data);
//     setLastUpdated(new Date().toLocaleTimeString());
//   });
// };
// useEffect(() => {
//   const loadETA = () => {
//     getETA(selectedTrain).then((data) => {
//       setEta(data);
//       setLastUpdated(new Date().toLocaleTimeString());
//     });
//   };

//   loadETA();

//   const interval = setInterval(loadETA, 10000);

//   return () => clearInterval(interval);
// }, [selectedTrain]);
//   return (
//     <div className="min-h-screen bg-[#060B14] text-[#E8EEF7] selection:bg-[#2FE0C7] selection:text-[#060B14]">
//       <style>{`
//         @keyframes travel {
//           0%   { left: -2%; opacity: 0; }
//           8%   { opacity: 1; }
//           92%  { opacity: 1; }
//           100% { left: 100%; opacity: 0; }
//         }
//         .font-display { font-family: 'Rajdhani', 'Inter', sans-serif; }
//         .font-mono-data { font-family: 'JetBrains Mono', ui-monospace, monospace; }
//         body { font-family: 'Inter', sans-serif; }
//       `}</style>

//       {/* Top bar */}
//       <header className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-10 py-5 border-b border-[#16233A]">
//         <div className="flex items-center gap-2">
//           <TrainFront className="w-6 h-6 text-[#2FE0C7]" strokeWidth={1.75} />
//           <span className="font-display text-lg tracking-wide font-semibold">RailPulse AI</span>
//         </div>
//         <div className="flex items-center gap-2 rounded-full border border-[#22D3B0]/30 bg-[#0B1526] px-3 py-1.5">
//           <span className="relative flex h-2 w-2">
//             <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB238] opacity-75" />
//             <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFB238]" />
//           </span>
//           <span className="font-mono-data text-[11px] tracking-wider text-[#FFB238]">
//             DEMO MODE — SIMULATED DATA
//           </span>
//         </div>
//       </header>

//       {/* Hero */}
//       <section className="relative overflow-hidden px-6 sm:px-10 pt-16 pb-20 sm:pt-24 sm:pb-28">
//         <div className="max-w-3xl">
//           <span className="font-mono-data text-xs tracking-[0.25em] text-[#5EEAD4]">
//             SIH 2026 PROTOTYPE
//           </span>
//           <h1 className="font-display mt-4 text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight">
//             RailPulse <span className="text-[#2FE0C7]">AI</span>
//           </h1>
//           <p className="mt-4 text-xl sm:text-2xl text-[#B9C7DD] font-display font-medium">
//             Dynamic Train ETA Intelligence Platform
//           </p>
//           <p className="mt-5 max-w-xl text-[#8FA3C0] leading-relaxed">
//             AI-assisted, real-time ETA forecasting that recalculates the moment a
//             train's speed, delay, or stops change — for smarter, more reliable
//             passenger information.
//           </p>

//           <div className="mt-8 flex flex-col sm:flex-row gap-4">
//            <button
//   onClick={() => document.getElementById("live-eta")?.scrollIntoView({ behavior: "smooth" })}
//   className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#2FE0C7] px-6 py-3 font-medium text-[#06251F] transition hover:bg-[#5EEAD4]"
// >
//               Track a Train
//               <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
//             </button>
//            <button
//   onClick={() => document.getElementById("operations")?.scrollIntoView({ behavior: "smooth" })}
//   className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#22344F] bg-[#0B1526] px-6 py-3 font-medium text-[#E8EEF7] transition hover:border-[#2FE0C7]/50 hover:bg-[#101F35]"
// >
//   <LayoutDashboard className="w-4 h-4" />
//   Operations Dashboard
// </button>
//           </div>
//         </div>

//         {/* Signature: animated pulse route line */}
//         <div className="relative mt-20 h-16 max-w-5xl">
//           <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#22344F] to-transparent" />
//           {[6, 24, 42, 58, 76, 94].map((pos, i) => (
//             <div
//               key={i}
//               className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full border border-[#2FE0C7]/60 bg-[#0B1526]"
//               style={{ left: `${pos}%` }}
//             />
//           ))}
//           <div
//             className="motion-safe:animate-[travel_4s_linear_infinite] absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#2FE0C7] shadow-[0_0_12px_3px_rgba(47,224,199,0.55)]"
//             style={{ left: "0%" }}
//           />
//           <p className="font-mono-data absolute -bottom-1 left-0 text-[11px] text-[#5C6E88]">
//             live position → predicted arrival, recalculated continuously
//           </p>
//         </div>
//       </section>
//       {/* Live ETA */}
// {eta && (
//   <section id="live-eta" className="px-6 sm:px-10 pb-10">
//     <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-6">
//       <div className="flex items-center gap-2">
//         <TrainFront className="w-5 h-5 text-[#2FE0C7]" />
//         <span className="font-mono-data text-xs tracking-wider text-[#5EEAD4]">
//           LIVE ETA PREDICTION
//         </span>
//         <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#2FE0C7]/30 bg-[#2FE0C7]/10 px-3 py-1">
//   <span className="h-2 w-2 rounded-full bg-[#2FE0C7] animate-pulse"></span>
//   <span className="font-mono-data text-[11px] text-[#2FE0C7]">
//     AI MODEL ACTIVE
//   </span>
// </div>
//         {lastUpdated && (
//   <span className="ml-auto font-mono-data text-[10px] text-[#5C6E88]">
//     Updated {lastUpdated}
//   </span>
// )}
// <span className="flex items-center gap-1.5 ml-3 font-mono-data text-[10px] text-[#2FE0C7]">
//   <span className="h-1.5 w-1.5 rounded-full bg-[#2FE0C7] animate-pulse"></span>
//   SYSTEM ONLINE
// </span>
//       </div>

//      <div className="mt-3">
//   <h2 className="text-2xl font-semibold">
//     {eta.train}
//   </h2>

//   <p className="mt-1 font-mono-data text-xs text-[#5C6E88]">
    
//   TRAIN ID: {selectedTrain}
// </p>
  
// </div>
//       <button
//   onClick={refreshETA}
//   className="mt-4 rounded-lg border border-[#22344F] bg-[#101F35] px-4 py-2 text-sm font-medium text-[#E8EEF7] transition hover:border-[#2FE0C7]/50"
// >
//   Refresh ETA
// </button>

//       <p className="mt-2 text-[#8FA3C0]">
//         {eta.source} → {eta.destination}
//       </p>
//       <div className="mt-5">
//   <label className="font-mono-data text-xs text-[#5C6E88]">
//     SELECT TRAIN
//   </label>

// <select
//   value={selectedTrain}
//   onChange={(e) => {
//     const train = e.target.value;

//     setSelectedTrain(train);
//     localStorage.setItem("selectedTrain", train);

//     getETA(train).then((data) => {
//       setEta(data);
//       setLastUpdated(new Date().toLocaleTimeString());
//     });
//   }}
//   className="mt-2 w-full sm:w-auto rounded-lg border border-[#22344F] bg-[#101F35] px-4 py-2 text-sm text-[#E8EEF7] outline-none focus:border-[#2FE0C7]"
// >
  
//     <option value="12627">12627 — Karnataka Express</option>
//     <option value="12628">12628 — Karnataka Express</option>
//     <option value="12007">12007 — Shatabdi Express</option>
//   </select>
// </div>
//  <div className="mt-6">
//   <div className="flex justify-between text-xs text-[#5C6E88]">
//     <span>{eta.source}</span>
//     <span>{eta.destination}</span>
//   </div>

//   <div
//     style={{
//       position: "relative",
//       width: "100%",
//       height: "20px",
//       backgroundColor: "#16233A",
//       borderRadius: "10px",
//       marginTop: "16px",
//     }}
//   >
//     {/* Progress */}
//     <div
//       style={{
//         width: `${eta.progress_percent}%`,
//         height: "20px",
//         backgroundColor: "#2FE0C7",
//         borderRadius: "10px",
//       }}
//     ></div>

//     {/* Train */}
//     <div
//       style={{
//         position: "absolute",
//         top: "50%",
//         left: `${eta.progress_percent}%`,
//         transform: "translate(-50%, -50%)",
//         width: "30px",
//         height: "30px",
//         borderRadius: "50%",
//         backgroundColor: "#060B14",
//         border: "2px solid #2FE0C7",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <TrainFront
//         style={{
//           width: "16px",
//           height: "16px",
//           color: "#2FE0C7",
//         }}
//       />
//     </div>
//   </div>

//   <div className="mt-3 flex justify-between text-[11px] text-[#5C6E88]">
//     <span>Departure</span>
//     <span>Speed: {eta.speed_kmph} km/h</span>
//     <span>Arrival</span>
//   </div>
// </div>
// <div
//   className={`mt-3 inline-flex rounded-full px-3 py-1 ${
//     eta?.status === "On Time"
//       ? "border border-green-500/30 bg-green-500/10"
//       : eta?.status === "Slight Delay"
//       ? "border border-yellow-500/30 bg-yellow-500/10"
//       : "border border-red-500/30 bg-red-500/10"
//   }`}
// >
//   <span
//     className={`font-mono-data text-xs ${
//       eta?.status === "On Time"
//         ? "text-green-400"
//         : eta?.status === "Slight Delay"
//         ? "text-yellow-400"
//         : "text-red-400"
//     }`}
//   >
//     {eta?.status}
//   </span>
// </div>

//      <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-4">
//         <div>
//           <p className="text-xs text-[#5C6E88]">Scheduled</p>
//           <p className="mt-1 font-mono-data">{eta.scheduled_arrival}</p>
//         </div>

//         <div>
//           <p className="text-xs text-[#5C6E88]">Predicted</p>
//           <p className="mt-1 font-mono-data text-[#2FE0C7]">
//             {eta.predicted_arrival}
//           </p>
//         </div>

//         <div>
//           <p className="text-xs text-[#5C6E88]">Delay</p>
//           <p className="mt-1 font-mono-data">
//             {eta.delay_minutes} min
//           </p>
//         </div>

//         <div>
//           <p className="text-xs text-[#5C6E88]">Confidence</p>
//           <p className="mt-1 font-mono-data">
//             {eta.confidence}%
//           </p>
//         </div>
//         <div>
//   <p className="text-xs text-[#5C6E88]">Speed</p>
//   <p className="mt-1 font-mono-data">
//     {eta.speed_kmph} km/h
//   </p>
// </div>
//       </div>
//     </div>
//   </section>
// )}
// {/* AI Prediction */}
// <section className="px-6 sm:px-10 pb-10">
//   <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-6">

//     <div className="flex items-center gap-2">
//       <BrainCircuit className="w-5 h-5 text-[#2FE0C7]" />
//       <span className="font-mono-data text-xs tracking-wider text-[#5EEAD4]">
//         AI PREDICTION ENGINE
//       </span>
//     </div>

//     <div className="mt-5 grid sm:grid-cols-3 gap-4">

//       <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-4">
//         <p className="text-xs text-[#5C6E88]">Predicted ETA</p>
//         <p className="mt-2 text-2xl font-semibold text-[#2FE0C7]">
//           {eta?.predicted_arrival || "--"}
//         </p>
//       </div>

//       <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-4">
//         <p className="text-xs text-[#5C6E88]">Prediction Confidence</p>
//         <p className="mt-2 text-2xl font-semibold">
//           {eta?.confidence || "--"}%
//         </p>
//       </div>

//       <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-4">
//         <p className="text-xs text-[#5C6E88]">Delay Risk</p>
//         <p
//   className={`mt-2 text-2xl font-semibold ${
//     eta?.risk === "Low"
//       ? "text-green-400"
//       : eta?.risk === "Medium"
//       ? "text-yellow-400"
//       : eta?.risk === "High"
//       ? "text-red-400"
//       : "text-[#8FA3C0]"
//   }`}
// >
//   {eta?.risk || "--"}
// </p>
//       </div>

//     </div>

//     <div className="mt-5 rounded-lg border border-[#16233A] bg-[#101F35] p-4">
//       <p className="text-sm font-medium text-[#E8EEF7]">
//         Prediction factors
//       </p>

//       <div className="mt-3 flex flex-wrap gap-2">
//         <span className="rounded-full bg-[#16233A] px-3 py-1 text-xs text-[#8FA3C0]">
//           Speed: {eta?.speed_kmph} km/h
//         </span>

//         <span className="rounded-full bg-[#16233A] px-3 py-1 text-xs text-[#8FA3C0]">
//           Current delay: {eta?.delay_minutes} min
//         </span>

//         <span className="rounded-full bg-[#16233A] px-3 py-1 text-xs text-[#8FA3C0]">
//           Route progress: {eta?.progress_percent}%
//         </span>
//       </div>
//     </div>

//   </div>
// </section>

//       {/* Stats */}
//       {/* Stats */}
// <section id="operations" className="px-6 sm:px-10 pb-20">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {stats.map(({ icon: Icon, value, label, suffix }) => (
//             <div
//               key={label}
//               className="rounded-xl border border-[#16233A] bg-[#0B1526] p-5 transition hover:border-[#22344F]"
//             >
//               <Icon className="w-5 h-5 text-[#2FE0C7]" strokeWidth={1.75} />
//               <div className="font-mono-data mt-3 text-3xl font-semibold text-[#E8EEF7]">
//                 {value}
//                 <span className="text-lg text-[#5EEAD4]">{suffix}</span>
//               </div>
//               <div className="mt-1 text-sm text-[#8FA3C0]">{label}</div>
//             </div>
//           ))}
//         </div>
//         <p className="mt-4 text-xs text-[#5C6E88]">
//           Figures shown are simulated for this SIH 2026 prototype and are not
//           live Indian Railways data.
//         </p>
//       </section>
//       {/* Network Monitoring */}
// <section className="px-6 sm:px-10 pb-24">
//   <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-6">
//     <div className="flex items-center gap-2">
//       <Radar className="w-5 h-5 text-[#2FE0C7]" />
//       <span className="font-mono-data text-xs tracking-wider text-[#5EEAD4]">
//         NETWORK MONITORING
//       </span>
//     </div>

//     <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold">
//       Railway Network Status
//     </h2>

//     <p className="mt-2 text-sm text-[#8FA3C0]">
//       Simulated network conditions for the SIH 2026 prototype.
//     </p>

//     <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">

//       <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-4">
//         <p className="text-xs text-[#5C6E88]">ACTIVE TRAINS</p>
//         <p className="mt-2 font-mono-data text-2xl text-[#2FE0C7]">
//           128
//         </p>
//         <p className="mt-1 text-xs text-[#5C6E88]">
//           Currently monitored
//         </p>
//       </div>

//       <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-4">
//         <p className="text-xs text-[#5C6E88]">DELAYED TRAINS</p>
//         <p className="mt-2 font-mono-data text-2xl text-[#FFB238]">
//           17
//         </p>
//         <p className="mt-1 text-xs text-[#5C6E88]">
//           Requiring attention
//         </p>
//       </div>

//       <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-4">
//         <p className="text-xs text-[#5C6E88]">STATIONS</p>
//         <p className="mt-2 font-mono-data text-2xl text-[#E8EEF7]">
//           42
//         </p>
//         <p className="mt-1 text-xs text-[#5C6E88]">
//           Network monitored
//         </p>
//       </div>

//       <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-4">
//         <p className="text-xs text-[#5C6E88]">PREDICTIONS</p>
//         <p className="mt-2 font-mono-data text-2xl text-[#2FE0C7]">
//           3,540
//         </p>
//         <p className="mt-1 text-xs text-[#5C6E88]">
//           Generated today
//         </p>
//       </div>

//     </div>
//   </div>
// </section>
// {/* AI Prediction Analysis */}
// <section className="px-6 sm:px-10 pb-24">
//   <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-6">

//     <div className="flex items-center gap-2">
//       <BrainCircuit className="w-5 h-5 text-[#2FE0C7]" />
//       <span className="font-mono-data text-xs tracking-wider text-[#5EEAD4]">
//         AI PREDICTION ANALYSIS
//       </span>
//     </div>

//     <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold">
//       Factors influencing ETA
//     </h2>

//     <p className="mt-2 text-sm text-[#8FA3C0]">
//       The prediction engine evaluates current train conditions before
//       generating the expected arrival time.
//     </p>

//     <div className="mt-8 grid sm:grid-cols-2 gap-5">

//       {/* Speed */}
//       <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">
//         <div className="flex justify-between">
//           <span className="text-sm text-[#8FA3C0]">
//             Train Speed
//           </span>
//           <span className="font-mono-data text-sm text-[#2FE0C7]">
//             {eta?.speed_kmph ?? "--"} km/h
//           </span>
//         </div>

//         <div className="mt-3 h-2 rounded-full bg-[#16233A] overflow-hidden">
//           <div
//             className="h-full rounded-full bg-[#2FE0C7]"
//             style={{
//               width: `${Math.min(100, ((eta?.speed_kmph ?? 0) / 120) * 100)}%`,
//             }}
//           />
//         </div>
//       </div>

//       {/* Delay */}
//       <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">
//         <div className="flex justify-between">
//           <span className="text-sm text-[#8FA3C0]">
//             Current Delay
//           </span>
//           <span className="font-mono-data text-sm text-[#FFB238]">
//             {eta?.delay_minutes ?? "--"} min
//           </span>
//         </div>

//         <div className="mt-3 h-2 rounded-full bg-[#16233A] overflow-hidden">
//           <div
//             className="h-full rounded-full bg-[#FFB238]"
//             style={{
//               width: `${Math.min(100, ((eta?.delay_minutes ?? 0) / 30) * 100)}%`,
//             }}
//           />
//         </div>
//       </div>

//       {/* Confidence */}
//       <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">
//         <div className="flex justify-between">
//           <span className="text-sm text-[#8FA3C0]">
//             AI Confidence
//           </span>
//           <span className="font-mono-data text-sm text-[#2FE0C7]">
//             {eta?.confidence ?? "--"}%
//           </span>
//         </div>

//         <div className="mt-3 h-2 rounded-full bg-[#16233A] overflow-hidden">
//           <div
//             className="h-full rounded-full bg-[#2FE0C7]"
//             style={{
//               width: `${eta?.confidence ?? 0}%`,
//             }}
//           />
//         </div>
//       </div>

//       {/* Progress */}
//       <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">
//         <div className="flex justify-between">
//           <span className="text-sm text-[#8FA3C0]">
//             Route Progress
//           </span>
//           <span className="font-mono-data text-sm text-[#2FE0C7]">
//             {eta?.progress_percent ?? "--"}%
//           </span>
//         </div>

//         <div className="mt-3 h-2 rounded-full bg-[#16233A] overflow-hidden">
//           <div
//             className="h-full rounded-full bg-[#2FE0C7]"
//             style={{
//               width: `${eta?.progress_percent ?? 0}%`,
//             }}
//           />
//         </div>
//       </div>

//     </div>
//   </div>
// </section>

//       {/* How it works */}
//       <section className="px-6 sm:px-10 pb-24 border-t border-[#16233A] pt-16">
//         <h2 className="font-display text-2xl sm:text-3xl font-semibold">How it works</h2>
//         <div className="mt-6 flex flex-wrap items-center gap-3 font-mono-data text-xs">
//   <span className="rounded-md border border-[#22344F] bg-[#101F35] px-3 py-2 text-[#8FA3C0]">
//     LIVE DATA
//   </span>

//   <ArrowRight className="w-4 h-4 text-[#2FE0C7]" />

//   <span className="rounded-md border border-[#22344F] bg-[#101F35] px-3 py-2 text-[#8FA3C0]">
//     AI MODEL
//   </span>

//   <ArrowRight className="w-4 h-4 text-[#2FE0C7]" />

//   <span className="rounded-md border border-[#22344F] bg-[#101F35] px-3 py-2 text-[#8FA3C0]">
//     ETA
//   </span>

//   <ArrowRight className="w-4 h-4 text-[#2FE0C7]" />

//   <span className="rounded-md border border-[#22344F] bg-[#101F35] px-3 py-2 text-[#8FA3C0]">
//     PASSENGERS
//   </span>
// </div>
//         <p className="mt-2 max-w-xl text-[#8FA3C0]">
//           Every predicted ETA moves through the same four-stage pipeline, from
//           raw running data to the officer's dashboard.
//         </p>

//         <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {steps.map(({ icon: Icon, title, body }, i) => (
//             <div key={title} className="relative rounded-xl border border-[#16233A] bg-[#0B1526] p-5">
//               <span className="font-mono-data text-xs text-[#3A5170]">0{i + 1}</span>
//               <Icon className="w-5 h-5 mt-2 text-[#2FE0C7]" strokeWidth={1.75} />
//               <h3 className="mt-3 font-medium text-[#E8EEF7]">{title}</h3>
//               <p className="mt-2 text-sm leading-relaxed text-[#8FA3C0]">{body}</p>
//               {i < steps.length - 1 && (
//                 <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3A5170]" />
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       <footer className="px-6 sm:px-10 py-6 border-t border-[#16233A] flex flex-wrap items-center justify-between gap-2 text-xs text-[#5C6E88]">
//         <span className="font-mono-data">RAILPULSE AI · SIH 2026 PROTOTYPE</span>
//         <span className="flex items-center gap-1.5">
//           <Radio className="w-3.5 h-3.5" />
//           Demo/Simulated Data
//         </span>
//       </footer>
//     </div>
//   );
// }