import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  TrainFront,
  Clock,
  AlertTriangle,
  Activity,
  MapPinned,
} from "lucide-react";
import { getETA } from "../services/api";

export default function Dashboard() {
  const [eta, setEta] = useState(null);
  const [etaHistory, setEtaHistory] = useState([]);

  useEffect(() => {
  const loadETA = async () => {
  const selectedTrain = sessionStorage.getItem("selectedTrain");

  // No train selected
  if (!selectedTrain) {
    setEta(null);
    return;
  }

  try {
    const parentTrain = sessionStorage.getItem("alternativeParentTrain");

    // If selected train is an alternative train
    if (parentTrain && parentTrain !== selectedTrain) {

      // Get main train data
      const parentData = await getETA(parentTrain);

      // Find selected alternative
      const alternativeData = parentData.alternatives?.find(
        (alternative) =>
          alternative.train_number === selectedTrain
      );

      if (alternativeData) {

        // Get alternative's live information
        const actualAlternativeData = await getETA(selectedTrain);

        // Combine correct alternative ETA with live data
        const data = {
          ...actualAlternativeData,

          scheduled_arrival: alternativeData.scheduled_arrival,
          predicted_arrival: alternativeData.predicted_arrival,
          delay_minutes: alternativeData.delay_minutes,
        };

        setEta(data);

        setEtaHistory((prev) => {
          const newItem = {
            time: new Date().toLocaleTimeString(),
            eta: data.predicted_arrival,
            delay: data.delay_minutes,
            confidence: data.confidence,
          };

          return [newItem, ...prev].slice(0, 6);
        });

        return;
      }
    }

    // Normal train
    const data = await getETA(selectedTrain);

    setEta(data);

    setEtaHistory((prev) => {
      const newItem = {
        time: new Date().toLocaleTimeString(),
        eta: data.predicted_arrival,
        delay: data.delay_minutes,
        confidence: data.confidence,
      };

      return [newItem, ...prev].slice(0, 6);
    });

  } catch (error) {
    console.error("Failed to load ETA:", error);
    setEta(null);
  }
};

  loadETA();

  const interval = setInterval(loadETA, 10000);

  return () => clearInterval(interval);
}, []);

  return (
<div className="min-h-screen bg-[#060B14] text-[#E8EEF7] px-6 sm:px-10 py-10">

      {/* Header */}
      <div className="flex items-center gap-2">
        <LayoutDashboard className="w-6 h-6 text-[#2FE0C7]" />

        <h1 className="text-3xl font-semibold">
          Operations Dashboard
        </h1>
      </div>

      <p className="mt-2 text-[#8FA3C0]">
        Real-time overview of simulated railway operations.
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-[#5C6E88]">
  <span className="h-2 w-2 rounded-full bg-[#2FE0C7] animate-pulse"></span>
  LIVE MODEL UPDATE · REFRESHING EVERY 10 SECONDS
</div>

      {/* Main stats */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-5">
          <TrainFront className="w-5 h-5 text-[#2FE0C7]" />

          <p className="mt-3 text-xs text-[#5C6E88]">
            ACTIVE TRAIN
          </p>

          <p className="mt-1 text-xl font-semibold">
            {eta?.train || "Loading..."}
          </p>
 
        </div>

        <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-5">
          <Activity className="w-5 h-5 text-[#2FE0C7]" />

          <p className="mt-3 text-xs text-[#5C6E88]">
            CURRENT SPEED
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {eta?.speed_kmph ?? "--"} km/h
          </p>
        </div>

        <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-5">
          <Clock className="w-5 h-5 text-[#2FE0C7]" />

          <p className="mt-3 text-xs text-[#5C6E88]">
            PREDICTED ETA
          </p>

          <p className="mt-1 text-2xl font-semibold text-[#2FE0C7]">
            {eta?.predicted_arrival || "--"}
          </p>
        </div>

        <div className="rounded-xl border border-[#16233A] bg-[#0B1526] p-5">
          <AlertTriangle className="w-5 h-5 text-[#FFB238]" />

          <p className="mt-3 text-xs text-[#5C6E88]">
            DELAY
          </p>

     <p
  className={`mt-1 text-2xl font-semibold ${
    (eta?.delay_minutes ?? 0) > 0
      ? "text-red-400"
      : "text-green-400"
  }`}
>
  {eta?.delay_minutes ?? "--"} min
</p>
<p
  className={`mt-2 text-xs font-medium ${
    eta?.risk === "Low"
      ? "text-green-400"
      : eta?.risk === "Medium"
      ? "text-yellow-400"
      : eta?.risk === "High"
      ? "text-red-400"
      : "text-[#8FA3C0]"
  }`}
>
  Risk: {eta?.risk || "Calculating..."}
</p>
        </div>

      </div>

      {/* Train status */}
      <div className="mt-6 rounded-xl border border-[#16233A] bg-[#0B1526] p-6">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#5C6E88]">
              CURRENT TRAIN STATUS
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              {eta?.train || "Loading..."}
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-[#8FA3C0]">
  <MapPinned className="w-4 h-4 text-[#2FE0C7]" />

  <span>{eta?.source || "--"}</span>

  <span className="text-[#2FE0C7]">→</span>

  <span>{eta?.destination || "--"}</span>
</p>
   
  
          </div>

<span
  className={`rounded-full px-3 py-1 text-xs font-medium ${
    eta?.status === "On Time"
      ? "bg-green-500 text-white"
      : eta?.status === "Slight Delay"
      ? "bg-yellow-500 text-black"
      : eta?.status === "Delayed"
      ? "bg-red-500 text-white"
      : "bg-yellow-500 text-white"
  }`}
>
  {eta?.status || "Loading"}
</span></div>

       {/* Progress and Stations */}
{/* Live Route */}
<div className="mt-8">

  <div className="flex justify-between mb-6">
    <p className="text-xs text-[#5C6E88]">LIVE ROUTE</p>

    <p className="text-xs text-[#2FE0C7]">
      {eta?.status}
    </p>
  </div>

  {/* Route Bar */}
  <div className="relative">

    {/* Background Line */}
    <div className="h-2 w-full rounded-full bg-[#16233A]" />

    {/* Completed Progress */}
    <div
      className="absolute top-0 left-0 h-2 rounded-full bg-[#2FE0C7] transition-all duration-700"
      style={{
        width: `${eta?.progress_percent ?? 0}%`,
      }}
    />

    {/* Station Dots */}
<div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2">
  {eta?.stations?.map((station) => (
    <div
      key={station}
      className="w-4 h-4 rounded-full bg-[#060B14] border-2 border-[#5C6E88]"
    />
  ))}
</div>

    {/* 🚆 Moving Train */}
    <div
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-700"
      style={{
        left: `${eta?.progress_percent ?? 0}%`,
      }}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2FE0C7] shadow-lg">
        <TrainFront className="w-5 h-5 text-[#06251F]" />
      </div>
    </div>

  </div>

  {/* Station Names */}
  <div className="mt-6 flex justify-between">
    {eta?.stations?.map((station) => (
      <span
        key={station}
        className="text-[10px] text-[#5C6E88] text-center max-w-[90px]"
      >
        {station}
      </span>
    ))}
  </div>

</div>
        {/* Current and Next Station */}
<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

  {/* Current Station */}
  <div className="rounded-lg border border-[#2FE0C7]/30 bg-[#2FE0C7]/5 p-4">

    <p className="text-xs tracking-wider text-[#5C6E88]">
      CURRENT STATION
    </p>

    <p className="mt-2 text-lg font-semibold text-[#E8EEF7]">
      📍 {eta?.current_station || "--"}
    </p>

  </div>

  {/* Next Station */}
  <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-4">

    <p className="text-xs tracking-wider text-[#5C6E88]">
      NEXT STATION
    </p>

    <p className="mt-2 text-lg font-semibold text-[#2FE0C7]">
      → {eta?.next_station || "--"}
    </p>

  </div>

</div>

      </div>
      {/* ETA Prediction History */}
<div className="mt-6 rounded-xl border border-[#16233A] bg-[#0B1526] p-6">

  <div className="flex items-center gap-2">
    <Activity className="w-5 h-5 text-[#2FE0C7]" />

    <div>
      <p className="text-xs tracking-wider text-[#5EEAD4]">
        ETA PREDICTION HISTORY
      </p>

      <p className="mt-1 text-sm text-[#8FA3C0]">
        Recent AI prediction updates for the selected train.
      </p>
    </div>
  </div>

  {etaHistory.length === 0 ? (

    <div className="mt-5 rounded-lg border border-[#16233A] bg-[#101F35] p-5 text-center">
      <p className="text-sm text-[#5C6E88]">
        Collecting prediction history...
      </p>
    </div>

  ) : (

    <div className="mt-5 space-y-3">

      {etaHistory.map((item, index) => (

        <div
          key={`${item.time}-${index}`}
          className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#16233A] bg-[#101F35] p-4"
        >

          <div>
            <p className="text-xs text-[#5C6E88]">
              UPDATE TIME
            </p>

            <p className="mt-1 text-sm font-medium">
              {item.time}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#5C6E88]">
              PREDICTED ETA
            </p>

            <p className="mt-1 font-semibold text-[#2FE0C7]">
              {item.eta}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#5C6E88]">
              DELAY
            </p>

            <p className="mt-1 font-semibold text-[#FFB238]">
              {item.delay} min
            </p>
          </div>

          <div>
            <p className="text-xs text-[#5C6E88]">
              CONFIDENCE
            </p>

            <p className="mt-1 font-semibold">
              {item.confidence}%
            </p>
          </div>

        </div>

      ))}

    </div>
  )}

</div>

      {/* Disclaimer */}
      <p className="mt-6 text-xs text-[#5C6E88]">
        Dashboard data is simulated for the SIH 2026 prototype and does not
        represent live Indian Railways data.
      </p>

    </div>
  );
}