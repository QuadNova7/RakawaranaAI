# RakawaranaAI 🛡️

## 1. Introduction
RakawaranaAI is an intelligent, agentic RAG-based (Retrieval-Augmented Generation) disaster response and resource coordination platform. Built to assist in emergency management, it leverages Google's Gemini AI and official disaster management guidelines to analyze incident reports, provide immediate actionable instructions, and efficiently coordinate resources. 

The system reads official PDF documents (like the *National Emergency Operation Plan — Sri Lanka DMC*) into a ChromaDB vector database. When a user reports a disaster incident, the AI consults these guidelines to provide an accurate, context-aware emergency response.

**Key Features:**
- 🧠 **AI-Powered Incident Analysis:** Utilizes Gemini AI to process and categorize emergency reports.
- 📚 **RAG (Retrieval-Augmented Generation):** Contextualizes AI responses using your uploaded official emergency PDF guidelines.
- 🐳 **Fully Containerized:** Easy to deploy with Docker and Docker Compose.
- ⚡ **Modern Stack:** Fast backend powered by FastAPI (Python) and a responsive frontend built with React & Vite.

## 2. How to Setup

### Prerequisites
- Docker and Docker Compose installed on your machine.
- A Google Gemini API Key.

### Installation Steps

1. **Clone the repository (if you haven't already):**
   ```bash
   git clone <your-repository-url>
   cd rakawaranaAI
   ```

2. **Configure Environment Variables:**
   - Create a `.env` file in the main project folder.
   - Add your Gemini API key to the `.env` file:
     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     ```

3. **Build and Run the Application:**
   Start the entire stack (Backend + Frontend) using Docker Compose:
   ```bash
   docker compose up --build
   ```
   *(This command will build the Docker images and start the containers. The first run might take a few minutes as it downloads dependencies.)*

4. **Access the Application:**
   - **Frontend UI:** Open your browser and go to `http://localhost:5173`
   - **Backend API Docs:** Go to `http://localhost:8000/docs` to view the interactive FastAPI documentation.

## 3. How to Use

### Step 1: Upload Emergency Guidelines
1. Open the application in your browser (`http://localhost:5173`).
2. Navigate to the document upload section.
3. Upload official disaster management PDFs.
4. The system will automatically extract the text, split it into chunks, and save it to the local vector database (ChromaDB).

### Step 2: Report an Incident
1. Go to the **Incident Reporting** area on the Dashboard.
2. Enter the details of the emergency incident (e.g., *"Severe flooding in Kalutara, 5 families trapped"*).
3. Submit the report.

### Step 3: View the AI Response
- The system will use the RAG engine to find the most relevant guidelines from the PDFs you uploaded.
- The Gemini AI will then analyze the situation and provide a structured response including:
  - Incident Category and Severity Level.
  - Required resources (Ambulances, Firetrucks, Boats, etc.).
  - Immediate action steps based *strictly* on the official guidelines.
  - The specific departments/agencies that need to be notified.

---
*Built for the Agentrix Hackathon* 🚀
