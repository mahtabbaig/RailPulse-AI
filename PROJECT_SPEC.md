You are an expert full-stack developer, UI/UX designer, data scientist, and machine-learning engineer.

I am a 2nd-year CSE student team preparing a prototype for Smart India Hackathon 2026.

PROBLEM STATEMENT:

"Dynamic Forecast of Expected Time of Arrival (ETA) for Coaching Trains"

PROJECT GOAL:

Build a professional, attractive, functional web application that demonstrates how AI/ML can dynamically predict the Expected Time of Arrival (ETA) of passenger/coaching trains.

The system should not simply display the scheduled arrival time.

It should continuously calculate/predict an updated ETA based on available train-running information such as:

- Current train position
- Distance remaining
- Current speed
- Average speed
- Existing delay
- Number of upcoming stops
- Expected station halt time
- Historical running patterns
- Other relevant operational factors

The prototype must clearly demonstrate:

CURRENT DATA → AI/ML PREDICTION → UPDATED ETA → DELAY/ON-TIME STATUS → PASSENGER/OFFICER INFORMATION

IMPORTANT:

This is an SIH 2026 prototype/demo.

Do NOT claim that this prototype has live access to Indian Railways data unless a real authorized API is actually connected.

Use realistic fictional/simulated train data for the demonstration.

Clearly label simulated data as "Demo/Simulated Data".

The application should be designed so a real railway data/API source could be integrated later.

--------------------------------------------------
TECHNOLOGY STACK
--------------------------------------------------

Frontend:
- React
- Vite
- Tailwind CSS
- React Router
- Recharts
- Lucide React
- Leaflet + OpenStreetMap for map visualization

Backend:
- Python
- FastAPI

Database:
- SQLite for the prototype

Machine Learning:
- Python
- pandas
- NumPy
- scikit-learn

Prediction models:
Start with a simple baseline model and at least one ML model.

Possible models:
- Linear Regression as baseline
- Random Forest Regressor for the main prototype

Keep the ML model modular so it can later be replaced by XGBoost or another more advanced model.

--------------------------------------------------
IMPORTANT PRODUCT REQUIREMENT
--------------------------------------------------

The application should feel like a real railway intelligence platform rather than a basic student CRUD website.

Use a modern professional design inspired by transportation/railway control systems.

DO NOT make it look like:
- A generic admin template
- A basic Bootstrap website
- A simple college project
- An AI chatbot

Make it look like a polished transportation technology product.

--------------------------------------------------
BRAND / PROJECT NAME
--------------------------------------------------

Create a professional project identity.

Suggested name:

"RailPulse AI"

Subtitle:

"Dynamic Train ETA Intelligence Platform"

Use the name throughout the prototype.

Also display:

"SIH 2026 Prototype"

--------------------------------------------------
USER TYPES
--------------------------------------------------

Create two main views:

1. Passenger View
2. Operations Dashboard

No complicated authentication is required for the prototype unless necessary.

--------------------------------------------------
PAGE 1 — LANDING PAGE
--------------------------------------------------

Create a beautiful landing page.

Hero section:

RailPulse AI

"Dynamic Train ETA Intelligence"

Short explanation:

"AI-assisted real-time ETA forecasting for smarter and more reliable passenger information."

Buttons:

"Track a Train"
"View Operations Dashboard"

Include an attractive railway/train visual treatment using CSS/UI elements rather than copyrighted images.

Add a small statistics section:

- Active Trains
- Stations Monitored
- ETA Predictions
- Average Prediction Accuracy

Use realistic demo values and clearly indicate they are simulated.

Add sections:

How It Works
Why Dynamic ETA?
Technology
Future Integration

--------------------------------------------------
PAGE 2 — TRAIN SEARCH / TRACKING
--------------------------------------------------

Create a passenger-friendly train tracking page.

Allow the user to:

- Enter train number
- Search/select a train
- Select origin
- Select destination

Display:

Train number
Train name
Origin
Destination
Current location
Next station
Current speed
Current delay
Scheduled ETA
AI predicted ETA
Difference between scheduled and predicted ETA
Train status

Example:

TRAIN 12627

Bengaluru → Mysuru

Current Location:
Mandya

Next Station:
Mysuru

Current Speed:
58 km/h

Scheduled Arrival:
18:00

AI Predicted Arrival:
18:14

Delay:
+14 min

Status:
DELAYED

Make the predicted ETA visually prominent.

--------------------------------------------------
PAGE 3 — LIVE TRAIN MAP
--------------------------------------------------

Create an interactive railway route map using:

Leaflet + OpenStreetMap

Show:

- Railway route
- Stations
- Current train position
- Previous station
- Next station
- Destination

Use a moving train marker.

When demo mode is enabled, simulate the train moving along the route.

Show a side panel:

TRAIN 12627
Current speed
Distance remaining
Current delay
Predicted ETA

Add a button:

"Simulate Next Update"

When clicked, update:
- Position
- Speed
- Distance
- Delay
- ETA

This should demonstrate the concept of dynamic forecasting.

--------------------------------------------------
PAGE 4 — AI ETA PREDICTION
--------------------------------------------------

Create a dedicated prediction screen.

Display the input variables:

Distance remaining
Current speed
Average route speed
Current delay
Number of upcoming stops
Expected halt duration
Historical delay factor

Then show:

AI PREDICTED ETA

18:14

Prediction confidence:

87%

IMPORTANT:

Do not claim that the confidence value is statistically valid unless it is actually calculated.

If it is only a demo value, label it:

"Prototype confidence indicator"

Also display:

Scheduled ETA:
18:00

Predicted ETA:
18:14

Expected delay:
+14 minutes

--------------------------------------------------
PAGE 5 — DYNAMIC ETA SIMULATION
--------------------------------------------------

This is one of the MOST IMPORTANT features.

Create a simulation where train conditions change.

Example:

Initial:

Speed = 60 km/h
Delay = 5 min
Distance = 80 km

Predicted ETA:
18:08

Then simulate:

Speed drops to 40 km/h

System automatically recalculates:

Predicted ETA:
18:17

Then simulate:

Speed increases to 65 km/h

System recalculates:

Predicted ETA:
18:12

Display a graph:

Time → ETA prediction

The graph should visually demonstrate that ETA changes dynamically as new train information arrives.

This should be the main "wow" feature during the hackathon presentation.

--------------------------------------------------
PAGE 6 — OPERATIONS DASHBOARD
--------------------------------------------------

Create a professional railway operations dashboard.

Top cards:

Active Trains
Delayed Trains
On-Time Trains
Critical Delays

Then create:

Live Train Table

Columns:

Train
Route
Current Station
Next Station
Speed
Delay
Predicted ETA
Status

Example:

12627 | Bengaluru-Mysuru | Mandya | Mysuru | 58 km/h | +14 min | 18:14 | Delayed

Use clear status indicators:

GREEN = On Time
YELLOW = Minor Delay
ORANGE = Moderate Delay
RED = Major Delay

Add search and filters.

--------------------------------------------------
PAGE 7 — TRAIN DETAILS
--------------------------------------------------

Clicking a train should open a detailed page.

Show:

Train information
Route
Current position
Speed
Scheduled ETA
Predicted ETA
Delay

Then show an ETA timeline:

Scheduled
↓
Current prediction
↓
Updated prediction
↓
Expected arrival

Also show:

"Why did the ETA change?"

Example:

ETA increased by 6 minutes because:

- Current speed decreased
- Existing delay increased
- Upcoming station halt added

This explainability feature is important.

--------------------------------------------------
PAGE 8 — DELAY ANALYTICS
--------------------------------------------------

Create a professional analytics dashboard.

Charts:

1. Scheduled vs Predicted ETA

2. Average delay by station

3. Average speed by route section

4. Delay distribution

5. ETA prediction history

6. Train punctuality trend

Use Recharts.

Charts must be clean and readable.

--------------------------------------------------
PAGE 9 — PREDICTION EXPLANATION
--------------------------------------------------

Create an explainable AI section.

Do not simply display:

"AI predicted 18:14."

Instead show:

PREDICTION FACTORS

Distance remaining
██████████ 40%

Current speed
███████ 25%

Existing delay
██████ 20%

Upcoming stops
███ 10%

Historical pattern
██ 5%

These percentages must either come from the actual model/feature importance or be explicitly labelled as "Prototype visualization".

Add:

"Why is the train predicted to be late?"

Example:

"Current speed is lower than the historical average for this route segment, and the train is already running 8 minutes late."

--------------------------------------------------
PAGE 10 — DATA / MODEL INFORMATION
--------------------------------------------------

Create a page explaining the ML system in simple language.

Show:

INPUT DATA

Distance
Speed
Delay
Stops
Historical patterns
Station halt

↓

DATA PROCESSING

↓

ML MODEL

↓

PREDICTED ETA

Explain that the prototype uses simulated/historical-style data.

Include a section:

"Future Real-Time Integration"

Explain that a production version could connect to authorized railway operational data sources/APIs.

Do NOT invent or claim access to APIs.

--------------------------------------------------
BACKEND
--------------------------------------------------

Create a clean FastAPI backend.

Suggested endpoints:

GET /api/trains
GET /api/trains/{train_id}
GET /api/trains/{train_id}/position
POST /api/predict-eta
GET /api/trains/{train_id}/eta-history
GET /api/analytics
POST /api/simulation/update

The prediction endpoint should accept:

distance_remaining
current_speed
average_speed
current_delay
upcoming_stops
expected_halt_time
historical_delay_factor

and return:

scheduled_eta
predicted_eta
delay_minutes
status
prediction_factors

--------------------------------------------------
DATABASE
--------------------------------------------------

Create SQLite tables for:

trains
stations
routes
train_positions
eta_predictions
delay_records

Use fictional/demo data.

Create at least:

10 trains
15+ stations
multiple routes
multiple ETA records

Use realistic Indian railway-style data but clearly label it as DEMO DATA.

Do not imply that the data is official railway data.

--------------------------------------------------
MACHINE LEARNING
--------------------------------------------------

Create:

backend/ml/

Inside it:

data_generator.py
train_model.py
predictor.py
model_evaluation.py

Generate a realistic synthetic dataset.

Features:

distance_remaining
current_speed
average_speed
current_delay
upcoming_stops
halt_duration
historical_delay

Target:

actual_travel_time / ETA

Train a baseline Linear Regression model.

Train a Random Forest model.

Compare their performance.

Show appropriate evaluation metrics such as:

MAE
RMSE
R²

Do not fabricate model performance.

Calculate the metrics from the generated dataset.

Save the trained model locally.

--------------------------------------------------
REAL-TIME SIMULATION
--------------------------------------------------

Implement a simulation engine.

Every update should modify:

train position
speed
distance remaining
delay

Then call the ETA prediction API.

The UI should update the predicted ETA.

Include:

START SIMULATION
PAUSE
RESET
NEXT UPDATE

Make the simulation smooth and visually impressive.

--------------------------------------------------
ERROR HANDLING
--------------------------------------------------

Implement:

Loading states
API errors
Empty states
Invalid train number
Invalid inputs
Backend unavailable message

Do not allow the frontend to crash.

--------------------------------------------------
RESPONSIVE DESIGN
--------------------------------------------------

The website must work on:

Desktop
Laptop
Tablet
Mobile

Use:
- responsive grids
- clean cards
- readable typography
- proper spacing
- accessible buttons

--------------------------------------------------
UI/UX REQUIREMENTS
--------------------------------------------------

Make the design exceptional.

Use:

- Modern dark/light transportation dashboard aesthetic
- Professional typography
- Subtle gradients
- Glass/soft-card effects where appropriate
- Smooth transitions
- Micro animations
- Clean charts
- Attractive train/map visualization
- Consistent iconography
- Excellent spacing
- Strong visual hierarchy

Avoid excessive animations.

Do not make the UI flashy or childish.

The main focus should remain:

TRAIN → DATA → AI → ETA

--------------------------------------------------
ACCESSIBILITY
--------------------------------------------------

Use:
- readable contrast
- keyboard-friendly controls
- semantic HTML
- clear labels
- meaningful error messages

--------------------------------------------------
SECURITY
--------------------------------------------------

For the prototype:

- Validate backend inputs
- Do not expose secret API keys
- Use environment variables
- Do not store sensitive personal information

--------------------------------------------------
README
--------------------------------------------------

Create a detailed README explaining:

1. Problem statement
2. Project objective
3. Features
4. Architecture
5. Technology stack
6. How ETA prediction works
7. ML model
8. Dataset
9. API endpoints
10. Folder structure
11. Installation
12. How to run
13. Demo instructions
14. Limitations
15. Future scope

--------------------------------------------------
FOLDER STRUCTURE
--------------------------------------------------

Create something similar to:

railpulse-ai/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── app/
│   ├── ml/
│   ├── database/
│   ├── data/
│   ├── requirements.txt
│   └── ...
│
├── README.md
└── .gitignore

Keep the code modular and understandable.

--------------------------------------------------
DEMO MODE
--------------------------------------------------

Create a prominent:

"DEMO MODE"

indicator.

Because this is a hackathon prototype, all simulated data should be clearly marked.

The demo should be designed for a 3–5 minute presentation.

Suggested demo:

1. Open dashboard
2. Select a train
3. Show current speed and delay
4. Show scheduled ETA
5. Show AI predicted ETA
6. Open live map
7. Click "Simulate Next Update"
8. Change train speed
9. Show ETA automatically changing
10. Open "Why did ETA change?"
11. Show prediction factors
12. Show analytics

--------------------------------------------------
IMPORTANT IMPLEMENTATION RULE
--------------------------------------------------

Do NOT generate a fake static website where buttons do nothing.

The following MUST actually work:

- Train selection
- API calls
- Database
- ETA prediction
- ML model
- Dynamic simulation
- ETA updates
- Charts
- Map
- Dashboard filtering
- Train details
- Status changes

If something cannot be implemented fully, create a working simplified version and clearly document the limitation.

--------------------------------------------------
DEVELOPMENT PROCESS
--------------------------------------------------

Do not blindly generate everything in one huge response.

Work step-by-step:

PHASE 1:
Create project structure and backend.

PHASE 2:
Create database and demo data.

PHASE 3:
Create ML dataset and train prediction models.

PHASE 4:
Create FastAPI prediction endpoints.

PHASE 5:
Create React frontend.

PHASE 6:
Connect frontend to backend.

PHASE 7:
Implement map.

PHASE 8:
Implement dynamic ETA simulation.

PHASE 9:
Implement dashboard and analytics.

PHASE 10:
Polish UI/UX.

PHASE 11:
Run and test the complete application.

PHASE 12:
Fix all errors.

Do not stop at code generation. Actually run the project and test it.

--------------------------------------------------
FINAL REQUIREMENTS
--------------------------------------------------

At the end, provide:

1. Complete project
2. Exact installation commands
3. Exact commands to run frontend
4. Exact commands to run backend
5. Database setup instructions
6. ML model setup instructions
7. Test instructions
8. 3–5 minute SIH demonstration script
9. Simple explanation of the architecture for a 2nd-year student
10. Likely judge questions and answers
11. Technical limitations
12. Future improvements

MOST IMPORTANT:

The final application should demonstrate one clear innovation:

"DYNAMIC ETA"

When train conditions change, the predicted arrival time should change.

The judge should be able to see this happen live.

Do not focus on making hundreds of features.

Make the core prediction + dynamic update + explanation extremely reliable and impressive.