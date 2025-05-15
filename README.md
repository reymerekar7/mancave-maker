

# 🛠️ Mancave Maker

**Mancave Maker** transforms a photo of any empty room into a fully‑furnished, photorealistic man‑cave using OpenAI’s GPT‑4o Image API (gpt-image-1).

https://github.com/user-attachments/assets/dedefc46-6e22-4db0-ad4d-47f4b696b0fa

---

## Key Features

* Calls `gpt-image-1` to restyle the uploaded photo in seconds.  
* **FastAPI Backend** – keeps your OpenAI key on the server; React talks to it via `/api/transform`.  
* **Vite + React Front‑End** – hot‑reload during development, Tailwind CSS for styling.  
* run locally, in Docker, or on any serverless container.

---

## Prerequisites

* Python 3.9+  
* Node 18+  
* An OpenAI API key with image‑generation access

---

## Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/reymerekar7/mancave-maker
cd mancave-maker
```

### 2. Create & activate a virtual‑environment

```bash
python -m venv venv
source venv/bin/activate        # Windows: .venv\Scripts\activate
```

### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 4. Add your environment variables

Create a file named `.env` in the project root (this file is **git‑ignored**):

```env
OPENAI_API_KEY=sk-********************************
```

### 5. Start the backend

```bash
uvicorn api:app --reload
```

The API is now listening at **http://localhost:8000**.

### 6. Install and run the front‑end

```bash
cd frontend
npm install
npm run dev
```

The React app starts at **http://localhost:5173** and proxies `/api/*` to the backend.

Open the app in your browser, upload a room photo, and watch it become a man‑cave!

---

## Environment Variables

| Variable         | Description                              |
|------------------|------------------------------------------|
| `OPENAI_API_KEY` | Required. Your secret key for GPT‑4o API |


---
