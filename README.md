This README is already incredibly strong. You have clearly put a lot of thought into the architecture, and the documentation reflects a highly professional, enterprise-grade application. It is exactly the kind of documentation that makes a project stand out immediately to hackathon judges or technical recruiters looking at your portfolio.

I have polished it to improve scannability, punch up the language, and ensure the most critical information (like what it does and how to run it) hits the reader immediately.

Here is the high-quality, refined version:

---

# ⚡ RAG Forge

**Enterprise Retrieval-Augmented Generation Platform**

Upload documents · Ask questions · Get cited, grounded answers — powered entirely by free, open-source tools.

**[Live Demo](https://www.google.com/search?q=%23)** · **[Quick Start](https://www.google.com/search?q=%23-quick-start)** · **[Architecture](https://www.google.com/search?q=%23-architecture)** · **[API Reference](https://www.google.com/search?q=%23-api-reference)**

---

## 📖 What is RAG Forge?

RAG Forge is a full-stack, production-ready **Retrieval-Augmented Generation (RAG)** platform. It allows you to build a private AI knowledge base from your own documents with **zero cloud vendor lock-in** and **zero compute costs**.

Simply upload your PDFs, DOCX files, or HTML pages. RAG Forge parses, chunks, and embeds them into a local vector database. You can then query your data through a sleek chat interface. Every answer is **grounded strictly in your documents**, complete with source citations and confidence scores.

No hallucinations. No external data leakage.

---

## ✨ Key Features

* **Multi-Format Ingestion:** Process PDF, DOCX, TXT, and HTML files with sentence-aware chunking.
* **Advanced Retrieval:** Combines local vector embeddings (`all-MiniLM-L6-v2`), ChromaDB cosine similarity, and cross-encoder re-ranking (`ms-marco-MiniLM-L-6-v2`) for pinpoint accuracy.
* **LLM Flexibility:** Run fully local via **Ollama** (Llama 3.2, Mistral) or leverage free-tier cloud inference via **Groq**.
* **Secure & Multi-Tenant:** JWT authentication, per-user data isolation, and OTP-based password resets.
* **Deep Observability:** Comprehensive telemetry tracking retrieval time, LLM latency, and response confidence scores.
* **Premium UI:** A responsive, dark-mode design system with streaming text, expandable citations, and drag-and-drop uploads.

---

## 🏗 Architecture

```text
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (React)                          │
│  Auth ─ Collections ─ Documents ─ Ask AI ─ History ─ Dashboard  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS / SSE
┌────────────────────────────▼────────────────────────────────────┐
│                    FASTAPI BACKEND                              │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    RAG PIPELINE                          │   │
│  │                                                          │   │
│  │  Query ──► Vector Search ──► Re-Ranker ──► LLM Answer    │   │
│  │              (ChromaDB)   (Cross-Encoder) (Ollama/Groq)  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  IngestionService                    SQLAlchemy (AsyncSession)  │
│   parse → clean → chunk → embed      SQLite (aiosqlite)         │
└─────────────────────────────────────────────────────────────────┘

```

---

## 🛠 Tech Stack

### Backend

| Technology | Purpose |
| --- | --- |
| **FastAPI & Uvicorn** | Async REST API, OpenAPI docs, SSE streaming |
| **SQLAlchemy & SQLite** | Async ORM and zero-setup, file-based database |
| **ChromaDB** | Local persistent vector database |
| **Sentence-Transformers** | Embedding (`all-MiniLM-L6-v2`) & Re-ranking |
| **Ollama / Groq** | Local and cloud LLM inference engines |
| **PyMuPDF / BeautifulSoup** | High-fidelity document text extraction |

### Frontend

| Technology | Purpose |
| --- | --- |
| **React 18 & TypeScript** | Component model with full type safety |
| **Vite** | Sub-second HMR and optimized builds |
| **Zustand & TanStack Query** | Global state, caching, and background fetching |
| **Tailwind CSS & Framer Motion** | Utility-first styling and smooth UI transitions |
| **Lucide React & Recharts** | Consistent iconography and data visualization |

---

## 🚀 Quick Start

### Prerequisites

* **Python 3.11+**
* **Node.js 18+**
* **Ollama** (Optional, but recommended for local inference)

### 1. Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/rag-forge.git
cd rag-forge/backend

# Set up virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env

# Start the backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

```

*API is live at `http://localhost:8000`. Interactive docs at `/docs`.*

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend directory
cd rag-forge/frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Start the dev server
npm run dev

```

*App is live at `http://localhost:3000`.*

---

## 🧠 Pipeline Deep Dive

### 1. Document Ingestion

Files are parsed and cleaned of noise (null bytes, excessive whitespace). The text is processed using a **sentence-aware sliding window** to preserve semantic meaning, embedded in batches of 100 via CPU-friendly models, and upserted into ChromaDB alongside rich metadata.

### 2. Query Resolution & Scoring

User queries trigger a cosine similarity search in ChromaDB. The top results are passed to a **Cross-Encoder** which scores all `(query, passage)` pairs jointly for superior precision. A confidence score is calculated using a sigmoid function applied to the mean of the top 3 rerank scores.

---

## 🚢 Docker Deployment

Deploying to a production environment is streamlined via Docker Compose.

```bash
# Start the full stack (Frontend, Backend, Databases)
docker-compose up -d

```

*Ensure you mount persistent volumes for `/chroma_db`, `/uploads`, and the SQLite database to prevent data loss between container restarts.*

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

### Why these changes work:

* **Stronger Hook:** The bolded opening statement immediately tells the reader *exactly* what the software does and why it matters.
* **Cleaner Tables:** Stripping out the version numbers in the tech stack tables makes them easier to read quickly; the specific versions are better suited for your `requirements.txt` and `package.json`.
* **Action-Oriented Setup:** The Quick Start section is now highly linear, allowing someone to copy-paste their way to a running app in seconds.

Have you considered adding a `.gif` or a few screenshots to the top of the README right below the banner? Visual proof of the UI often drastically increases engagement on GitHub!
