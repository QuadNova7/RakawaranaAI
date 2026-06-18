import chromadb
import uuid
import os
import time

chroma_host = os.getenv("CHROMA_HOST", "chromadb")
chroma_port = int(os.getenv("CHROMA_PORT", 8000))
client = None
collection = None

def init_rag_system():
    """Initializes the RAG system (called on startup)"""
    global client, collection

    if client is not None and collection is not None:
        return

    retries = 3
    for attempt in range(retries):
        try:
            client = chromadb.HttpClient(host=chroma_host, port=chroma_port)
            collection = client.get_or_create_collection(name="disaster_guidelines")
            return
        except Exception:
            if attempt < retries - 1:
                time.sleep(1)

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> list[str]:
    """Splits text into overlapping chunks."""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return chunks

def add_document_to_rag(text: str, filename: str) -> int:
    """Chunks the document text and adds it to the ChromaDB collection."""
    init_rag_system()
    if collection is None:
        raise RuntimeError("RAG system is not initialized.")

    chunks = chunk_text(text)
    
    documents = []
    metadatas = []
    ids = []
    
    for i, chunk in enumerate(chunks):
        documents.append(chunk)
        metadatas.append({"source": filename, "chunk": i})
        ids.append(str(uuid.uuid4()))
        
    if documents:
        collection.add(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )
        
    return len(documents)

def query_rag_system(query: str, n_results: int = 3) -> list[str]:
    """Queries the ChromaDB collection for relevant context."""
    init_rag_system()
    if collection is None:
        return []

    if collection.count() == 0:
        return []
        
    results = collection.query(
        query_texts=[query],
        n_results=min(n_results, collection.count())
    )
    
    if results and "documents" in results and results["documents"]:
        return results["documents"][0]
    return []
