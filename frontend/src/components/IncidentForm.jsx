import React, { useState } from 'react';
import { AlertTriangle, Send, Loader2 } from 'lucide-react';

export default function IncidentForm({ onSubmit, isLoading }) {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description);
    }
  };

  return (
    <div className="glass-panel p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
        <AlertTriangle className="text-amber-400" />
        Report Emergency Incident
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        Describe the situation and get AI-generated safety action plans.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="E.g., A landslide has occurred in Badulla, multiple roads blocked..."
          rows={5}
          className="glass-input w-full resize-none"
        />
        <button 
          type="submit" 
          disabled={!description.trim() || isLoading}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          {isLoading ? <><Loader2 className="w-5 h-5 animate-spin"/> Analyzing...</> : <><Send className="w-5 h-5"/> Generate Response</>}
        </button>
      </form>
    </div>
  );
}
