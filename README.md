# AI Education Automation Platform

This repository contains the codebase for an AI-powered, API-first platform that automates post-class content creation for coaching institutes and cohort-based courses. Admins upload subtitle transcripts (SRT/VTT/TXT) and the backend automatically generates notes, summaries, MCQs, blog-style recaps, and RAG-ready embeddings.

---

## Tech Stack

* Frontend: React
* Authentication: Clerk
* Backend: Node.js + Express
* ORM: Drizzle
* Database: PostgreSQL (pgvector extension)
* Queue: BullMQ + Redis
* Storage: Cloudflare R2 or AWS S3
* AI: LangChain + OpenAI / Gemini

---

## Project Structure

```
/backend
  /src
    /controllers
    /routes
    /services
    /db
    /workers
    /queue
    /utils
/frontend
  /src
    /components
    /pages
    /lib
    /api
```

---

## Features

* Transcript upload (.srt, .vtt, .txt)
* Automatic AI generation: notes, summaries, MCQs, blog recaps
* Notes exported to PDF and stored in object storage
* RAG chatbot: chunking, embeddings, pgvector search
* Admin dashboard (internal use) to upload files and monitor processing
* Clerk-managed authentication and org membership
* API endpoints for fetching generated content

---

## Quick Start (Development)

1. Clone the repo

```
git clone https://github.com/Manoj-Kumar-Munda/tutorsync-ai
cd repo
```

2. Backend setup

```
cd backend
npm install
cp .env.example .env
# set DATABASE_URL, REDIS_URL, CLERK keys, STORAGE keys, OPENAI key
npm run dev
```

3. Frontend setup

```
cd frontend
npm install
cp .env.example .env
# set VITE_CLERK_PUBLISHABLE_KEY and API base URL
npm run dev
```

---

## API Endpoints (high level)

* `POST /api/v1/transcripts/upload` — upload subtitle file (multipart/form-data)
* `GET /api/v1/notes` — list notes
* `GET /api/v1/summaries` — list summaries
* `GET /api/v1/mcqs` — list MCQs
* `GET /api/v1/blogs` — list blog recaps
* `POST /api/v1/chatbot/query` — chat query using RAG

---

## Database (simplified)

Core tables: organizations, users, transcripts, generated_content, embeddings, api_keys, webhooks

* Transcripts store metadata and status (UPLOADED, PROCESSING, PROCESSED, FAILED)
* Generated content stores notes/summaries/mcqs/blog with pdfUrl/jsonData
* Embeddings table stores chunkText + embedding vector (pgvector)

---

## Background Jobs

* Workers process uploaded transcripts: parse, chunk, embed, mini-summaries, merge summaries, generate notes/MCQs/blog, convert notes to PDF, store outputs, update DB
* BullMQ + Redis used for job queueing

---

## Auth & Multi-tenancy

* Clerk manages users and organization memberships
* Backend verifies Clerk JWTs and extracts org context
* Each organization’s data is scoped by orgId

---

## Deployment Notes

* Backend: Render / Railway / AWS ECS
* Frontend: Vercel
* Database: Neon / Supabase
* Redis: Upstash or managed Redis
* Storage: Cloudflare R2 (recommended) or AWS S3

---

## Next Steps / Roadmap

* Implement webhooks for content-ready events
* Add organization theming and branding (Phase 2)
* Add usage analytics and billing (Stripe)
* Improve model prompts and LLM orchestration

---

## Contributing

* Follow the code style in `.eslintrc` and `.prettierrc`
* Use feature branches and open PRs
* Run tests and linters before pushing

---

## Li
