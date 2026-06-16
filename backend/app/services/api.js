import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_BASE_URL}/documents/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const analyzeIncident = async (incidentText) => {
    const response = await axios.post(`${API_BASE_URL}/ai/analyze`, {
        incident_text: incidentText,
    });

    return response.data;
};