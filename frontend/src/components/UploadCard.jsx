import React, { useState } from 'react';
import { UploadCloud, File, CheckCircle, Loader2 } from 'lucide-react';
import { uploadGuidelinePDF } from '../services/api';

export default function UploadCard() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSuccessMsg('');
      setErrorMsg('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    try {
      const res = await uploadGuidelinePDF(file);
      setSuccessMsg(`Successfully processed ${res.filename} (${res.chunks_added} chunks)`);
      setFile(null);
    } catch (err) {
      setErrorMsg(err.response?.data?.detail || err.message || 'Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="glass-panel p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
        <UploadCloud className="text-blue-400" />
        Upload Disaster Guidelines
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        Upload PDF guidelines to enrich the AI's knowledge base.
      </p>
      
      <div className="relative border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-slate-800/30 transition-colors group">
        <input 
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-center pointer-events-none">
          {file ? (
            <div className="flex flex-col items-center gap-2">
              <File className="w-10 h-10 text-blue-400" />
              <span className="text-sm font-medium text-slate-200">{file.name}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="w-10 h-10 text-slate-500 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm font-medium text-slate-400">Click or drag PDF here</span>
            </div>
          )}
        </div>
      </div>
      
      {errorMsg && <p className="mt-3 text-sm text-red-400">{errorMsg}</p>}
      {successMsg && (
        <p className="mt-3 text-sm text-emerald-400 flex items-center gap-1">
          <CheckCircle className="w-4 h-4" /> {successMsg}
        </p>
      )}
      
      <button 
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="w-full mt-6 btn-primary flex items-center justify-center gap-2"
      >
        {isUploading ? <><Loader2 className="w-5 h-5 animate-spin"/> Processing...</> : 'Upload to Knowledge Base'}
      </button>
    </div>
  );
}
