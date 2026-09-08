# 🚆 RailPulse AI

## Dynamic Train ETA Intelligence Platform

RailPulse AI is an intelligent train tracking and ETA prediction platform designed to provide passengers with smarter, dynamic, and more informative train journey updates.

The platform combines **train tracking, dynamic ETA prediction, delay analysis, live route visualization, and voice assistance** to improve the passenger experience.

Developed as a prototype for **Smart India Hackathon (SIH) 2026**.

---

# 🚀 Problem Statement

Passengers often face uncertainty when trains are delayed or when arrival information does not clearly explain the current situation.

Traditional train tracking systems may show basic information such as train status and expected arrival time, but passengers may still struggle to understand:

* 🚆 Where exactly is the train?
* ⏱️ When is the train expected to arrive?
* ⚠️ How serious is the delay?
* 📍 How much of the journey is completed?
* 🗺️ Where is the train on the route?
* 🎤 How can passengers quickly access information without navigating multiple screens?

RailPulse AI aims to address these challenges by providing a **smart, interactive, and dynamic train intelligence platform**.

---

# 💡 Our Solution

RailPulse AI collects and analyzes train-related information such as:

* 🚆 Train speed
* 📍 Train progress
* ⏱️ Estimated delay
* 🚉 Route and station information
* 📊 Journey progress

Using this information, the system generates a dynamic ETA and displays important train information in an easy-to-understand interface.

The platform also includes an interactive map and voice assistant to make train information more accessible and user-friendly.

---

# ✨ Key Features

## 🚆 Train Tracking

Users can search and track trains using the train number.

The system displays:

* Train ID
* Train status
* Current journey progress
* Upcoming stations
* Estimated arrival time

---

## ⏱️ Dynamic ETA Prediction

RailPulse AI generates a dynamic estimated arrival time based on available train data.

The system considers factors such as:

* Train speed
* Journey progress
* Estimated delays

---

## ⚠️ Delay Prediction & Risk Analysis

The platform analyzes train conditions and provides information about possible delays.

Users can understand whether the train is:

* 🟢 On Time
* 🟡 Slightly Delayed
* 🔴 Delayed

---

## 🗺️ Live Train Map

The new Live Train Map feature provides a visual representation of the train journey.

Users can:

* View the train route
* See train movement visually
* Understand the journey progress
* View important stations
* Get a better understanding of the train's current location

This makes train tracking more interactive and easier to understand.

---

## 🎤 Voice Assistant

RailPulse AI includes a voice assistant that allows users to interact with the platform using voice commands.

The voice assistant can help users access train-related information more conveniently.

Example use cases:

* 🎤 Ask for train status
* 🎤 Ask for ETA
* 🎤 Ask about delays
* 🎤 Get train-related information without manually navigating the application

This feature improves accessibility and provides a more modern user experience.

---

## 🤖 AI Prediction Engine

The platform includes an AI Prediction Engine interface that demonstrates how intelligent prediction can be used to improve railway ETA estimation.

Currently, the project operates in **Demo Mode using simulated train data**.

Future versions can integrate:

* Machine Learning models
* Historical railway data
* Real-time GPS data
* Weather data
* Railway traffic information
* Station congestion data

---

## 📊 Train Progress Monitoring

Users can visually monitor the train journey using:

* Progress percentage
* Route visualization
* Station indicators
* ETA updates

---

## 🔄 Auto Refresh

Train information automatically refreshes every **10 seconds** to simulate real-time monitoring.

---

## 📈 ETA History Tracking

The system tracks ETA changes over time to help visualize how the predicted arrival time changes.

---

## 🌙 Modern User Interface

RailPulse AI provides:

* Modern dark-themed UI
* Responsive design
* Interactive animations
* Visual train tracking
* User-friendly navigation

---

# 🛠️ Tech Stack

## Frontend

* ⚛️ React
* ⚡ Vite
* 🎨 Tailwind CSS
* 🎯 Lucide React
* 🗺️ Map Integration
* 🎤 Web Speech API / Voice Recognition

## Backend

* 🐍 Python
* ⚡ FastAPI
* 🚀 Uvicorn

---

# 📂 Project Structure

```text
RailPulse-AI/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── LiveMap
│   │   │   ├── VoiceAssistant
│   │   │   └── Other Components
│   │   │
│   │   ├── pages/
│   │   │   ├── Home
│   │   │   ├── Tracking
│   │   │   ├── AI Prediction
│   │   │   └── Dashboard
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── app/
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── README.md
└── .gitignore
```

---

# 🔌 API Endpoints

## 🟢 Health Check

```text
GET /api/health
```

This endpoint checks whether the RailPulse AI backend is running properly.

---

## 🚆 Get Train ETA

```text
GET /api/eta?train_number=12627
```

Example Train Numbers:

* 🚆 12627
* 🚆 12628
* 🚆 12007

---

# ⚙️ How to Run the Project

## 1️⃣ Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project folder:

```bash
cd RailPulse-AI
```

---

# 2️⃣ Run the Backend

Move into the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

---

# 3️⃣ Run the Frontend

Open another terminal.

Move into the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

Open the application using the local URL shown in the terminal.

---

# 🔄 How RailPulse AI Works

```text
User
  │
  ▼
Enter Train Number
  │
  ▼
React Frontend
  │
  ▼
FastAPI Backend
  │
  ▼
Train Data Processing
  │
  ├── Train Speed
  ├── Journey Progress
  └── Estimated Delay
  │
  ▼
Dynamic ETA Prediction
  │
  ├── Train Tracking
  ├── Delay Status
  ├── Live Route Map
  └── Voice Assistant
  │
  ▼
User Receives Smart Train Information
```

---

# 🤖 AI Prediction Logic

Currently, RailPulse AI operates in **Demo Mode using simulated train data**.

The system analyzes available parameters such as:

* Train speed
* Journey progress
* Estimated delay

Based on these factors, the system generates a dynamic ETA and train status.

### Current Status

⚠️ The current prototype uses simulated data for demonstration purposes.

### Future AI Implementation

The prediction system can be enhanced using Machine Learning algorithms trained on:

* Historical train arrival data
* Train speed patterns
* Route information
* Weather conditions
* Railway traffic
* Station congestion
* Previous delay patterns

This would allow RailPulse AI to generate more accurate ETA predictions in a real-world implementation.

---

# 🗺️ Live Map Feature

The Live Train Map provides a visual representation of the train journey.

The feature is designed to help passengers quickly understand:

* 📍 Train location
* 🛤️ Route information
* 🚉 Important stations
* 📈 Journey progress
* 🚆 Train movement

Instead of only reading numerical data, users can visually understand where the train is on its journey.

---

# 🎤 Voice Assistant Feature

The Voice Assistant allows users to interact with RailPulse AI using voice.

The goal is to make train information:

* Faster to access
* Easier to understand
* More accessible
* More user-friendly

Users can interact with the system to quickly get information such as:

```text
"What is the train ETA?"

"Show train status"

"Is the train delayed?"

"Where is the train?"
```

The system processes the voice input and provides relevant train information.

---

# 🚀 Unique Features

RailPulse AI combines multiple train intelligence features in a single platform:

| Feature             | Description                                |
| ------------------- | ------------------------------------------ |
| 🚆 Smart Tracking   | Track train information using train number |
| ⏱️ Dynamic ETA      | Continuously updated ETA prediction        |
| ⚠️ Delay Analysis   | Identify possible delay conditions         |
| 🗺️ Live Train Map  | Visual route and journey tracking          |
| 🎤 Voice Assistant  | Voice-based interaction                    |
| 🤖 AI Prediction    | Intelligent ETA prediction concept         |
| 📊 Journey Progress | Visual train progress monitoring           |
| 📈 ETA History      | Track ETA changes over time                |
| 🔄 Auto Refresh     | Updates every 10 seconds                   |

---

# 🔮 Future Improvements

* 🤖 Real Machine Learning ETA Prediction Model
* 📡 Real-Time GPS Integration
* 🗺️ Real Railway Network Integration
* 🌦️ Weather-Based Delay Prediction
* 🚦 Railway Traffic Analysis
* 🚉 Station Congestion Analysis
* 🔔 Passenger Delay Notifications
* 📱 Mobile Application
* 🌐 Multi-Language Voice Assistant
* 📊 Advanced Analytics Dashboard
* 🔄 Alternative Train Recommendations

---

# 🎯 Vision

To build an intelligent railway information platform that provides passengers with more accurate, dynamic, accessible, and reliable train information using:

* Artificial Intelligence
* Machine Learning
* Real-Time Data
* Interactive Maps
* Voice Technology

---

# 👨‍💻 Developed For

**Smart India Hackathon (SIH) 2026**

---

# 🚆 RailPulse AI

### Smarter Predictions. Better Journeys.

⭐ If you like this project, consider giving the repository a star!
