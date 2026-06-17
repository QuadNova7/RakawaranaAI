import { useState } from 'react';
import UploadCard from '../components/UploadCard';
import IncidentForm from '../components/IncidentForm';
import AnalysisReport from '../components/AnalysisReport';
import { reportIncident } from '../services/api';
import { Activity } from 'lucide-react';

export default function Dashboard() {
  const [report, setReport] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleIncidentSubmit = async (description) => {
    setIsAnalyzing(true);
    setError('');
    setReport(null);
    
    try {
      const data = await reportIncident(description);
      setReport(data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to analyze incident');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-6xl">
        <header className="mb-12 text-center animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 mb-6 shadow-xl">
            <Activity className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight mb-4">
            RakawaranaAI / SaviyaX
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Agentic RAG-based disaster response and resource coordination platform.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-8">
            <UploadCard />
            <IncidentForm onSubmit={handleIncidentSubmit} isLoading={isAnalyzing} />
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm animate-in fade-in">
                {error}
              </div>
            )}
          </div>
          
          <div className="lg:col-span-8">
            {report ? (
              <AnalysisReport report={report} />
            ) : (
              <div className="glass-panel h-full min-h-[400px] flex flex-col items-center justify-center text-slate-500 text-center p-8 border-dashed animate-in fade-in duration-1000">
                <Activity className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg">Awaiting Incident Report</p>
                <p className="text-sm mt-2 max-w-sm">Submit an emergency description to generate an AI-powered risk analysis and action plan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
