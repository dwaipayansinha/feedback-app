# Feedback App

A simple fullstack feedback application using FastAPI (backend) and React (frontend).

## 📦 Project Structure

```
feedback-app/
├── backend/     # FastAPI backend
├── frontend/    # React frontend
├── Dockerfile   # Backend container image
```

---

## 🚀 Local Development Setup

### Backend (FastAPI)

#### ✅ Windows PowerShell

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### ✅ Windows CMD

```cmd
cd backend
python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### ✅ Linux/macOS

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

### Frontend (React)

#### ✅ All Platforms

```bash
cd frontend
npm install
npm start
```

✅ The React app is pre-configured. You do NOT need to run `npx create-react-app`.

---

## ☁️ Deploy Backend to Google Cloud Run

```bash
gcloud auth login
gcloud config set project <YOUR_PROJECT_ID>
gcloud artifacts repositories create my-repo --repository-format=docker --location=us-central1

docker build -t us-central1-docker.pkg.dev/<YOUR_PROJECT_ID>/my-repo/feedback-api:latest .
docker push us-central1-docker.pkg.dev/<YOUR_PROJECT_ID>/my-repo/feedback-api:latest

gcloud run deploy feedback-api \
  --image us-central1-docker.pkg.dev/<YOUR_PROJECT_ID>/my-repo/feedback-api:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 🌐 Deploy Frontend to Firebase Hosting

```bash
cd frontend
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting
# Use 'build' as public directory, configure as single-page app: Yes
firebase deploy
```

---

## ✅ API Overview

- `POST /submit?name=...&message=...` → Submit feedback
- `GET /feedbacks` → Get all feedbacks
- `GET /` → Health check

---

## 🛠 Notes

- Centralized `API_BASE` constant in `App.js` controls backend URL
- CORS enabled for communication between frontend and backend
- SQLite used for simplicity; upgradeable to PostgreSQL for production


---

## 📋 Requirements and Tools

### ✅ Prerequisites

Before running or deploying this application, make sure you have the following tools installed:

### 🔧 Backend (Python/FastAPI)

- **Python 3.10 or higher**
  - Required to run the FastAPI application.
  - You can download Python from: https://www.python.org/downloads/

- **pip**
  - Comes with Python. Used to install required packages.

- **Virtual Environment (venv)**
  - Used to isolate project dependencies.
  - This is a built-in module in Python.

- **Uvicorn**
  - ASGI server used to serve FastAPI apps.
  - Installed via `pip install -r requirements.txt`.

### 🔧 Frontend (React)

- **Node.js (v20.x or higher)**
  - JavaScript runtime environment required for building and running the React app.
  - Download from: https://nodejs.org/en/download

- **npm**
  - Comes with Node.js. Used to install frontend packages and run scripts.

- **Firebase CLI (optional, for frontend deployment)**
  - Used to deploy the frontend to Firebase Hosting.
  - Install via `npm install -g firebase-tools`

### ☁️ Deployment Tools (Optional)

- **Docker**
  - Used to containerize and build the backend for deployment.
  - Install from: https://www.docker.com/products/docker-desktop

- **Google Cloud SDK (gcloud)**
  - Required for deploying the backend to Google Cloud Run.
  - Install from: https://cloud.google.com/sdk/docs/install

- **Firebase Hosting account**
  - Enable Firebase for your Google Cloud project at: https://console.firebase.google.com/

---

## ✅ Summary

| Tool        | Purpose                             |
|-------------|-------------------------------------|
| Python      | Run backend with FastAPI            |
| pip         | Install Python dependencies         |
| venv        | Isolate Python environment          |
| Node.js     | Run and build the React frontend    |
| npm         | Install React dependencies          |
| Docker      | Containerize backend (Cloud Run)    |
| gcloud CLI  | Deploy backend to Google Cloud      |
| Firebase CLI| Deploy frontend to Firebase Hosting |

---

