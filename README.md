# Feedback App

A simple full-stack feedback application using:

- 📦 **Backend**: FastAPI (Python)
- 💻 **Frontend**: React (Create React App)
- ☁️ **Deployment**:
  - Backend → Google Cloud Run
  - Frontend → Firebase Hosting

---

## 📋 Requirements and Tools

### ✅ Prerequisites

**Backend (FastAPI)**

- Python 3.10 or 3.11
- pip
- venv (virtual environment)
- Docker (for deployment)
- Google Cloud SDK (gcloud CLI)

**Frontend (React)**

- Node.js ≥ v20
- npm
- Firebase CLI (install via `npm install -g firebase-tools`)

---

## ⚙️ Local Setup Instructions

### 🔧 Backend Setup (Python + FastAPI)

#### 🪟 Windows PowerShell / CMD

```powershell
cd backend
python -m venv venv
.env\Scriptsctivate
pip install -r requirements.txt
uvicorn main:app --reload
```

#### 🐧 Linux / macOS

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

App will run at `http://127.0.0.1:8000`

---

### 💻 Frontend Setup (React)

#### 🪟 Windows PowerShell / CMD

```powershell
cd frontend
npm install
npm start
```

#### 🐧 Linux / macOS

```bash
cd frontend
npm install
npm start
```

App will run at `http://localhost:3000`

---

## 🚀 Backend Deployment (Google Cloud Run)

### Step-by-Step

```bash
gcloud auth login
gcloud config set project <YOUR_PROJECT_ID>

gcloud artifacts repositories create my-repo \
  --repository-format=docker \
  --location=us-central1

docker build -t us-central1-docker.pkg.dev/<YOUR_PROJECT_ID>/my-repo/feedback-api:latest .
docker push us-central1-docker.pkg.dev/<YOUR_PROJECT_ID>/my-repo/feedback-api:latest

gcloud run deploy feedback-api \
  --image us-central1-docker.pkg.dev/<YOUR_PROJECT_ID>/my-repo/feedback-api:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

> Replace `<YOUR_PROJECT_ID>` with your actual Google Cloud Project ID  
> Example: `<YOUR_PROJECT_ID>`

---

## 🌐 Frontend Deployment (Firebase Hosting)

### One-time Setup

```bash
cd frontend
firebase login
firebase init hosting
```

Choose:
- ✅ Use existing project: `<YOUR_PROJECT_ID>`
- ✅ Public directory: `build`
- ✅ Single-page app: Yes
- ❌ Don’t overwrite if unsure

### Fix “Could not determine framework” Error

Edit or create `firebase.json` in `frontend/`:

```json
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

And `.firebaserc`:

```json
{
  "projects": {
    "default": "<YOUR_PROJECT_ID>"
  }
}
```

### Build and Deploy

```bash
npm run build
firebase deploy
```

---

## 🔁 Redeploying After Making Edits

### 🔧 Backend (FastAPI)

```bash
# Make code changes in backend/

# Rebuild Docker image
docker build -t us-central1-docker.pkg.dev/<YOUR_PROJECT_ID>/my-repo/feedback-api:latest .

# Push to Artifact Registry
docker push us-central1-docker.pkg.dev/<YOUR_PROJECT_ID>/my-repo/feedback-api:latest

# Deploy to Cloud Run
gcloud run deploy feedback-api \
  --image us-central1-docker.pkg.dev/<YOUR_PROJECT_ID>/my-repo/feedback-api:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

### 💻 Frontend (React + Firebase)

```bash
# Make changes to src/App.js or others

npm run build
firebase deploy
```

---

## ✅ Summary

| Component | Technology       | Deployment         |
|-----------|------------------|--------------------|
| Backend   | FastAPI (Python) | Google Cloud Run   |
| Frontend  | React (CRA)      | Firebase Hosting   |

---


---

## 🔁 Redeployment Instructions

After making changes to the frontend or backend, follow the steps below to redeploy the application.

---

### 🔧 Backend Redeployment (Google Cloud Run)

1. **Make code changes** in the `backend/` folder.

2. **Rebuild the Docker image:**

```bash
docker build -t us-central1-docker.pkg.dev/<YOUR_PROJECT_ID>/my-repo/feedback-api:latest .
```

3. **Push the updated image to Artifact Registry:**

```bash
docker push us-central1-docker.pkg.dev/<YOUR_PROJECT_ID>/my-repo/feedback-api:latest
```

4. **Redeploy to Cloud Run:**

```bash
gcloud run deploy feedback-api \
  --image us-central1-docker.pkg.dev/<YOUR_PROJECT_ID>/my-repo/feedback-api:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

✅ This will update your backend with the latest changes.

---

### 💻 Frontend Redeployment (Firebase Hosting)

1. **Make code changes** in the `frontend/src/` directory, such as editing `App.js`.

2. **Rebuild the app:**

```bash
npm run build
```

3. **Deploy to Firebase Hosting:**

```bash
firebase deploy
```

✅ Your frontend will be updated immediately at your Firebase Hosting URL.

---
