// import React, { useEffect, useState } from "react";
// import { getETA } from "../services/api";
// import { TrainFront, MapPinned, Gauge, Clock } from "lucide-react";

// export default function Tracking() {
//     const [eta, setEta] = useState(null);

// useEffect(() => {
// const loadETA = () => {
//   const selectedTrain =
//     localStorage.getItem("selectedTrain") || "12627";

//   getETA(selectedTrain).then((data) => {
//     setEta(data);
//   });
// };

//   loadETA();

//   const interval = setInterval(loadETA, 10000);

//   return () => clearInterval(interval);
// }, []);
//   return (
//     <div className="min-h-screen bg-[#060B14] text-[#E8EEF7] px-6 sm:px-10 py-10">

//       <div className="flex items-center gap-2">
//         <TrainFront className="w-6 h-6 text-[#2FE0C7]" />
//         <h1 className="text-3xl font-semibold">
//           Train Tracking
//         </h1>
//       </div>

//       <p className="mt-2 text-[#8FA3C0]">
//         Monitor train position, speed and predicted arrival in real time.
//       </p>

//       <div className="mt-8 rounded-xl border border-[#16233A] bg-[#0B1526] p-6">

//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <p className="text-xs text-[#5C6E88]">
//               SELECTED TRAIN
//             </p>

//             <h2 className="mt-2 text-2xl font-semibold">
//               {eta?.train || "Loading train..."}
//             </h2>
//           </div>

//           <span className="rounded-full border border-[#2FE0C7]/30 bg-[#2FE0C7]/10 px-3 py-1 text-xs text-[#2FE0C7]">
//             LIVE TRACKING
//           </span>
//         </div>

//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">

//           <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">
//             <Gauge className="w-5 h-5 text-[#2FE0C7]" />
//             <p className="mt-3 text-xs text-[#5C6E88]">
//               CURRENT SPEED
//             </p>
//             <p className="mt-1 text-2xl font-semibold">
//               {eta?.speed_kmph ?? "--"} km/h
//             </p>
//           </div>

//           <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">
//             <Clock className="w-5 h-5 text-[#2FE0C7]" />
//             <p className="mt-3 text-xs text-[#5C6E88]">
//               PREDICTED ARRIVAL
//             </p>
//             <p className="mt-1 text-2xl font-semibold text-[#2FE0C7]">
//               {eta?.predicted_arrival || "--"}
//             </p>
//           </div>

//           <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">
//             <MapPinned className="w-5 h-5 text-[#2FE0C7]" />
//             <p className="mt-3 text-xs text-[#5C6E88]">
//               ROUTE PROGRESS
//             </p>
//             <p className="mt-1 text-2xl font-semibold">
//               {eta?.progress_percent ?? 0}%
//             </p>
//           </div>

//         </div>

//         <div className="mt-8">
//           <p className="text-xs text-[#5C6E88]">
//             ROUTE
//           </p>

//           <div className="mt-3 h-4 w-full rounded-full bg-[#16233A] overflow-hidden">
//             <div
//               className="h-full rounded-full bg-[#2FE0C7]"
//               style={{ width: `${eta?.progress_percent ?? 0}%` }}
//             ></div>
//           </div>

//           <div className="mt-2 flex justify-between text-xs text-[#5C6E88]">
//   <span>{eta?.source || "--"}</span>
//   <span>{eta?.destination || "--"}</span>
// </div>
//         </div>

//       </div>
//     </div>
//   );
// }