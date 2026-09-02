// import React, { useEffect, useState } from "react";
// import {
//   LayoutDashboard,
//   TrainFront,
//   Clock,
//   AlertTriangle,
//   Activity,
// } from "lucide-react";
// import { getETA } from "../services/api";

// export default function Dashboard() {
//   const [eta, setEta] = useState(null);

//   useEffect(() => {
//     const loadETA = () => {
//       const selectedTrain =
//         localStorage.getItem("selectedTrain") || "12627";

//       getETA(selectedTrain).then((data) => {
//         setEta(data);
//       });
//     };

//     loadETA();

//     const interval = setInterval(loadETA, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#060B14] text-[#E8EEF7] px-6 sm:px-10 py-10">

//       {/* Header */}
//       <div className="flex items-center gap-2">
//         <LayoutDashboard className="w-6 h-6 text-[#2FE0C7]" />

//         <h1 className="text-3xl font-semibold">
//           Operations Dashboard
//         </h1>
//       </div>

//       <p className="mt-2 text-[#8FA3C0]">
//         Real-time overview of simulated railway operations.
//       </p>
//       <div className="mt-4 flex items-center gap-2 text-xs text-[#5C6E88]">
//   <span className="h-2 w-2 rounded-full bg-[#2FE0C7] animate-pulse"></span>
//   LIVE MODEL UPDATE · REFRESHING EVERY 10 SECONDS
// </div>

//       {/* Main stats */}
//       <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">

//         <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-5">
//           <TrainFront className="w-5 h-5 text-[#2FE0C7]" />

//           <p className="mt-3 text-xs text-[#5C6E88]">
//             ACTIVE TRAIN
//           </p>

//           <p className="mt-1 text-xl font-semibold">
//             {eta?.train || "Loading..."}
//           </p>
//         </div>

//         <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-5">
//           <Activity className="w-5 h-5 text-[#2FE0C7]" />

//           <p className="mt-3 text-xs text-[#5C6E88]">
//             CURRENT SPEED
//           </p>

//           <p className="mt-1 text-2xl font-semibold">
//             {eta?.speed_kmph ?? "--"} km/h
//           </p>
//         </div>

//         <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-5">
//           <Clock className="w-5 h-5 text-[#2FE0C7]" />

//           <p className="mt-3 text-xs text-[#5C6E88]">
//             PREDICTED ETA
//           </p>

//           <p className="mt-1 text-2xl font-semibold text-[#2FE0C7]">
//             {eta?.predicted_arrival || "--"}
//           </p>
//         </div>

//         <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-5">
//           <AlertTriangle className="w-5 h-5 text-[#FFB238]" />

//           <p className="mt-3 text-xs text-[#5C6E88]">
//             DELAY
//           </p>

//      <p
//   className={`mt-1 text-2xl font-semibold ${
//     (eta?.delay_minutes ?? 0) > 0
//       ? "text-red-400"
//       : "text-green-400"
//   }`}
// >
//   {eta?.delay_minutes ?? "--"} min
// </p>
// <p
//   className={`mt-2 text-xs font-medium ${
//     eta?.risk === "Low"
//       ? "text-green-400"
//       : eta?.risk === "Medium"
//       ? "text-yellow-400"
//       : eta?.risk === "High"
//       ? "text-red-400"
//       : "text-[#8FA3C0]"
//   }`}
// >
//   Risk: {eta?.risk || "Calculating..."}
// </p>
//         </div>

//       </div>

//       {/* Train status */}
//       <div className="mt-6 rounded-xl border border-[#16233A] bg-[#0B1526] p-6">

//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-xs text-[#5C6E88]">
//               CURRENT TRAIN STATUS
//             </p>

//             <h2 className="mt-2 text-2xl font-semibold">
//               {eta?.train || "Loading..."}
//             </h2>
//           </div>

// <span
//   className={`rounded-full px-3 py-1 text-xs font-medium ${
//     eta?.status === "On Time"
//       ? "bg-green-500 text-white"
//       : eta?.status === "Slight Delay"
//       ? "bg-yellow-500 text-black"
//       : eta?.status === "Delayed"
//       ? "bg-red-500 text-white"
//       : "bg-yellow-500 text-white"
//   }`}
// >
//   {eta?.status || "Loading"}
// </span></div>

//         {/* Progress */}
//         <div className="mt-8">

//           <div className="flex justify-between text-xs text-[#5C6E88]">
//             <span>{eta?.source || "Departure"}</span>
//             <span>{eta?.destination || "Arrival"}</span>
//           </div>

//           <div className="mt-3 h-4 w-full rounded-full bg-[#16233A] overflow-hidden">

//             <div
//               className="h-full rounded-full bg-[#2FE0C7] transition-all duration-700"
//               style={{
//                 width: `${eta?.progress_percent ?? 0}%`,
//               }}
//             ></div>

//           </div>

//           <div className="mt-3 flex justify-between text-xs text-[#5C6E88]">
//             <span>
//               Progress: {eta?.progress_percent ?? 0}%
//             </span>

//             <span>
//               Confidence: {eta?.confidence ?? "--"}%
//             </span>
//             <span>
//   Delay: {eta?.delay_minutes ?? "--"} min
// </span>
//           </div>

//         </div>

//       </div>

//       {/* Disclaimer */}
//       <p className="mt-6 text-xs text-[#5C6E88]">
//         Dashboard data is simulated for the SIH 2026 prototype and does not
//         represent live Indian Railways data.
//       </p>

//     </div>
//   );
// }