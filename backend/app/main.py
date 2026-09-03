import random
import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="RailPulse AI",
    description="Dynamic Train ETA Intelligence Platform",
    version="1.0.0"
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Train Routes - 10 Trains
# --------------------------------------------------

train_routes = {

    "12627": {
        "name": "Karnataka Express",
        "source": "New Delhi",
        "destination": "Bengaluru",
        "stations": [
            "New Delhi",
            "Agra",
            "Bhopal",
            "Nagpur",
            "Secunderabad",
            "Bengaluru"
        ],
        "scheduled_minutes": 6 * 60 + 30
    },

    "12628": {
        "name": "Karnataka Express",
        "source": "Bengaluru",
        "destination": "New Delhi",
        "stations": [
            "Bengaluru",
            "Secunderabad",
            "Nagpur",
            "Bhopal",
            "Agra",
            "New Delhi"
        ],
        "scheduled_minutes": 8 * 60 + 15
    },
    "12850": {
        "name": "Alternative Express",
        "source": "Bengaluru",
        "destination": "New Delhi",
        "stations": [
            "Bengaluru",
            "Secunderabad",
            "Nagpur",
            "Bhopal",
            "Agra",
            "New Delhi"
    ],
    "scheduled_minutes": 9 * 60 + 0
    },

    "22692": {
        "name": "Superfast Express",
        "source": "Bengaluru",
        "destination": "New Delhi",
        "stations": [
            "Bengaluru",
            "Secunderabad",
            "Nagpur",
            "Bhopal",
            "Agra",
            "New Delhi"
    ],
    "scheduled_minutes": 9 * 60 + 30
},

    "12007": {
        "name": "Shatabdi Express",
        "source": "Chennai",
        "destination": "Mysuru",
        "stations": [
            "Chennai",
            "Katpadi",
            "Bengaluru",
            "Mandya",
            "Mysuru"
        ],
        "scheduled_minutes": 7 * 60 + 45
    },

    "12008": {
        "name": "Shatabdi Express",
        "source": "Mysuru",
        "destination": "Chennai",
        "stations": [
            "Mysuru",
            "Mandya",
            "Bengaluru",
            "Katpadi",
            "Chennai"
        ],
        "scheduled_minutes": 6 * 60 + 10
    },
    "12009": {
    "name": "Demo Shatabdi Express",
    "source": "Mysuru",
    "destination": "Chennai",
    "stations": [
        "Mysuru",
        "Mandya",
        "Bengaluru",
        "Katpadi",
        "Chennai"
    ],
    "scheduled_minutes": 6 * 60 + 30
},

    "12649": {
        "name": "Karnataka Sampark Kranti",
        "source": "Yeshwanthpur",
        "destination": "Hazrat Nizamuddin",
        "stations": [
            "Yeshwanthpur",
            "Dharwad",
            "Pune",
            "Bhopal",
            "Agra",
            "Hazrat Nizamuddin"
        ],
        "scheduled_minutes": 9 * 60 + 30
    },

    "12650": {
        "name": "Karnataka Sampark Kranti",
        "source": "Hazrat Nizamuddin",
        "destination": "Yeshwanthpur",
        "stations": [
            "Hazrat Nizamuddin",
            "Agra",
            "Bhopal",
            "Pune",
            "Dharwad",
            "Yeshwanthpur"
        ],
        "scheduled_minutes": 10 * 60 + 15
    },

    "16515": {
        "name": "Karwar Express",
        "source": "KSR Bengaluru",
        "destination": "Karwar",
        "stations": [
            "KSR Bengaluru",
            "Tumakuru",
            "Arsikere",
            "Shivamogga",
            "Mangaluru",
            "Karwar"
        ],
        "scheduled_minutes": 8 * 60 + 45
    },

    "16516": {
        "name": "Karwar Express",
        "source": "Karwar",
        "destination": "KSR Bengaluru",
        "stations": [
            "Karwar",
            "Mangaluru",
            "Shivamogga",
            "Arsikere",
            "Tumakuru",
            "KSR Bengaluru"
        ],
        "scheduled_minutes": 7 * 60 + 20
    },
    "16517": {
    "name": "Demo Karwar Express",
    "source": "Karwar",
    "destination": "KSR Bengaluru",
    "stations": [
        "Karwar",
        "Mangaluru",
        "Shivamogga",
        "Arsikere",
        "Tumakuru",
        "KSR Bengaluru"
    ],
    "scheduled_minutes": 7 * 60 + 40
},

    "16525": {
        "name": "Kanyakumari Express",
        "source": "KSR Bengaluru",
        "destination": "Kanyakumari",
        "stations": [
            "KSR Bengaluru",
            "Salem",
            "Erode",
            "Coimbatore",
            "Madurai",
            "Kanyakumari"
        ],
        "scheduled_minutes": 9 * 60 + 10
    },

    "16526": {
        "name": "Kanyakumari Express",
        "source": "Kanyakumari",
        "destination": "KSR Bengaluru",
        "stations": [
            "Kanyakumari",
            "Madurai",
            "Coimbatore",
            "Erode",
            "Salem",
            "KSR Bengaluru"
        ],
        "scheduled_minutes": 8 * 60 + 40
    }
}


# --------------------------------------------------
# Simulated Train State
# --------------------------------------------------

train_states = {

    "12627": {
        "speed": 52,
        "progress": 35,
        "delay": 9,
        "last_update": time.time()
    },

    "12628": {
        "speed": 90,
        "progress": 37,
        "delay": 25,
        "last_update": time.time()
    },
    "12850": {
    "speed": 85,
    "progress": 45,
    "delay": 5,
    "last_update": time.time()
},

"22692": {
    "speed": 95,
    "progress": 50,
    "delay": 8,
    "last_update": time.time()
},


    "12007": {
        "speed": 70,
        "progress": 65,
        "delay": 6,
        "last_update": time.time()
    },

    "12008": {
        "speed": 82,
        "progress": 48,
        "delay": 30,
        "last_update": time.time()
    },
    "12009": {
    "speed": 90,
    "progress": 45,
    "delay": 5,
    "last_update": time.time()
},

    "12649": {
        "speed": 61,
        "progress": 42,
        "delay": 12,
        "last_update": time.time()
    },

    "12650": {
        "speed": 95,
        "progress": 55,
        "delay": 2,
        "last_update": time.time()
    },

    "16515": {
        "speed": 68,
        "progress": 31,
        "delay": 8,
        "last_update": time.time()
    },

    "16516": {
        "speed": 76,
        "progress": 59,
        "delay": 35,
        "last_update": time.time()
    },
    "16517": {
    "speed": 88,
    "progress": 55,
    "delay": 4,
    "last_update": time.time()
},

    "16525": {
        "speed": 54,
        "progress": 27,
        "delay": 14,
        "last_update": time.time()
    },

    "16526": {
        "speed": 88,
        "progress": 72,
        "delay": 1,
        "last_update": time.time()
    }
}


# --------------------------------------------------
# Root
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "RailPulse AI Backend is running",
        "mode": "DEMO MODE - SIMULATED DATA",
        "trains_supported": len(train_routes)
    }


# --------------------------------------------------
# Health Check
# --------------------------------------------------

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "RailPulse AI API"
    }


# --------------------------------------------------
# ETA Prediction
# --------------------------------------------------

@app.get("/api/eta")
def get_eta(train_number: str = "12627"):

    # --------------------------------------------------
    # Check whether train exists
    # --------------------------------------------------

    if train_number not in train_routes:
        return {
            "error": "Train not found",
            "train_number": train_number
        }

    # --------------------------------------------------
    # Get train route
    # --------------------------------------------------

    train = train_routes[train_number]

    # --------------------------------------------------
    # Create state if necessary
    # --------------------------------------------------

    if train_number not in train_states:
        train_states[train_number] = {
            "speed": 70,
            "progress": 20,
            "delay": 5,
            "last_update": time.time()
        }

    state = train_states[train_number]

    # --------------------------------------------------
    # Update simulation every 10 seconds
    # --------------------------------------------------

        # --------------------------------------------------
    # Update simulation every 10 seconds
    # --------------------------------------------------

    current_time = time.time()
    if current_time - state["last_update"] >= 10:

    # Save old speed
        old_speed = state["speed"]

    # Change speed slightly
        speed_change = random.randint(-6, 6)

        new_speed = max(
        40,
        min(120, old_speed + speed_change)
    )

        state["speed"] = new_speed

    # Progress increases
        progress_change = random.choice([0, 1, 1, 2])

        state["progress"] = min(
        99,
        state["progress"] + progress_change
    )

    # -----------------------------------
    # SMART DELAY LOGIC
    # Speed increases → Delay decreases
    # Speed decreases → Delay increases
    # -----------------------------------

        if new_speed > old_speed:
        # Train became faster
            delay_change = random.choice([-2, -1, -1, 0])

        elif new_speed < old_speed:
        # Train became slower
            delay_change = random.choice([0, 1, 1, 2])

        else:
        # Speed unchanged
            delay_change = random.choice([-1, 0, 0, 1])

        state["delay"] = max(
        0,
            state["delay"] + delay_change
    )

        state["last_update"] = current_time
    # --------------------------------------------------
    # Current values
    # --------------------------------------------------

    speed = state["speed"]
    progress_percent = state["progress"]
    delay = state["delay"]
    # --------------------------------------------------
# Current Station and Next Station
# --------------------------------------------------

    stations = train["stations"]

# Calculate which station the train has reached/passed
    station_index = int(
    (progress_percent / 100) * (len(stations) - 1)
)

# Prevent index errors
    station_index = min(
    station_index,
    len(stations) - 1
)

    current_station = stations[station_index]

# Next station
    if station_index < len(stations) - 1:
      next_station = stations[station_index + 1]
    else:
      next_station = "Destination Reached"

    scheduled_minutes = train["scheduled_minutes"]

    # --------------------------------------------------
    # Predicted arrival
    # --------------------------------------------------

    predicted_minutes = scheduled_minutes + delay

    hours = predicted_minutes // 60
    minutes = predicted_minutes % 60

    # --------------------------------------------------
    # Status
    # --------------------------------------------------

    if delay == 0:
        status = "On Time"

    elif delay <= 10:
        status = "Slight Delay"

    else:
        status = "Delayed"

    # --------------------------------------------------
    # Delay Risk
    # --------------------------------------------------

    if delay <= 5:
        risk = "Low"

    elif delay <= 15:
        risk = "Medium"

    else:
        risk = "High"

    # --------------------------------------------------
    # AI Confidence
    # --------------------------------------------------

    confidence = round(
        random.uniform(90, 96),
        1
    )

    # --------------------------------------------------
    # Return response
    # --------------------------------------------------
    # --------------------------------------------------
# Find alternative trains
# --------------------------------------------------

    # --------------------------------------------------
# Find alternative trains
# --------------------------------------------------

    alternatives = []

    if delay > 20:

        for number, alternative in train_routes.items():

            if number == train_number:
                continue

            if (
                alternative["source"] == train["source"]
                and alternative["destination"] == train["destination"]
        ):

                alternative_state = train_states.get(number)

                if alternative_state is not None:

                    if alternative_state["delay"] < delay:

                        alternatives.append({
                        "train_number": number,
                        "train": f"{number} {alternative['name']}",
                        "source": alternative["source"],
                        "destination": alternative["destination"],
                        "delay_minutes": alternative_state["delay"],
                        "scheduled_arrival": (
                            f"{(alternative['scheduled_minutes'] // 60) % 12 or 12:02d}:"
                            f"{alternative['scheduled_minutes'] % 60:02d} "
                            f"{'AM' if alternative['scheduled_minutes'] // 60 < 12 else 'PM'}"
                        )
                    })
    return {
        "train_number": train_number,

        "train": f"{train_number} {train['name']}",

        "source": train["source"],

        "destination": train["destination"],
        "alternatives": alternatives,

        "stations": train["stations"],
        "current_station": current_station,

        "next_station": next_station,

        "scheduled_arrival": (
            f"{(scheduled_minutes // 60) % 12 or 12:02d}:"
            f"{scheduled_minutes % 60:02d} "
            f"{'AM' if scheduled_minutes // 60 < 12 else 'PM'}"
        ),

        "predicted_arrival": (
            f"{hours % 12 or 12:02d}:"
            f"{minutes:02d} "
            f"{'AM' if hours < 12 else 'PM'}"
        ),

        "delay_minutes": delay,

        "speed_kmph": speed,

        "progress_percent": progress_percent,

        "confidence": confidence,

        "status": status,

        "risk": risk
    }