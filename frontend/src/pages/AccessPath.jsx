import React, { useEffect, useState } from "react";
import { Accessibility, TrainFront, Clock, MapPin, Phone, User, Armchair, CheckCircle, XCircle, AlertCircle, ClipboardList, ShieldCheck, Search, RefreshCw, LogOut, ArrowRight, Navigation, Car, Footprints, Package } from "lucide-react";
import { getETA } from "../services/api";

const STORAGE_KEY = "railpulse_accesspath_requests";
const SERVICE_KEY = "railpulse_accesspath_services";

const INITIAL_SERVICES = [
  { id: "Accessibility", name: "Accessibility", icon: "Accessibility", status: "Available" },
  { id: "battery", name: "Battery Car", icon: "car", status: "Available" },
  { id: "walking", name: "Walking Assistance", icon: "walking", status: "Available" },
  { id: "luggage", name: "Luggage Assistance", icon: "package", status: "Unavailable" },
  { id: "lift", name: "Lift Assistance", icon: "lift", status: "Available" },
  { id: "ramp", name: "Ramp Assistance", icon: "ramp", status: "Available" },
  { id: "toilet", name: "Accessible Toilet", icon: "toilet", status: "Unverified" },
];
const QR_STATIONS = [
  "New Delhi",
  "Agra",
  "Bhopal",
  "Nagpur",
  "Secunderabad",
  "Bengaluru",
  "Chennai",
  "Katpadi",
  "Mandya",
  "Mysuru",
  "Yeshwanthpur",
  "Dharwad",
  "Pune",
  "Hazrat Nizamuddin",
  "Tumakuru",
  "Arsikere",
  "Shivamogga",
  "Mangaluru",
  "Karwar",
  "Salem",
  "Erode",
  "Coimbatore",
  "Madurai",
  "Kanyakumari",
];

const QR_LOCATIONS = [
  {
    area: "Main Station Entrance",
    details: "Near the main passenger entry area",
    platform: "Station entrance",
  },
  {
    area: "Unreserved Ticket Booking Area",
    details: "Near the ticket booking counters",
    platform: "Booking hall",
  },
  {
    area: "Station Concourse",
    details: "Passenger circulation and waiting area",
    platform: "Concourse",
  },
  {
    area: "Platform Access Area",
    details: "Near the platform entry or access point",
    platform: "Platform access",
  },
];
const STATUSES = [
  "Pending",
  "Confirmed",
  "Assistance Ready",
  "Completed",
];

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function ServiceIcon({ type }) {
  const icons = {
    Accessibility: Accessibility,
    car: Car,
    walking: Footprints,
    package: Package,
    lift: ArrowRight,
    ramp: Navigation,
    toilet: Accessibility,
  };

  const Icon = icons[type] || Accessibility;
  return <Icon className="h-6 w-6" />;
}

function StatusBadge({ status }) {
  const styles = {
    Available: "bg-green-500/10 text-green-400 border-green-500/30",
    Unavailable: "bg-red-500/10 text-red-400 border-red-500/30",
    Unverified: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    Confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    "Assistance Ready": "bg-green-500/10 text-green-400 border-green-500/30",
    Completed: "bg-[#2FE0C7]/10 text-[#2FE0C7] border-[#2FE0C7]/30",
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
}

function AccessPath() {
  const [activeTab, setActiveTab] = useState("passenger");
  const [selectedQRStation, setSelectedQRStation] = useState("");

  const [services, setServices] = useState(() =>
    loadData(SERVICE_KEY, INITIAL_SERVICES)
  );

  const [requests, setRequests] = useState(() =>
    loadData(STORAGE_KEY, [])
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    trainNumber: "",
    station: "",
    platform: "",
    coach: "",
    assistance: "",
    instructions: "",
  });

  const [eta, setEta] = useState(null);
  const [trainLoading, setTrainLoading] = useState(false);
  const [trainError, setTrainError] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem(SERVICE_KEY, JSON.stringify(services));
  }, [services]);

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Retrieve train information from existing backend
  const fetchTrain = async () => {
    if (!form.trainNumber.trim()) {
      setTrainError("Please enter a train number.");
      return;
    }

    setTrainLoading(true);
    setTrainError("");
    setEta(null);

    try {
      const data = await getETA(form.trainNumber.trim());

      setEta(data);

      // Use backend destination as a suggestion
      setForm((prev) => ({
        ...prev,
        station: prev.station || data.destination || "",
      }));
    } catch (error) {
      setTrainError(
        "Train information could not be retrieved. Check the train number."
      );
    } finally {
      setTrainLoading(false);
    }
  };

  // Passenger submits assistance request
  const submitBooking = (e) => {
    e.preventDefault();
    setBookingMessage("");

    if (!form.name.trim() || !form.phone.trim()) {
      setBookingMessage("Please enter passenger name and phone number.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setBookingMessage("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!eta) {
      setBookingMessage("Please retrieve train information first.");
      return;
    }

    if (
      !form.station.trim() ||
      !form.platform.trim() ||
      !form.coach.trim() ||
      !form.assistance
    ) {
      setBookingMessage("Please complete all booking details.");
      return;
    }

    const selectedService = services.find(
      (service) => service.id === form.assistance
    );

    if (!selectedService || selectedService.status !== "Available") {
      setBookingMessage("This service is not currently available.");
      return;
    }

    const newRequest = {
      id: "AP" + Date.now().toString().slice(-7),
      ...form,
      trainName: eta.train || form.trainNumber,
      arrival: eta.predicted_arrival || eta.scheduled_arrival || "Not available",
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    setRequests((prev) => [newRequest, ...prev]);

    setBookingMessage(
      `Booking submitted successfully! Your Request ID is ${newRequest.id}`
    );

    setForm({
      name: "",
      phone: "",
      trainNumber: "",
      station: "",
      platform: "",
      coach: "",
      assistance: "",
      instructions: "",
    });

    setEta(null);
  };

  // Admin demo login
  const loginAdmin = (e) => {
    e.preventDefault();

    if (adminPassword === "1234") {
      setAdminLoggedIn(true);
      setAdminError("");
    } else {
      setAdminError("Incorrect demo PIN. Try 1234.");
    }
  };

  const updateRequestStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const updateServiceStatus = (id, status) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, status } : service
      )
    );
  };

  const passengerRequests = requests.filter(
    (request) =>
      searchPhone.trim() &&
      request.phone === searchPhone.trim()
  );

  const availableServices = services.filter(
    (service) => service.status === "Available"
  );

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const inputClass =
    "mt-2 w-full rounded-lg border border-[#263852] bg-[#101F35] px-4 py-3 text-sm text-white outline-none transition focus:border-[#2FE0C7]";

  const labelClass = "text-sm font-medium text-[#8FA3C0]";

  return (
    <div className="min-h-screen bg-[#060B14] px-5 py-8 text-[#E8EEF7] sm:px-10">

      {/* HEADER */}
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-wrap items-center justify-between gap-5">

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-[#2FE0C7]/30 bg-[#2FE0C7]/10 p-3">
              <Accessibility className="h-8 w-8 text-[#2FE0C7]" />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                RailPulse <span className="text-[#2FE0C7]">AccessPath</span>
              </h1>

              <p className="mt-1 text-xs text-[#5C6E88]">
                PRE-ARRIVAL PASSENGER ASSISTANCE SYSTEM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#2FE0C7]/20 bg-[#2FE0C7]/5 px-4 py-2 text-xs text-[#2FE0C7]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#2FE0C7]" />
            ACCESSPATH ACTIVE
          </div>

        </div>

        {/* TABS */}
        <div className="mt-8 flex flex-wrap gap-3 border-b border-[#16233A] pb-4">

          <button
            onClick={() => setActiveTab("passenger")}
            className={`flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition ${
              activeTab === "passenger"
                ? "bg-[#2FE0C7] text-[#06251F]"
                : "bg-[#0B1526] text-[#8FA3C0] hover:bg-[#101F35]"
            }`}
          >
            <User className="h-4 w-4" />
            Passenger Portal
          </button>

          <button
            onClick={() => {
              setActiveTab("admin");
              setAdminLoggedIn(false);
              setAdminPassword("");
            }}
            className={`flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition ${
              activeTab === "admin"
                ? "bg-[#2FE0C7] text-[#06251F]"
                : "bg-[#0B1526] text-[#8FA3C0] hover:bg-[#101F35]"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Station Admin
          </button>
          <button
  onClick={() => setActiveTab("qr")}
  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
    activeTab === "qr"
      ? "bg-cyan-500 text-slate-950"
      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
  }`}
>
  <MapPin size={18} className="inline mr-2" />
  Station QR Guide
</button>

        </div>

        {/* PASSENGER PORTAL */}
        {activeTab === "passenger" && (

          <div className="mt-8 space-y-8">

            <div>
              <h2 className="text-2xl font-semibold">
                Assistance before you arrive.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8FA3C0]">
                Request Accessibility, battery car and other assistance
                before reaching your destination station.
              </p>
            </div>

            {/* SERVICE AVAILABILITY */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Available Station Services
                </h3>

                <span className="text-xs text-[#5C6E88]">
                  {availableServices.length} services available
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {services.map((service) => (

                  <div
                    key={service.id}
                    className="rounded-xl border border-[#16233A] bg-[#0B1526] p-5"
                  >

                    <div className="flex items-center justify-between">

                      <div className="text-[#2FE0C7]">
                        <ServiceIcon type={service.icon} />
                      </div>

                      {service.status === "Available" ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : service.status === "Unavailable" ? (
                        <XCircle className="h-5 w-5 text-red-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                      )}

                    </div>

                    <h4 className="mt-4 font-medium">
                      {service.name}
                    </h4>

                    <div className="mt-3">
                      <StatusBadge status={service.status} />
                    </div>

                  </div>

                ))}

              </div>

              <p className="mt-3 text-xs text-yellow-400">
                Demo facility information. Actual station availability is not verified.
              </p>
            </section>

            {/* BOOKING FORM */}
            <section className="rounded-xl border border-[#16233A] bg-[#0B1526] p-6 sm:p-8">

              <div className="mb-7 flex items-center gap-3">
                <ClipboardList className="h-6 w-6 text-[#2FE0C7]" />

                <div>
                  <h3 className="text-xl font-semibold">
                    Book Pre-Arrival Assistance
                  </h3>

                  <p className="mt-1 text-xs text-[#5C6E88]">
                    Enter your journey and assistance details.
                  </p>
                </div>
              </div>

              <form onSubmit={submitBooking}>

                {/* PASSENGER DETAILS */}
                <h4 className="mb-4 text-sm font-semibold text-[#2FE0C7]">
                  01 · PASSENGER DETAILS
                </h4>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  <div>
                    <label className={labelClass}>
                      Passenger Name
                    </label>

                    <input
                      className={inputClass}
                      placeholder="Enter full name"
                      value={form.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Phone Number
                    </label>

                    <input
                      className={inputClass}
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      maxLength={10}
                      onChange={(e) =>
                        updateForm("phone", e.target.value.replace(/\D/g, ""))
                      }
                      required
                    />
                  </div>

                </div>

                {/* TRAIN DETAILS */}
                <h4 className="mb-4 mt-8 text-sm font-semibold text-[#2FE0C7]">
                  02 · TRAIN AND ARRIVAL DETAILS
                </h4>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  <div>
                    <label className={labelClass}>
                      Train Number
                    </label>

                    <input
                      className={inputClass}
                      placeholder="Enter train number"
                      value={form.trainNumber}
                      onChange={(e) => {
                        updateForm("trainNumber", e.target.value);
                        setEta(null);
                      }}
                      required
                    />
                  </div>

                  <div className="flex items-end">

                    <button
                      type="button"
                      onClick={fetchTrain}
                      disabled={trainLoading}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2FE0C7] px-5 py-3 font-semibold text-[#06251F] transition hover:bg-[#5EEAD4] disabled:opacity-50"
                    >
                      <Search className="h-4 w-4" />

                      {trainLoading ? "Fetching..." : "Fetch Train Details"}
                    </button>

                  </div>

                  <div>
                    <label className={labelClass}>
                      Arrival Station
                    </label>

                    <input
                      className={inputClass}
                      placeholder="Enter arrival station"
                      value={form.station}
                      onChange={(e) => updateForm("station", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Platform Number
                    </label>

                    <input
                      className={inputClass}
                      placeholder="Example: 3"
                      value={form.platform}
                      onChange={(e) => updateForm("platform", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Coach Number
                    </label>

                    <input
                      className={inputClass}
                      placeholder="Example: S4, B2, A1"
                      value={form.coach}
                      onChange={(e) => updateForm("coach", e.target.value.toUpperCase())}
                      required
                    />
                  </div>

                </div>

                {trainError && (
                  <p className="mt-4 text-sm text-red-400">
                    {trainError}
                  </p>
                )}

                {eta && (

                  <div className="mt-5 rounded-lg border border-[#2FE0C7]/30 bg-[#2FE0C7]/5 p-5">

                    <div className="flex items-center gap-2 text-[#2FE0C7]">
                      <TrainFront className="h-5 w-5" />

                      <span className="font-semibold">
                        Train information retrieved
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

                      <div>
                        <p className="text-xs text-[#5C6E88]">
                          TRAIN
                        </p>

                        <p className="mt-1 font-semibold">
                          {eta.train || form.trainNumber}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#5C6E88]">
                          EXPECTED ARRIVAL
                        </p>

                        <p className="mt-1 font-semibold text-[#2FE0C7]">
                          {eta.predicted_arrival || eta.scheduled_arrival || "--"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#5C6E88]">
                          DESTINATION
                        </p>

                        <p className="mt-1 font-semibold">
                          {eta.destination || "--"}
                        </p>
                      </div>

                    </div>

                    <p className="mt-4 text-xs text-yellow-400">
                      Train information is based on the project's simulated backend data.
                    </p>

                  </div>

                )}

                {/* ASSISTANCE */}
                <h4 className="mb-4 mt-8 text-sm font-semibold text-[#2FE0C7]">
                  03 · SELECT REQUIRED ASSISTANCE
                </h4>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                  {services.map((service) => (

                    <button
                      type="button"
                      key={service.id}
                      disabled={service.status !== "Available"}
                      onClick={() => updateForm("assistance", service.id)}
                      className={`rounded-lg border p-4 text-left transition ${
                        form.assistance === service.id
                          ? "border-[#2FE0C7] bg-[#2FE0C7]/10"
                          : "border-[#263852] bg-[#101F35]"
                      } ${
                        service.status !== "Available"
                          ? "cursor-not-allowed opacity-40"
                          : "hover:border-[#2FE0C7]/50"
                      }`}
                    >

                      <div className="flex items-center justify-between">

                        <span className="text-sm font-medium">
                          {service.name}
                        </span>

                        {form.assistance === service.id && (
                          <CheckCircle className="h-5 w-5 text-[#2FE0C7]" />
                        )}

                      </div>

                      <div className="mt-3">
                        <StatusBadge status={service.status} />
                      </div>

                    </button>

                  ))}

                </div>

                <div className="mt-5">
                  <label className={labelClass}>
                    Additional Instructions (Optional)
                  </label>

                  <textarea
                    className={inputClass}
                    rows={3}
                    placeholder="Mention any additional assistance requirements..."
                    value={form.instructions}
                    onChange={(e) => updateForm("instructions", e.target.value)}
                  />
                </div>

                {bookingMessage && (
                  <div className="mt-5 rounded-lg border border-[#2FE0C7]/30 bg-[#2FE0C7]/5 p-4 text-sm text-[#2FE0C7]">
                    {bookingMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2FE0C7] px-6 py-4 font-semibold text-[#06251F] transition hover:bg-[#5EEAD4]"
                >
                  <CheckCircle className="h-5 w-5" />
                  Submit Assistance Request
                </button>

              </form>

            </section>

            {/* REQUEST TRACKING */}
            <section className="rounded-xl border border-[#16233A] bg-[#0B1526] p-6">

              <div className="flex items-center gap-3">
                <Search className="h-6 w-6 text-[#2FE0C7]" />

                <div>
                  <h3 className="text-xl font-semibold">
                    Track Your Assistance Request
                  </h3>

                  <p className="mt-1 text-xs text-[#5C6E88]">
                    Enter the phone number used during booking.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                <input
                  className={inputClass + " mt-0"}
                  placeholder="Enter registered phone number"
                  value={searchPhone}
                  onChange={(e) =>
                    setSearchPhone(e.target.value.replace(/\D/g, ""))
                  }
                  maxLength={10}
                />

                <button
                  type="button"
                  onClick={() => {}}
                  className="rounded-lg bg-[#2FE0C7] px-6 py-3 font-semibold text-[#06251F]"
                >
                  Search
                </button>

              </div>

              {passengerRequests.map((request) => (

                <div
                  key={request.id}
                  className="mt-4 rounded-lg border border-[#263852] bg-[#101F35] p-5"
                >

                  <div className="flex flex-wrap items-center justify-between gap-3">

                    <div>
                      <p className="text-xs text-[#5C6E88]">
                        REQUEST ID
                      </p>

                      <p className="mt-1 font-semibold text-[#2FE0C7]">
                        {request.id}
                      </p>
                    </div>

                    <StatusBadge status={request.status} />

                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">

                    <div>
                      <p className="text-xs text-[#5C6E88]">TRAIN</p>
                      <p className="mt-1">{request.trainNumber}</p>
                    </div>

                    <div>
                      <p className="text-xs text-[#5C6E88]">PLATFORM</p>
                      <p className="mt-1">{request.platform}</p>
                    </div>

                    <div>
                      <p className="text-xs text-[#5C6E88]">COACH</p>
                      <p className="mt-1">{request.coach}</p>
                    </div>

                    <div>
                      <p className="text-xs text-[#5C6E88]">SERVICE</p>
                      <p className="mt-1">
                        {services.find((s) => s.id === request.assistance)?.name || request.assistance}
                      </p>
                    </div>

                  </div>

                  <p className="mt-4 text-xs text-[#8FA3C0]">
                    Expected arrival: {request.arrival}
                  </p>

                </div>

              ))}

              {searchPhone && passengerRequests.length === 0 && (
                <p className="mt-5 text-sm text-[#8FA3C0]">
                  No assistance requests found for this phone number.
                </p>
              )}

            </section>

          </div>
        )}
        {activeTab === "qr" && (
  <div className="space-y-6">
    <div className="bg-[#0B1526] border border-slate-700 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="text-cyan-400" size={28} />
        <div>
          <h2 className="text-xl font-bold text-white">
            Station QR Guide
          </h2>
          <p className="text-sm text-slate-400">
            Find suggested areas to check for ticket-booking QR boards.
          </p>
        </div>
      </div>

      <label className="block text-sm font-medium text-slate-300 mb-2">
        Select Your Current Station
      </label>

      <select
        value={selectedQRStation}
        onChange={(e) => setSelectedQRStation(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
      >
        <option value="">Choose a station</option>
        {QR_STATIONS.map((station) => (
          <option key={station} value={station}>
            {station}
          </option>
        ))}
      </select>
    </div>

    {selectedQRStation && (
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">
          Suggested Areas at {selectedQRStation}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QR_LOCATIONS.map((location, index) => (
            <div
              key={index}
              className="bg-[#0B1526] border border-slate-700 rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="text-cyan-400" size={22} />
                <h4 className="font-semibold text-white">
                  {location.area}
                </h4>
              </div>

              <p className="text-sm text-slate-400 mb-3">
                {location.details}
              </p>

              <span className="text-xs bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full">
                {location.platform}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <p className="text-sm text-amber-300">
            Demo information: These are suggested areas to check, not
            verified QR-board locations at this station. Actual locations
            may vary. Please follow station signage or ask railway staff.
          </p>
        </div>

        <div className="bg-slate-800/70 rounded-xl p-4">
          <p className="text-sm text-slate-300">
            <strong className="text-white">Remember:</strong> This guide
            helps you locate possible QR-board areas. It does not generate
            QR codes or book tickets. Use the official railway ticketing
            service to complete your booking.
          </p>
        </div>
      </div>
    )}
  </div>
)}
        {/* ADMIN PORTAL */}
        {activeTab === "admin" && (

          <div className="mt-8">

            {!adminLoggedIn ? (

              <div className="mx-auto max-w-md rounded-xl border border-[#16233A] bg-[#0B1526] p-8">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-[#2FE0C7]/10">
                  <ShieldCheck className="h-9 w-9 text-[#2FE0C7]" />
                </div>

                <h2 className="mt-5 text-center text-2xl font-semibold">
                  Station Admin Login
                </h2>

                <p className="mt-2 text-center text-sm text-[#8FA3C0]">
                  Access the station assistance management dashboard.
                </p>

                <form onSubmit={loginAdmin} className="mt-7">

                  <label className={labelClass}>
                    Demo PIN
                  </label>

                  <input
                    type="password"
                    className={inputClass}
                    placeholder="Enter admin PIN"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />

                  {adminError && (
                    <p className="mt-3 text-sm text-red-400">
                      {adminError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="mt-5 w-full rounded-lg bg-[#2FE0C7] py-3 font-semibold text-[#06251F]"
                  >
                    Login to Admin Portal
                  </button>

                  <p className="mt-4 text-center text-xs text-[#5C6E88]">
                    Expo demo PIN: 1234
                  </p>

                </form>

              </div>

            ) : (

              <div className="space-y-7">

                <div className="flex flex-wrap items-center justify-between gap-4">

                  <div>
                    <h2 className="text-2xl font-semibold">
                      Station Assistance Dashboard
                    </h2>

                    <p className="mt-2 text-sm text-[#8FA3C0]">
                      Manage passenger assistance requests and station facilities.
                    </p>
                  </div>

                  <button
                    onClick={() => setAdminLoggedIn(false)}
                    className="flex items-center gap-2 rounded-lg border border-[#263852] px-4 py-2 text-sm text-[#8FA3C0] hover:bg-[#101F35]"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>

                </div>

                {/* ADMIN STATISTICS */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  {[
                    { title: "TOTAL REQUESTS", value: requests.length },
                    { title: "PENDING", value: pendingCount },
                    {
                      title: "CONFIRMED",
                      value: requests.filter((r) => r.status === "Confirmed").length,
                    },
                    {
                      title: "COMPLETED",
                      value: requests.filter((r) => r.status === "Completed").length,
                    },
                  ].map((item) => (

                    <div
                      key={item.title}
                      className="rounded-xl border border-[#16233A] bg-[#0B1526] p-5"
                    >

                      <p className="text-xs text-[#5C6E88]">
                        {item.title}
                      </p>

                      <p className="mt-3 text-3xl font-semibold text-[#2FE0C7]">
                        {item.value}
                      </p>

                    </div>

                  ))}

                </div>

                {/* REQUEST MANAGEMENT */}
                <section className="rounded-xl border border-[#16233A] bg-[#0B1526] p-6">

                  <div className="flex items-center justify-between gap-3">

                    <h3 className="text-xl font-semibold">
                      Passenger Assistance Requests
                    </h3>

                    <span className="text-xs text-[#5C6E88]">
                      {requests.length} total
                    </span>

                  </div>

                  {requests.length === 0 ? (

                    <div className="mt-6 rounded-lg border border-[#263852] bg-[#101F35] p-8 text-center">

                      <ClipboardList className="mx-auto h-10 w-10 text-[#5C6E88]" />

                      <p className="mt-3 text-sm text-[#8FA3C0]">
                        No assistance requests received yet.
                      </p>

                      <p className="mt-1 text-xs text-[#5C6E88]">
                        Passenger bookings will appear here.
                      </p>

                    </div>

                  ) : (

                    <div className="mt-6 space-y-4">

                      {requests.map((request) => (

                        <div
                          key={request.id}
                          className="rounded-lg border border-[#263852] bg-[#101F35] p-5"
                        >

                          <div className="flex flex-wrap items-start justify-between gap-4">

                            <div>
                              <p className="text-xs text-[#5C6E88]">
                                REQUEST ID · {request.id}
                              </p>

                              <h4 className="mt-2 text-lg font-semibold">
                                {request.name}
                              </h4>

                              <p className="mt-1 text-sm text-[#8FA3C0]">
                                <Phone className="mr-1 inline h-3 w-3" />
                                {request.phone}
                              </p>
                            </div>

                            <StatusBadge status={request.status} />

                          </div>

                          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">

                            <div>
                              <p className="text-xs text-[#5C6E88]">TRAIN</p>
                              <p className="mt-1 text-sm font-medium">{request.trainNumber}</p>
                            </div>

                            <div>
                              <p className="text-xs text-[#5C6E88]">STATION</p>
                              <p className="mt-1 text-sm font-medium">{request.station}</p>
                            </div>

                            <div>
                              <p className="text-xs text-[#5C6E88]">PLATFORM</p>
                              <p className="mt-1 text-sm font-medium">{request.platform}</p>
                            </div>

                            <div>
                              <p className="text-xs text-[#5C6E88]">COACH</p>
                              <p className="mt-1 text-sm font-medium">{request.coach}</p>
                            </div>

                          </div>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">

                            <div>
                              <p className="text-xs text-[#5C6E88]">
                                ASSISTANCE REQUIRED
                              </p>

                              <p className="mt-1 text-sm font-semibold text-[#2FE0C7]">
                                {services.find((s) => s.id === request.assistance)?.name || request.assistance}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">

                              <select
                                value={request.status}
                                onChange={(e) =>
                                  updateRequestStatus(request.id, e.target.value)
                                }
                                className="rounded-lg border border-[#263852] bg-[#0B1526] px-3 py-2 text-xs text-white outline-none"
                              >

                                {STATUSES.map((status) => (
                                  <option key={status} value={status}>
                                    {status}
                                  </option>
                                ))}

                              </select>

                            </div>

                          </div>

                          {request.instructions && (
                            <p className="mt-4 text-xs text-[#8FA3C0]">
                              Instructions: {request.instructions}
                            </p>
                          )}

                        </div>

                      ))}

                    </div>

                  )}

                </section>

                {/* FACILITY MANAGEMENT */}
                <section className="rounded-xl border border-[#16233A] bg-[#0B1526] p-6">

                  <h3 className="text-xl font-semibold">
                    Station Facility Management
                  </h3>

                  <p className="mt-2 text-sm text-[#8FA3C0]">
                    Update the demonstration availability of station facilities.
                  </p>

                  <div className="mt-5 space-y-3">

                    {services.map((service) => (

                      <div
                        key={service.id}
                        className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#263852] bg-[#101F35] p-4"
                      >

                        <div className="flex items-center gap-3">

                          <div className="text-[#2FE0C7]">
                            <ServiceIcon type={service.icon} />
                          </div>

                          <span className="text-sm font-medium">
                            {service.name}
                          </span>

                        </div>

                        <select
                          value={service.status}
                          onChange={(e) =>
                            updateServiceStatus(service.id, e.target.value)
                          }
                          className="rounded-lg border border-[#263852] bg-[#0B1526] px-3 py-2 text-xs text-white outline-none"
                        >

                          <option value="Available">Available</option>
                          <option value="Unavailable">Unavailable</option>
                          <option value="Unverified">Unverified</option>

                        </select>

                      </div>

                    ))}

                  </div>

                </section>

              </div>

            )}

          </div>

        )}

        {/* FOOTER */}
        <div className="mt-12 border-t border-[#16233A] pt-5">

          <p className="text-center text-xs leading-6 text-[#5C6E88]">
            RailPulse AccessPath · Accessibility Assistance Prototype
            <br />
            Demonstration data only. No actual station staff dispatch or facility reservation is connected.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AccessPath;