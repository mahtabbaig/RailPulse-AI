import React, { useEffect, useState } from "react";
import { BrainCircuit, Clock, Target, TrendingUp } from "lucide-react";
import { getETA } from "../services/api";

export default function AIPrediction() {
  const [eta, setEta] = useState(null);

  useEffect(() => {
  const loadETA = async () => {
    const selectedTrain = sessionStorage.getItem("selectedTrain");

    // If no train is selected, don't show data
    if (!selectedTrain) {
      setEta(null);
      return;
    }

    try {
      const data = await getETA(selectedTrain);
      setEta(data);
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

      <div className="flex items-center gap-2">
        <BrainCircuit className="w-6 h-6 text-[#2FE0C7]" />

        <h1 className="text-3xl font-semibold">
          AI Prediction
        </h1>
      </div>

      <p className="mt-2 text-[#8FA3C0]">
        AI-powered analysis of train arrival and delay conditions.
      </p>

      <div className="mt-8 rounded-xl border border-[#16233A] bg-[#0B1526] p-6">

        <p className="text-xs text-[#5C6E88]">
          ANALYZING TRAIN
        </p>

        <h2 className="mt-2 text-2xl font-semibold">
          {eta?.train || "Loading..."}
        </h2>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">

          <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">
            <Clock className="w-5 h-5 text-[#2FE0C7]" />

            <p className="mt-3 text-xs text-[#5C6E88]">
              PREDICTED ETA
            </p>

            <p className="mt-1 text-2xl font-semibold text-[#2FE0C7]">
              {eta?.predicted_arrival || "--"}
            </p>
          </div>

          <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">
            <Target className="w-5 h-5 text-[#2FE0C7]" />

            <p className="mt-3 text-xs text-[#5C6E88]">
              CONFIDENCE
            </p>

            <p className="mt-1 text-2xl font-semibold">
              {eta?.confidence ?? "--"}%
            </p>
          </div>

          <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">
            <TrendingUp className="w-5 h-5 text-[#2FE0C7]" />

            <p className="mt-3 text-xs text-[#5C6E88]">
              CURRENT DELAY
            </p>

            <p className="mt-1 text-2xl font-semibold">
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

        <div className="mt-8 rounded-lg border border-[#16233A] bg-[#101F35] p-5">

         <div className="flex items-center justify-between">
  <div>
    <p className="text-xs text-[#5C6E88]">
      AI PREDICTION ANALYSIS
    </p>

    <p className="mt-1 text-lg font-semibold">
      Dynamic ETA Forecast
    </p>
  </div>

  <span className="rounded-full border border-[#2FE0C7]/30 bg-[#2FE0C7]/10 px-3 py-1 text-xs text-[#2FE0C7]">
    AI ACTIVE
  </span>
</div>

<p className="mt-4 text-sm leading-6 text-[#8FA3C0]">
  The prediction engine evaluates train speed, route progress and
  current delay conditions to estimate the expected arrival time.
</p>

<div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">

  <div className="rounded-lg border border-[#16233A] p-4">
    <p className="text-xs text-[#5C6E88]">
      SPEED INPUT
    </p>
    <p className="mt-2 text-lg font-semibold">
      {eta?.speed_kmph ?? "--"} km/h
    </p>
  </div>

  <div className="rounded-lg border border-[#16233A] p-4">
    <p className="text-xs text-[#5C6E88]">
      ROUTE PROGRESS
    </p>
    <p className="mt-2 text-lg font-semibold">
      {eta?.progress_percent ?? "--"}%
    </p>
  </div>

  <div className="rounded-lg border border-[#16233A] p-4">
    <p className="text-xs text-[#5C6E88]">
      MODEL CONFIDENCE
    </p>
    <p className="mt-2 text-lg font-semibold text-[#2FE0C7]">
      {eta?.confidence ?? "--"}%
    </p>
  </div>

</div>

        </div>

      </div>
    </div>
  );
}