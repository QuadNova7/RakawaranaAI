import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .routes import incident
from .services.rag_service import init_rag_system

load_dotenv()

app = FastAPI(title="RakawaranaAI User API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG system (ChromaDB)
init_rag_system()

# Include Routers
app.include_router(incident.router, prefix="/api/incident", tags=["Incident"])

@app.get("/")
async def root():
    return {"message": "Welcome to RakawaranaAI User Server"}
