import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";

import L from "leaflet";


// Train route stations
const stationCoordinates = {
  "New Delhi": [28.6139, 77.2090],
  "Agra": [27.1767, 78.0081],
  "Bhopal": [23.2599, 77.4126],
  "Nagpur": [21.1458, 79.0882],
  "Secunderabad": [17.4399, 78.4983],
  "Bengaluru": [12.9716, 77.5946],

  "Chennai": [13.0827, 80.2707],
  "Katpadi": [12.9698, 79.1559],
  "Mandya": [12.5218, 76.8951],
  "Mysuru": [12.2958, 76.6394],

  "Yeshwanthpur": [13.0285, 77.5396],
  "Dharwad": [15.4589, 75.0078],
  "Pune": [18.5204, 73.8567],
  "Hazrat Nizamuddin": [28.5883, 77.2537],

  "KSR Bengaluru": [12.9784, 77.5723],
  "Tumakuru": [13.3379, 77.1173],
  "Arsikere": [13.3089, 76.2567],
  "Shivamogga": [13.9299, 75.5681],
  "Mangaluru": [12.9141, 74.8560],
  "Karwar": [14.8136, 74.1299],

  "Salem": [11.6643, 78.1460],
  "Erode": [11.3410, 77.7172],
  "Coimbatore": [11.0168, 76.9558],
  "Madurai": [9.9252, 78.1198],
  "Kanyakumari": [8.0883, 77.5385],
};


// Create train icon
const trainIcon = new L.DivIcon({
  className: "train-icon",

  html: `
    <div
      style="
        width:45px;
        height:45px;
        border-radius:50%;
        background:#060B14;
        border:2px solid #2FE0C7;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:22px;
        box-shadow:0 0 20px rgba(47,224,199,0.7);
      "
    >
      🚆
    </div>
  `,

  iconSize: [45, 45],

  iconAnchor: [22, 22],
});
function MapController({ routeCoordinates }) {
  const map = useMap();

  useEffect(() => {
    if (routeCoordinates.length > 1) {
      map.fitBounds(routeCoordinates, {
        padding: [50, 50],
      });
    }
  }, [map, routeCoordinates]);

  return null;
}



export default function TrainMap({ progress, stations: trainStations })   {

  // Extract coordinates for route
  const routeCoordinates = trainStations
  .map((station) => stationCoordinates[station])
  .filter(Boolean);


  // Temporary train position
  // We will connect this to eta.progress_percent next
// Calculate train position based on live progress
const trainProgress = Math.min(Math.max(progress || 0, 0), 100);

const routeIndex =
  (trainProgress / 100) * (routeCoordinates.length - 1);

const startIndex = Math.floor(routeIndex);

const endIndex = Math.min(
  startIndex + 1,
  routeCoordinates.length - 1
);

const segmentProgress = routeIndex - startIndex;

const start = routeCoordinates[startIndex];

const end = routeCoordinates[endIndex];

const trainPosition = [
  start[0] + (end[0] - start[0]) * segmentProgress,
  start[1] + (end[1] - start[1]) * segmentProgress,
];


  return (

    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-[#16233A]">

      <MapContainer

        /*
          India-focused position
        */

        center={[21.5, 78.5]}

        /*
          Important:
          zoom 5.5 focuses much more on India
        */

        zoom={5.5}

        zoomSnap={0.5}

        minZoom={5}

        maxZoom={10}

        scrollWheelZoom={true}

        className="w-full h-full"

      >
        <MapController routeCoordinates={routeCoordinates} />


        {/* Map Background */}

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />


        {/* Full Train Route */}

        <Polyline

          positions={routeCoordinates}

          pathOptions={{
            color: "#334155",
            weight: 7,
            opacity: 0.9,
          }}

        />


        {/* Station Markers */}

{trainStations.map((station) => {

  const coordinates = stationCoordinates[station];

  if (!coordinates) return null;

  return (

    <CircleMarker
      key={station}
      center={coordinates}
      radius={8}
      pathOptions={{
        color: "#2FE0C7",
        fillColor: "#060B14",
        fillOpacity: 1,
        weight: 3,
      }}
    >

      <Popup>
        <b>{station}</b>
      </Popup>

      <Tooltip permanent direction="top" offset={[0, -10]}>
        {station}
      </Tooltip>

    </CircleMarker>

  );

})}


        {/* Live Train */}

        <Marker

          position={trainPosition}

          icon={trainIcon}

        >

          <Popup>

            <div>

              <b>🚆 Karnataka Express</b>

              <br />

              Live Tracking Active

            </div>

          </Popup>

        </Marker>


      </MapContainer>

    </div>

  );

}