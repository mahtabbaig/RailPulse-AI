# 🚆 RailPulse AI

## Dynamic Train ETA Intelligence Platform

RailPulse AI is an AI-powered train tracking and ETA prediction platform designed to provide passengers with smarter and more dynamic estimated arrival times.

The project was developed as a prototype for **Smart India Hackathon (SIH) 2026**.

---

## 🚀 Problem Statement

Traditional train arrival information may not always reflect real-time conditions accurately. Train delays can happen due to factors such as:

* 🚦 Speed variations
* 🛤️ Route conditions
* ⏱️ Unexpected delays
* 🚉 Station-related factors
* 📊 Changes in train progress

RailPulse AI aims to provide a **dynamic and intelligent ETA prediction system** that updates based on available train data.

---

## 💡 Solution

RailPulse AI analyzes train-related information such as:

* 🚆 Train speed
* 📍 Current progress
* ⏱️ Estimated delay
* 🚉 Train route and stations

Using this information, the system generates an updated ETA and displays the current train status.

The platform is designed to demonstrate how **AI and data-driven prediction** can improve railway passenger information systems.

---

## ✨ Features

* 🚆 Train Tracking
* ⏱️ Dynamic ETA Prediction
* 📊 Train Progress Monitoring
* ⚠️ Delay Prediction
* 🤖 AI Prediction Engine
* 🔄 Auto-refresh every 10 seconds
* 🌙 Modern Dark-Themed UI
* 📱 Responsive Interface
* 📈 ETA History Tracking

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Lucide React

### Backend

* Python
* FastAPI
* Uvicorn

---

## 📂 Project Structure

```text
RailPulse-AI/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/
│
├── backend/
│   ├── app/
│   │   └── main.py
│   └── requirements.txt
│
└── README.md
```

---

## 🔌 API Endpoints

### Health Check

```text
GET /api/health
```

### Get Train ETA

```text
GET /api/eta?train_number=12627
```

Example train numbers:

* 12627
* 12628
* 12007

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2️⃣ Run the Backend

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the server:

```bash
uvicorn app.main:app --reload
```

Backend will run on:

```text
http://127.0.0.1:8000
```

---

### 3️⃣ Run the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

---

## 🤖 AI Prediction Logic

Currently, RailPulse AI operates in **Demo Mode using simulated train data**.

The system considers parameters such as train speed and route progress to estimate delays and generate a dynamic ETA.

In future versions, the prediction engine can be enhanced using:

* Machine Learning models
* Historical train data
* Real-time GPS data
* Weather conditions
* Railway traffic data
* Station congestion information

---

## 🔮 Future Improvements

* 🤖 Real Machine Learning ETA Model
* 📡 Real-Time GPS Integration
* 🌦️ Weather-Based Delay Prediction
* 🚦 Railway Traffic Analysis
* 📱 Mobile Application
* 🔔 Passenger Delay Notifications
* 📊 Advanced Analytics Dashboard

---

## 🎯 Vision

To build an intelligent railway information platform that provides more accurate, dynamic, and reliable train arrival predictions using **AI, Machine Learning, and real-time data**.

---

## 👨‍💻 Developed For

**Smart India Hackathon (SIH) 2026**

### 🚆 RailPulse AI — Smarter Predictions. Better Journeys.

⭐ If you like this project, consider giving the repository a star!
