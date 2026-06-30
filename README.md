# NovaTaxi — Project Initialization

This repository contains the initial scaffolding for NovaTaxi: a Next.js 15 frontend and a Django 5 REST backend. This copy is the workspace folder created on the Desktop.

Quick start

- Frontend

```bash
cd frontend
npm install
npm run dev
```

- Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py runserver
```

Docker (optional)

```bash
cd C:\Users\chedi\Desktop\NovaTaxi
docker compose build
docker compose up
```
