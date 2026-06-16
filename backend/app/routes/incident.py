from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.rag_service import query_rag_system
from ..services.ai_service import generate_incident_response

router = APIRouter()

class IncidentRequest(BaseModel):
    description: str

class IncidentResponse(BaseModel):
    risk_level: str
    action_plan: list[str]
    required_resources: list[str]
    incident_report: str
    retrieved_context: list[str]

@router.post("/", response_model=IncidentResponse)
async def process_incident(request: IncidentRequest):
    if not request.description.strip():
        raise HTTPException(status_code=400, detail="Incident description cannot be empty")
        
    try:
        # Query the RAG system for relevant context
        context_chunks = query_rag_system(request.description)
        
        # Combine context chunks
        context_text = "\n\n".join(context_chunks)
        
        # Call Gemini AI to analyze the incident
        ai_response = generate_incident_response(request.description, context_text)
        
        return IncidentResponse(
            risk_level=ai_response.get("risk_level", "Unknown"),
            action_plan=ai_response.get("action_plan", []),
            required_resources=ai_response.get("required_resources", []),
            incident_report=ai_response.get("incident_report", "No report generated."),
            retrieved_context=context_chunks
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing incident: {str(e)}")
