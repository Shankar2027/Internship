This is it—the ultimate, judge-ready `README.md`.

I have taken your excellent structure and seamlessly integrated all the **OSC AI BUILD 1.0 mandatory requirements** right at the top. I included the powerful "Problem Statement" and "Project Overview" we refined earlier, securely linked your live Hugging Face deployment, added your team details, and preserved your beautiful architecture diagrams, file structures, and tech stack tables.

Copy the code block below and paste it directly into your repository's `README.md` file.

```markdown
<div align="center">

<img src="https://img.shields.io/badge/RAG%20Forge-Enterprise%20AI-4F46E5?style=for-the-badge&logo=zap&logoColor=white" alt="RAG Forge"/>

# ⚡ RAG Forge

### Production-Grade Intelligent Retrieval & Observability Engine

**Upload documents, ask questions, and get cited, grounded answers — built entirely on free, open-source tools.**

<br/>

[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-0.5-FF6B35?style=flat-square)](https://www.trychroma.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

<br/>

[**Live Demo**](https://shankar0747-rag-forge.hf.space) · [**Quick Start**](#quick-start) · [**Architecture**](#architecture)

</div>

---

## 🏆 OSC AI BUILD 1.0 Submission Details

- **Team Name:** eagle eye
- **Team Members:** Mounika D G  , Shankar Reddy Mopur , Spoorthi , Mahitha 
- **Theme:** Future of Productivity
- **Live Demo Link:** [RAG Forge on Hugging Face Spaces](https://shankar0747-rag-forge.hf.space)

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [Quick Start (Setup Instructions)](#quick-start)
- [RAG Pipeline Deep Dive](#rag-pipeline-deep-dive)
- [API Reference](#api-reference)
- [Frontend Pages](#frontend-pages)
- [Deployment](#deployment)

---

## 🌍 Project Overview

RAG Forge is a **full-stack, production-ready Retrieval-Augmented Generation (RAG) platform**. It bridges the gap between massive, disconnected document repositories and actionable enterprise intelligence. 

Instead of relying on a basic API wrapper, RAG Forge implements a multi-stage **Hybrid Retrieval Pipeline**. You can upload PDFs, Word docs, text files, or HTML pages. RAG Forge parses them, chunks them intelligently, embeds them into a local vector database, and applies strict Cross-Encoder Re-ranking to ensure answers are highly precise, heavily cited, and never hallucinated.

---

## 🎯 Problem Statement

**The "Black Box" of Enterprise Knowledge & AI Hallucinations**

Most companies store their knowledge in thousands of disconnected PDFs and manuals. Traditional search tools (CTRL+F) fail because they lack semantic understanding. Conversely, standard AI chatbots often "hallucinate" (invent facts) because they aren't properly grounded in the company's private data. 

Employees waste hours searching for data or double-checking AI-generated answers for accuracy. **RAG Forge solves this by forcing the AI to prove its answers.** If the data is not in the uploaded documents, the system's Confidence Calibration strictly forces the AI to reply: *"Not found in the knowledge base."*

---

## ✨ Key Features

### 🏗 Enterprise RAG Pipeline
- **Hybrid Search Retrieval:** Blends BM25 (exact keyword matching) with dense vector embeddings (semantic intent) to ensure high-precision data retrieval.
- **Advanced Re-ranking:** Integrated `ms-marco-MiniLM-L-6-v2` cross-encoder re-ranking to push the most contextually relevant chunks to the LLM.
- **Confidence Calibration:** Implemented Platt Scaling to provide human-readable confidence scores (0-100%), allowing the system to distinguish between high-certainty answers and knowledge gaps.
- **Multi-format Ingestion:** Reads PDF, DOCX, TXT, and HTML with smart, sentence-aware chunking.

### 🤖 Flexible LLM Options
- **Ollama** (default) — fully local, completely free, supports Llama 3.2, Mistral, Phi-3.
- **Groq** — free-tier cloud inference with sub-second responses on `llama3-8b-8192`.
- **Streaming answers** — responses appear token-by-token in real time via SSE.

### 📊 Full-Stack Telemetry & Observability
- **Admin Dashboard:** Real-time live KPIs, a 14-day activity chart, and document-type breakdowns.
- **Pipeline Auditing:** Every query is logged with full pipeline timing: retrieval time, re-rank time, LLM time, and total time.
- **Maintenance Operations:** Utilities to manually clear the semantic cache and purge PostgreSQL query logs to manage database resources.

### 🔐 Multi-Tenancy & UI
- **Secure Authentication:** JWT-based login with access/refresh tokens and bcrypt password hashing. Each user isolated to their own collections.
- **Polished UI:** Custom deep-space dark theme, drag-and-drop file uploads, and a streaming chat interface (SSE) with expandable grounding source panels.

---

## ⚙️ Architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (React)                          │
│  Auth ─ Collections ─ Documents ─ Ask AI ─ History ─ Dashboard  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS / SSE
┌────────────────────────────▼────────────────────────────────────┐
│                    FASTAPI BACKEND                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    RAG PIPELINE                          │   │
│  │  Query ──► VectorStore.search() ──► ReRanker.rerank()    │   │
│  │               (Hybrid BM25)        (cross-encoder)       │   │
│  │                    │                      │              │   │
│  │                    ▼                      ▼              │   │
│  │               Top-K chunks         Top-N reranked chunks │   │
│  │                                           │              │   │
│  │                                     LLMService.answer()  │   │
│  │                                      (Groq / LLaMA 3)    │   │
│  │                                           │              │   │
│  │                                     Cited Answer         │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
              │                              │
    ┌─────────▼──────┐             ┌──────────▼────────┐
    │   ChromaDB     │             │   SQLite DB       │
    │  (local, disk) │             │  (ragforge.db)    │
    │  vector store  │             │  query_logs       │
    └────────────────┘             └───────────────────┘

```

---

## 💻 Tech Stack

### Backend

| Category | Technology | Purpose |
| --- | --- | --- |
| **Web Framework** | [FastAPI](https://fastapi.tiangolo.com) | Async REST API, OpenAPI docs, SSE streaming |
| **ASGI Server** | [Uvicorn](https://www.uvicorn.org) | Production-grade async server |
| **Database ORM** | [SQLAlchemy](https://www.sqlalchemy.org) | Async ORM with type-safe mapped columns |
| **Database** | SQLite + aiosqlite | Zero-setup, file-based, async-compatible |
| **Vector Store** | [ChromaDB](https://www.trychroma.com) | Local persistent vector DB, cosine similarity |
| **Embeddings** | sentence-transformers | `all-MiniLM-L6-v2` — 384-dim, CPU-friendly |
| **Re-Ranker** | CrossEncoder | `ms-marco-MiniLM-L-6-v2` — precision re-ranking |
| **Keyword Search** | rank-bm25 | BM25 Okapi for hybrid retrieval |
| **LLM Inference** | Ollama / Groq SDK | Local inference or Free-tier fast cloud inference |
| **Auth** | python-jose + passlib | JWT (HS256) + bcrypt hashing |

### Frontend

| Category | Technology | Purpose |
| --- | --- | --- |
| **Framework** | [React](https://react.dev) | Component model, concurrent features |
| **Language** | TypeScript | Full type safety across all layers |
| **Build Tool** | Vite | Sub-second HMR, optimized production builds |
| **Server State** | TanStack Query | Data fetching, caching, background refetch |
| **Global State** | Zustand | Auth store with localStorage persistence |
| **Styling** | Tailwind CSS | Utility-first, custom design tokens |
| **Charts** | Recharts | Area charts, pie charts, tooltips |

---

## 📁 File Structure

```text
ragforge/
│
├── 📁 backend/                        # FastAPI application
│   ├── 📄 main.py                     # App entry point, middleware, router registration
│   ├── 📄 requirements.txt            # All Python dependencies
│   ├── 📄 .env.example                # Environment variable template
│   │
│   ├── 📁 app/
│   │   ├── 📁 api/                    # HTTP route handlers (auth, collections, documents, rag, dashboard)
│   │   ├── 📁 core/                   # App-wide configuration (Pydantic Settings, DB engine)
│   │   ├── 📁 models/                 # SQLAlchemy ORM (User, Collection, Document, Chunk, QueryLog)
│   │   ├── 📁 schemas/                # Pydantic v2 request/response models
│   │   └── 📁 services/               # Business logic (ingestion, vector_store, reranker, llm, rag_pipeline)
│   │
│   ├── 📄 ragforge.db                 # SQLite database (auto-created)
│   ├── 📁 chroma_db/                  # ChromaDB vector store (auto-created)
│   └── 📁 uploads/                    # Uploaded files (auto-created)
│
├── 📁 frontend/                       # React application
│   ├── 📄 index.html                  # HTML entry point, Google Fonts
│   ├── 📄 package.json                # npm dependencies and scripts
│   ├── 📄 vite.config.ts              # Vite config + /api proxy
│   ├── 📄 tailwind.config.js          # Custom design tokens
│   │
│   └── 📁 src/
│       ├── 📄 main.tsx                # React root, QueryClientProvider
│       ├── 📄 App.tsx                 # Router, protected/public route guards
│       ├── 📁 api/                    # Axios API layer (client, auth, collections, documents, rag, dashboard)
│       ├── 📁 components/             # Layout (DashboardLayout) and UI (PageHeader, Modal, MetricCard, etc.)
│       ├── 📁 pages/                  # Views (Login, Dashboard, AskPage, History, Settings, etc.)
│       ├── 📁 stores/                 # Zustand auth (persisted to localStorage)
│       └── 📁 types/                  # TypeScript interfaces (mirrors Pydantic schemas)
│
└── 📄 README.md

```

---

## 🚀 Quick Start (Setup Instructions)

### Prerequisites

* **Node.js 18+** and npm
* **Python 3.11+**
* **Ollama** (recommended for local LLM)

### 1. Backend Setup

```bash
# Clone the repository
git clone [https://github.com/yourusername/rag-forge.git](https://github.com/yourusername/rag-forge.git)
cd rag-forge/backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate          # Linux / macOS
# venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env to add your GROQ_API_KEY and set SECRET_KEY

# Pull an LLM model (if using Ollama)
ollama pull llama3.2              

# Start the backend server
uvicorn app.main:app --reload --port 8000

```

The API will now be running at `http://localhost:8000`, with interactive docs available at `http://localhost:8000/docs`.

### 2. Frontend Setup

```bash
# From the repository root
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Default VITE_API_URL=/api works out of the box with the Vite proxy

# Start the dev server
npm run dev

```

Open `http://localhost:3000`, register an account, create a collection, upload a few documents, and start asking questions.

---

## 🧠 RAG Pipeline Deep Dive

### Document Ingestion

When a file is uploaded, it goes through six steps before it becomes searchable:

1. **Parse:** PyMuPDF / python-docx / BS4 → raw text + page count
2. **Clean:** Remove null bytes, normalize whitespace, filter noise lines
3. **Chunk:** Sentence-aware sliding window (Split on boundaries, configurable size/overlap)
4. **Embed:** SentenceTransformer.encode() → List[List[float]]
5. **Store:** ChromaDB.upsert(ids, embeddings, documents, metadatas)
6. **Update DB:** Document.status = "ready", chunk_count, embedding_count, indexed_at

### Query Pipeline

When a user asks a question:

1. **Retrieve:** `VectorStore.hybrid_search()` (Cosine similarity + BM25 Okapi)
2. **Re-Rank:** `CrossEncoder.predict()` scores all (query, passage) pairs jointly.
3. **Build Context:** Format: `"[filename | chunk_N]\n{text}\n\n---\n\n..."`
4. **LLM Answer:** Prompt: SYSTEM (grounding rules + context) + question → Streaming response.
5. **Confidence:** `sigmoid(mean(top-3 rerank scores) × 0.5) × 100`
6. **Log:** QueryLog persisted with full telemetry (timing metrics, citations, retrieved chunks).

---

## 📡 API Reference

All endpoints are prefixed with `/api`. Interactive documentation is available at `/docs` (Swagger UI).

### Core Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/login/json` | Log in with email + password → returns JWT tokens |
| `POST` | `/collections` | Create a new collection |
| `POST` | `/documents/upload?collection_id={id}` | Upload one or more files (multipart) |
| `POST` | `/rag/ask/stream` | Streaming response (SSE) — tokens arrive in real time |
| `GET` | `/dashboard/stats` | KPIs: document count, chunk count, query statistics |

---

## 🎨 Frontend Pages

| Route | Description |
| --- | --- |
| `/dashboard` | KPI cards, activity chart, document-type breakdown, recent queries |
| `/collections/:id` | Collection stats, document list, and configuration panel |
| `/collections/:id/documents` | Drag-and-drop upload, status table, chunk viewer |
| `/ask` | Streaming RAG chat with source panels and timing info |
| `/history` | Query logs with expandable pipeline details |
| `/settings` | Profile, pipeline defaults, and system telemetry maintenance |

---

## 🐳 Deployment (Docker)

```bash
# 1. Ensure your .env files are configured
# 2. Build and run using Docker Compose
docker-compose up -d --build

```

This spins up the FastAPI backend, the React frontend (via Nginx), and maps persistent volumes for `chroma_db/`, `uploads/`, and your SQLite database.

---

Built with ❤️ for **OSC AI Build 1.0**.

**No cloud vendor lock-in. No per-query fees. Your data stays yours.**
