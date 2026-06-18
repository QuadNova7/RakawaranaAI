import UploadCard from '../components/UploadCard';
import { Activity } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-3xl">
        <header className="mb-12 text-center animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 mb-6 shadow-xl">
            <Activity className="w-10 h-10 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight mb-4">
            Admin Portal
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Upload and manage official disaster guidelines for the AI.
          </p>
        </header>

        <div className="flex justify-center">
            <div className="w-full max-w-md">
                <UploadCard />
            </div>
        </div>
      </div>
    </div>
  );
}
