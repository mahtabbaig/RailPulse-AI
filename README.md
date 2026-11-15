# 🚆 RailPulse AI

### Dynamic Train ETA Intelligence Platform

**Smarter Predictions. Better Journeys.**

RailPulse AI is an intelligent train tracking and ETA prediction platform designed to provide passengers with smarter, dynamic, and more informative train journey updates.

The platform combines **train tracking, dynamic ETA prediction, delay analysis, interactive route visualization, voice assistance, and an AI-powered passenger chatbot** to improve the railway passenger experience.

It also uses **Docker containerization and GitHub Actions CI/CD automation** to simplify application deployment and development workflows.

---

## 🚀 Problem Statement

Passengers often face uncertainty when trains are delayed or when arrival information does not clearly explain the current situation.

Passengers may struggle to understand:

- 🚆 Where is the train?
- ⏱️ When is the train expected to arrive?
- ⚠️ How serious is the delay?
- 📍 How much of the journey is completed?
- 🗺️ Where is the train on its route?
- 🎤 How can passengers quickly access information?

RailPulse AI aims to address these challenges through a smart, interactive, and dynamic train intelligence platform.

---

## 💡 Our Solution

RailPulse AI processes train-related information such as:

- Train speed
- Train progress
- Estimated delay
- Route and station information
- Journey progress

Using this information, the system generates dynamic ETA updates and displays important train information through an easy-to-understand interface.

The platform also includes an interactive map, voice assistant, and AI chatbot to make train information more accessible.

---

## ✨ Key Features

### 🚆 1. Train Tracking

Users can search and track trains using their train number.

The system displays:

- Train number and status
- Current journey progress
- Upcoming stations
- Estimated arrival time

### ⏱️ 2. Dynamic ETA Prediction

RailPulse AI generates estimated arrival times based on available train information.

The system considers:

- Train speed
- Journey progress
- Estimated delays

### ⚠️ 3. Delay Prediction & Risk Analysis

The platform provides information about possible train delays.

Users can understand whether a train is:

- 🟢 On Time
- 🟡 Slightly Delayed
- 🔴 Delayed

### 🗺️ 4. Interactive Train Map

The train map provides a visual representation of the train journey.

Users can:

- View the train route
- See train movement visually
- Understand journey progress
- View important stations

### 🎤 5. Voice Assistant

The voice assistant allows users to interact with the platform using voice commands.

Example interactions:

- Ask for train status
- Ask for ETA
- Ask about delays
- Access train-related information using voice

### 🤖 6. AI-Powered Passenger Chatbot

RailPulse AI includes a Gemini-powered chatbot that helps passengers understand train-related information.

The chatbot can answer passenger questions using information provided by the application.

It makes train information easier to understand through conversational interaction.

### 🧠 7. AI Prediction Engine

The platform includes an AI prediction interface demonstrating how intelligent prediction can improve railway ETA estimation.

Currently, the application operates in **Demo Mode using simulated train data**.

Future versions can integrate machine learning models and real-time railway information.

### 📊 8. Train Progress Monitoring

Users can monitor their journey through:

- Progress percentage
- Route visualization
- Station indicators
- ETA updates

### 🔄 9. Auto Refresh

Train information automatically refreshes every 10 seconds to simulate real-time monitoring.

### 📈 10. ETA History Tracking

The system tracks ETA changes over time to visualize how predicted arrival times change.

### 🌙 11. Modern User Interface

- Modern dark-themed interface
- Responsive design
- Interactive animations
- Visual train tracking
- User-friendly navigation

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Lucide React
- Leaflet Map Integration
- Web Speech API

### Backend

- Python
- FastAPI
- Uvicorn
- Google Gemini API

### DevOps & Deployment

- Docker
- Docker Compose
- Nginx
- GitHub Actions
- Docker Hub
- Git & GitHub

---

## 🏗️ System Architecture

```text
             USER
               |
               v
        REACT FRONTEND
               |
               v
         NGINX SERVER
               |
               v
        FASTAPI BACKEND
               |
               v
       TRAIN DATA PROCESSING
               |
       +-------+--------+
       |       |        |
       v       v        v
      ETA    DELAY    JOURNEY
   PREDICTION ANALYSIS PROGRESS
       |       |        |
       +-------+--------+
               |
               v
       TRAIN INFORMATION
               |
       +-------+--------+
       |       |        |
       v       v        v
      MAP    VOICE     AI CHATBOT
   TRACKING ASSISTANT  (GEMINI)
```

---

## 🐳 Docker Integration

RailPulse AI uses Docker to containerize its frontend and backend separately.

### Docker Components

| Component | Purpose |
|---|---|
| Backend Dockerfile | Containerizes FastAPI backend |
| Frontend Dockerfile | Builds React frontend and serves it using Nginx |
| Docker Compose | Runs frontend and backend together |
| Nginx | Serves frontend and forwards API requests to backend |

### Run Using Docker Compose

**1. Clone the repository**

```bash
git clone https://github.com/mahtabbaig/RailPulse-AI.git
```

**2. Navigate into the project**

```bash
cd RailPulse-AI
```

**3. Configure the Gemini API key**

Create a `.env` file inside the `backend` folder.

Add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholder with your own Gemini API key.

**4. Build and start the containers**

```bash
docker compose up --build
```

**5. Open the application**

Frontend:

```text
http://localhost:5173
```

Backend API:

```text
http://localhost:8000
```

API Documentation:

```text
http://localhost:8000/docs
```

To stop the containers:

```bash
docker compose down
```

---

## 🔄 CI/CD Integration Using GitHub Actions

RailPulse AI uses **GitHub Actions** to automate Continuous Integration and Continuous Delivery.

Whenever code is pushed to the `main` branch, the workflow automatically starts.

### CI – Continuous Integration

The CI pipeline performs:

1. Checks out the GitHub repository.
2. Sets up Python.
3. Installs backend dependencies.
4. Validates backend Python code.
5. Sets up Node.js.
6. Installs frontend dependencies.
7. Builds the React application.

### CD – Continuous Delivery

After successful CI validation, the CD pipeline:

1. Sets up Docker Buildx.
2. Logs into Docker Hub using GitHub Secrets.
3. Builds the backend Docker image.
4. Builds the frontend Docker image.
5. Pushes both images to Docker Hub.

### CI/CD Workflow

```text
       Developer
           |
           v
     Modify Source Code
           |
           v
      Push to GitHub
           |
           v
     GitHub Actions
           |
           v
   CI - Build & Validate
           |
           v
      CI Successful?
           |
           v
   CD - Build Docker Images
           |
           v
     Push to Docker Hub
           |
           v
     Pipeline Completed
```

### Docker Hub Images

**Backend Image**

https://hub.docker.com/r/mahtabazeezbaig/railpulse-backend

**Frontend Image**

https://hub.docker.com/r/mahtabazeezbaig/railpulse-frontend

### GitHub Actions Workflow

The CI/CD configuration is available at:

```text
.github/workflows/ci-cd.yml
```

GitHub Actions automatically validates the application and publishes updated Docker images after successful CI execution.

---

## 📂 Project Structure

```text
RailPulse-AI/
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml
│
├── backend/
│   ├── app/
│   │   └── main.py
│   ├── Dockerfile
│   ├── .dockerignore
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .dockerignore
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

### Health Check

```http
GET /api/health
```

Checks whether the backend is running properly.

### Get Train ETA

```http
GET /api/eta?train_number=12627
```

Retrieves train ETA information.

Example train numbers:

- 12627
- 12628
- 12007

### AI Chatbot

```http
POST /api/chat
```

Handles passenger questions through the Gemini-powered chatbot.

---

## ⚙️ Run Locally Without Docker

### 1. Clone the Repository

```bash
git clone https://github.com/mahtabbaig/RailPulse-AI.git
cd RailPulse-AI
```

### 2. Run the Backend

```bash
cd backend
pip install -r requirements.txt
```

Activate your virtual environment if you are using one.

Configure the Gemini API key in `backend/.env`.

Start the backend:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

### 3. Run the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal.

---

## 🤖 AI Prediction Logic

Currently, RailPulse AI operates in **Demo Mode using simulated train data**.

The system analyzes available parameters such as:

- Train speed
- Journey progress
- Estimated delay

Based on these factors, it generates dynamic ETA and train status information.

### Current Status

⚠️ The current prototype uses simulated train data for demonstration purposes and is not connected to a live Indian Railways tracking feed.

### Future AI Implementation

The prediction system can be enhanced using machine learning algorithms trained on:

- Historical train arrival data
- Train speed patterns
- Route information
- Weather conditions
- Railway traffic
- Station congestion
- Previous delay patterns

---

## 🔮 Future Improvements

- Real Machine Learning ETA prediction model
- Real-time GPS integration
- Real railway network integration
- Weather-based delay prediction
- Railway traffic analysis
- Station congestion analysis
- Passenger delay notifications
- Mobile application
- Multilingual voice assistant
- Advanced analytics dashboard
- Alternative train recommendations

---

## 🎯 Vision

To build an intelligent railway information platform that provides passengers with more accurate, dynamic, accessible, and reliable train information using:

- Artificial Intelligence
- Machine Learning
- Real-Time Data
- Interactive Maps
- Voice Technology
- Automated DevOps Workflows

---

## 🚆 RailPulse AI

### Smarter Predictions. Better Journeys.

⭐ If you like this project, consider giving the repository a star!