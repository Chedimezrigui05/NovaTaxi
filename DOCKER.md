# Docker dev setup

This file explains how to run the local dev stack with Docker Compose (Postgres, Django, Next.js).

Build and run:

```bash
docker compose build
docker compose up
```

Notes:
- The backend service uses `DATABASE_URL=postgres://novataxi:novataxi@db:5432/novataxi` by default (set in `docker-compose.yml`).
- Source directories are mounted into containers for live development.
- To run backend migrations automatically, the compose `command` runs `python manage.py migrate` before starting the dev server.
