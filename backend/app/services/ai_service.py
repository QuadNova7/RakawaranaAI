import os
import json
import google.generativeai as genai
from ..prompts.prompts import INCIDENT_ANALYSIS_SYSTEM_PROMPT

def generate_incident_response(incident_description: str, context: str) -> dict:
    """Calls Gemini API to generate the incident analysis."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is not set")
        
    genai.configure(api_key=api_key)
    
    # Use gemini-2.5-flash
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    prompt = f"""
    System Prompt:
    {INCIDENT_ANALYSIS_SYSTEM_PROMPT}
    
    Retrieved Context from Guidelines:
    {context if context else "No relevant guidelines found."}
    
    Emergency Incident Description:
    {incident_description}
    """
    
    response = model.generate_content(prompt)
    response_text = response.text.strip()
    
    # Clean up markdown if the model included it despite instructions
    if response_text.startswith("```json"):
        response_text = response_text[7:]
    if response_text.startswith("```"):
        response_text = response_text[3:]
    if response_text.endswith("```"):
        response_text = response_text[:-3]
        
    try:
        data = json.loads(response_text)
        return data
    except json.JSONDecodeError as e:
        print(f"Failed to parse JSON response: {response_text}")
        raise Exception("AI response was not valid JSON.")
