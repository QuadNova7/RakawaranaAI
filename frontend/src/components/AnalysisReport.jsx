
import { ShieldAlert, Info, CheckSquare, Package, BookOpen } from 'lucide-react';
import clsx from 'clsx';

export default function AnalysisReport({ report }) {
  if (!report) return null;

  const riskColors = {
    'Low': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    'Medium': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    'High': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    'Critical': 'text-red-400 bg-red-400/10 border-red-400/20 shadow-red-500/20 shadow-lg'
  };

  const riskColor = riskColors[report.risk_level] || 'text-slate-400 bg-slate-400/10 border-slate-400/20';

  return (
    <div className="glass-panel p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-700/50">
        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
          <ShieldAlert className="text-blue-400" />
          Incident Analysis
        </h2>
        <div className={clsx("px-4 py-2 rounded-full border font-bold text-sm flex items-center gap-2", riskColor)}>
          <Info className="w-4 h-4" />
          Risk Level: {report.risk_level}
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-medium text-slate-200 flex items-center gap-2 mb-3">
            <Info className="text-blue-400 w-5 h-5" />
            Executive Report
          </h3>
          <p className="text-slate-300 leading-relaxed bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
            {report.incident_report}
          </p>
        </section>

        <section>
          <h3 className="text-lg font-medium text-slate-200 flex items-center gap-2 mb-3">
            <CheckSquare className="text-blue-400 w-5 h-5" />
            Action Plan
          </h3>
          <ul className="space-y-3">
            {report.action_plan.map((action, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{action}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-medium text-slate-200 flex items-center gap-2 mb-3">
            <Package className="text-blue-400 w-5 h-5" />
            Required Resources
          </h3>
          <div className="flex flex-wrap gap-2">
            {report.required_resources.map((resource, idx) => (
              <span key={idx} className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                {resource}
              </span>
            ))}
          </div>
        </section>

        {report.retrieved_context && report.retrieved_context.length > 0 && (
          <section className="pt-6 border-t border-slate-700/50 mt-8">
            <h3 className="text-sm font-medium text-slate-400 flex items-center gap-2 mb-3">
              <BookOpen className="text-slate-500 w-4 h-4" />
              Retrieved Guidelines (RAG Context)
            </h3>
            <div className="space-y-3">
              {report.retrieved_context.map((ctx, idx) => (
                <div key={idx} className="text-xs text-slate-500 bg-slate-900/50 p-4 rounded-xl border border-slate-800 font-mono overflow-x-auto">
                  {ctx}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
