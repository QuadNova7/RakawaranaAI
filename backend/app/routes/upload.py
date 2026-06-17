from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
from ..services.pdf_service import extract_text_from_pdf
from ..services.rag_service import add_document_to_rag

import uuid

router = APIRouter()

@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # Prevent race conditions by using a unique temporary filename
    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = f"uploads/{unique_filename}"
    
    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    try:
        # Extract text from the PDF
        text = extract_text_from_pdf(file_path)
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF. It might be empty or scanned.")
            
        # Add to RAG system
        num_chunks = add_document_to_rag(text, file.filename)
        
        return {
            "message": "File uploaded and processed successfully",
            "filename": file.filename,
            "chunks_added": num_chunks
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")
    finally:
        # Guaranteed cleanup to prevent disk/memory leaks
        if os.path.exists(file_path):
            os.remove(file_path)
