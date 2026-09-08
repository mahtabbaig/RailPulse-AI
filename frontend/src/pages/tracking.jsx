import React, { useEffect, useState, useRef } from "react";
import { getETA } from "../services/api";
import TrainMap from "../components/TrainMap";
import {
  TrainFront,
  MapPinned,
  Gauge,
  Clock,
  Search,
} from "lucide-react";

export default function Tracking() {
  const [eta, setEta] = useState(null);
  const [trainSearch, setTrainSearch] = useState(() => {
  return sessionStorage.getItem("selectedTrain") || "";
});
  const [selectedTrain, setSelectedTrain] = useState(() => {
  return sessionStorage.getItem("selectedTrain") || "";
});
  const [searchError, setSearchError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const announcedNextStation = useRef(null);
  const previousStation = useRef(null);
  const speak = (message) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);

    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }
};

  // Load train data
  // Load train data
const loadETA = async (trainNumber) => {
  if (!trainNumber) return;

  try {
    const parentTrain = sessionStorage.getItem("alternativeParentTrain");

    // If this is an alternative train,
    // get the main train data first
    if (parentTrain && parentTrain !== trainNumber) {

      const parentData = await getETA(parentTrain);

      if (parentData.error) {
        setEta(null);
        setSearchError("Unable to load main train information.");
        return;
      }

      // Find the selected alternative inside main train alternatives
      const alternativeData = parentData.alternatives?.find(
        (alternative) =>
          alternative.train_number === trainNumber
      );

      if (alternativeData) {

        // Get alternative train's live data
        const actualAlternativeData = await getETA(trainNumber);

        // Combine:
        // - correct reference time from main train
        // - alternative's live data
        const combinedData = {
          ...actualAlternativeData,

          scheduled_arrival: alternativeData.scheduled_arrival,
          predicted_arrival: alternativeData.predicted_arrival,
          delay_minutes: alternativeData.delay_minutes,
        };

        setEta(combinedData);
        setLastUpdated(new Date().toLocaleTimeString());
        setSearchError("");
        return;
      }
    }

    // Normal train tracking
    const data = await getETA(trainNumber);

    if (data.error) {
      setEta(null);
      setSearchError("Train not found. Please enter a valid train number.");
      return;
    }
    console.log("TRAIN DATA:", data);
    setEta(data);
    setLastUpdated(new Date().toLocaleTimeString());
    setSearchError("");

  } catch (error) {
    console.error("Tracking error:", error);
    setSearchError("Unable to connect to RailPulse AI server.");
  }
};

  // Search button
  const handleTrackTrain = async () => {
    const trainNumber = trainSearch.trim();

    if (!trainNumber) {
      setSearchError("Please enter a train number.");
      return;
    }

    setSelectedTrain(trainNumber);

    // Save selected train for other pages
    sessionStorage.setItem("selectedTrain", trainNumber);

    await loadETA(trainNumber);
  };

  // Auto refresh every 10 seconds
  useEffect(() => {
  if (!selectedTrain) return;

  // Load saved train immediately
  loadETA(selectedTrain);

  // Refresh every 10 seconds
  const interval = setInterval(() => {
    loadETA(selectedTrain);
  }, 10000);

  return () => clearInterval(interval);
}, [selectedTrain]);
useEffect(() => {
  if (!eta) return;

  // First time loading the train
  if (previousStation.current === null) {
    previousStation.current = eta.current_station;
  }

  // Detect station reached
  if (
    previousStation.current &&
    previousStation.current !== eta.current_station
  ) {
    speak(
      `Attention please. ${eta.current_station} station has been reached.`
    );

    previousStation.current = eta.current_station;

    // Reset next station announcement
    announcedNextStation.current = null;

    return;
  }
  // Announce when train is 5 minutes or less from next station
if (
  eta.next_station !== "Destination Reached" &&
  eta.next_station_minutes <= 5 &&
  announcedNextStation.current !== eta.next_station
) {
  speak(
    `Attention please. The next station is ${eta.next_station}. The train will reach ${eta.next_station} in approximately ${eta.next_station_minutes} minutes.`
  );

  announcedNextStation.current = eta.next_station;
}

}, [eta]);

  return (
    <div className="min-h-screen bg-[#060B14] text-[#E8EEF7] px-6 sm:px-10 py-10">

      {/* Header */}
      <div className="flex items-center gap-2">
        <TrainFront className="w-6 h-6 text-[#2FE0C7]" />

        <h1 className="text-3xl font-semibold">
          Train Tracking
        </h1>
      </div>

      <p className="mt-2 text-[#8FA3C0]">
        Search and monitor train position, speed and predicted arrival in real time.
      </p>

      {/* SEARCH SECTION */}
      <div className="mt-8 rounded-xl border border-[#16233A] bg-[#0B1526] p-6">

        <p className="text-xs tracking-wider text-[#5EEAD4]">
          TRACK YOUR TRAIN
        </p>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">

          <div className="relative flex-1">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C6E88]" />

            <input
              type="text"
              value={trainSearch}
              onChange={(e) => {
                setTrainSearch(e.target.value);
                setSearchError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTrackTrain();
                }
              }}
              placeholder="Enter Train Number (e.g. 12627)"
              className="w-full rounded-lg border border-[#22344F] bg-[#101F35] py-3 pl-12 pr-4 text-sm text-[#E8EEF7] placeholder:text-[#5C6E88] outline-none focus:border-[#2FE0C7]"
            />

          </div>

          <button
            onClick={handleTrackTrain}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#2FE0C7] px-6 py-3 font-semibold text-[#06251F] transition hover:bg-[#5EEAD4]"
          >
            <TrainFront className="w-4 h-4" />
            Track Train
          </button>

        </div>

        {searchError && (
          <p className="mt-3 text-sm text-red-400">
            {searchError}
          </p>
        )}

        <p className="mt-3 text-xs text-[#5C6E88]">
          Supported trains: 12627, 12628, 12007, 12008, 12649,
          12650, 16515, 16516, 16525, 16526
        </p>

      </div>

      {/* SHOW DATA ONLY AFTER SEARCHING */}
      {eta && (
        <div className="mt-8 rounded-xl border border-[#16233A] bg-[#0B1526] p-6">

          {/* Train Name */}
          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>
              <p className="text-xs text-[#5C6E88]">
                SELECTED TRAIN
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                {eta.train}
              </h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-[#8FA3C0]">
  <MapPinned className="w-4 h-4 text-[#2FE0C7]" />

  {eta.source} 
  <span className="text-[#2FE0C7]">→</span> 
  {eta.destination}
</p>

              <p className="mt-1 text-xs text-[#5C6E88]">
                TRAIN ID: {selectedTrain}
              </p>
            </div>

            <div className="flex items-center gap-3">

              {lastUpdated && (
                <span className="text-xs text-[#5C6E88]">
                  Updated {lastUpdated}
                </span>
              )}

              <span className="rounded-full border border-[#2FE0C7]/30 bg-[#2FE0C7]/10 px-3 py-1 text-xs text-[#2FE0C7]">
                LIVE TRACKING
              </span>

            </div>

          </div>

          {/* Data Cards */}
         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Speed */}
            <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">

              <Gauge className="w-5 h-5 text-[#2FE0C7]" />

              <p className="mt-3 text-xs text-[#5C6E88]">
                CURRENT SPEED
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {eta.speed_kmph} km/h
              </p>

            </div>
            {/* Departure Time */}
<div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">

  <Clock className="w-5 h-5 text-[#2FE0C7]" />

  <p className="mt-3 text-xs text-[#5C6E88]">
    DEPARTURE TIME
  </p>

  <p className="mt-1 text-2xl font-semibold">
    {eta.departure_time || "--"}
  </p>

</div>
{/* Scheduled Arrival */}
<div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">

  <Clock className="w-5 h-5 text-[#2FE0C7]" />

  <p className="mt-3 text-xs text-[#5C6E88]">
    SCHEDULED ARRIVAL
  </p>

  <p className="mt-1 text-2xl font-semibold">
    {eta.scheduled_arrival || "--"}
  </p>

</div>

     

            {/* Progress */}
            <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">

              <MapPinned className="w-5 h-5 text-[#2FE0C7]" />

              <p className="mt-3 text-xs text-[#5C6E88]">
                ROUTE PROGRESS
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {eta.progress_percent}%
              </p>

            </div>

          </div>

          {/* Live Train Location Map */}
<div className="mt-8">

  <div className="flex justify-between items-center mb-4">

    <p className="text-xs tracking-wider text-[#5EEAD4]">
      LIVE TRAIN LOCATION
    </p>

    <div className="flex items-center gap-2">

      <span className="h-2 w-2 rounded-full bg-[#2FE0C7] animate-pulse" />

      <p className="text-xs text-[#2FE0C7]">
        {eta.status}
      </p>

    </div>

  </div>

  <TrainMap
  progress={eta.progress_percent}
  stations={eta.stations}
/>

</div>
            {/* Current Station and Next Station */}
<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

  {/* Current Station */}
  <div className="rounded-lg border border-[#2FE0C7]/30 bg-[#2FE0C7]/5 p-5">

    <div className="flex items-center gap-2">
      <MapPinned className="w-5 h-5 text-[#2FE0C7]" />

      <p className="text-xs tracking-wider text-[#5C6E88]">
        Last Passed STATION
      </p>
    </div>

    <p className="mt-3 text-xl font-semibold text-[#E8EEF7]">
      📍 {eta.current_station || "--"}
    </p>

    <p className="mt-1 text-xs text-[#5C6E88]">
      Last Station Location
    </p>

  </div>


  {/* Next Station */}
  <div className="rounded-lg border border-[#16233A] bg-[#101F35] p-5">

    <div className="flex items-center gap-2">
      <TrainFront className="w-5 h-5 text-[#2FE0C7]" />

      <p className="text-xs tracking-wider text-[#5C6E88]">
        NEXT STATION
      </p>
    </div>

    <p className="mt-3 text-xl font-semibold text-[#2FE0C7]">
      → {eta.next_station || "--"}
    </p>

    <p className="mt-1 text-xs text-[#5C6E88]">
  Estimated arrival in {eta.next_station_minutes ?? "--"} minutes
</p>

  </div>

</div>

          </div>

        
      )}

      {/* Empty state */}
      {!eta && !searchError && (
        <div className="mt-8 rounded-xl border border-dashed border-[#22344F] p-10 text-center">

          <TrainFront className="mx-auto w-10 h-10 text-[#2FE0C7]/60" />

          <h3 className="mt-4 text-lg font-semibold">
            Ready to Track a Train
          </h3>

          <p className="mt-2 text-sm text-[#5C6E88]">
            Enter a train number above to get live tracking and AI ETA predictions.
          </p>

        </div>
      )}

    </div>
  );
}