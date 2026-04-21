import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileSpreadsheet, 
  Check, 
  AlertCircle, 
  Download,
  ShieldCheck,
  Zap,
  ArrowRight,
  RefreshCcw,
  Play,
  XCircle,
  FileUp,
  Settings2,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface BulkActionsProps {
  onClose: () => void;
  onSuccess: () => void;
}

type ActionType = 'Import' | 'Activate' | 'SIM Swap' | 'Terminate' | 'Suspend' | 'Resume';

interface ActionOption {
  id: ActionType;
  title: string;
  description: string;
  icon: any;
  color: string;
}

const actions: ActionOption[] = [
  { 
    id: 'Import', 
    title: 'Subscription Import', 
    description: 'Bulk upload new subscriptions into your ecosystem', 
    icon: FileUp,
    color: 'text-primary bg-primary/10'
  },
  { 
    id: 'Activate', 
    title: 'Bulk Activate', 
    description: 'Trigger activation sequence for multiple lines simultaneously', 
    icon: Zap,
    color: 'text-amber-600 bg-amber-50'
  },
  { 
    id: 'SIM Swap', 
    title: 'SIM Swap', 
    description: 'Update ICCIDs for a fleet of devices via CSV', 
    icon: RefreshCcw,
    color: 'text-blue-600 bg-blue-50'
  },
  { 
    id: 'Suspend', 
    title: 'Suspend / Resume', 
    description: 'Bulk manage lifecycle state of enterprise lines', 
    icon: Play,
    color: 'text-indigo-600 bg-indigo-50'
  },
  { 
    id: 'Terminate', 
    title: 'Bulk Terminate', 
    description: 'Trigger decommissioning for sub-fleets (Final Action)', 
    icon: XCircle,
    color: 'text-red-600 bg-red-50'
  }
];

export default function BulkActions({ onClose, onSuccess }: BulkActionsProps) {
  const [selectedAction, setSelectedAction] = useState<ActionType>('Import');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls') || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
      } else {
        alert('Please upload an Excel or CSV file.');
      }
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsSuccess(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDone = () => {
    onSuccess();
  };

  return (
    <div className="bg-white rounded-xl border border-border-main p-8 shadow-md h-full flex flex-col max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8 border-b border-border-main pb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <Settings2 className="w-5 h-5 text-primary" />
             <h2 className="text-[20px] font-black text-text-main uppercase tracking-tight">Enterprise Bulk Operations Center</h2>
          </div>
          <p className="text-[13px] font-medium text-text-muted italic">Manage thousands of subscriptions with precision via automated file ingestion</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-bg-app rounded-full transition-colors">
          <X className="w-6 h-6 text-text-muted" />
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-10 overflow-hidden">
        {/* Left Column: Action Selection */}
        <div className="w-full md:w-[320px] shrink-0 space-y-3">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4 block">Select Bulk Mission</label>
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => {
                if (!isSuccess && !isUploading) {
                  setSelectedAction(action.id);
                  setFile(null);
                }
              }}
              disabled={isSuccess || isUploading}
              className={cn(
                "w-full p-4 rounded-xl border text-left transition-all flex items-start gap-4 group",
                selectedAction === action.id 
                  ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20" 
                  : "border-border-main bg-white hover:border-primary/40 hover:bg-slate-50 opacity-60 hover:opacity-100"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                action.color
              )}>
                <action.icon size={20} />
              </div>
              <div className="min-w-0">
                <h4 className={cn(
                  "text-[13px] font-black uppercase tracking-tight mb-0.5",
                  selectedAction === action.id ? "text-primary" : "text-text-main"
                )}>{action.title}</h4>
                <p className="text-[11px] text-text-muted leading-snug font-medium line-clamp-2">{action.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Right Column: Execution Area */}
        <div className="flex-1 flex flex-col min-w-0 @container">
          {!isSuccess ? (
            <div className="flex-1 flex flex-col space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center group transition-all hover:bg-white hover:border-primary/40 min-h-[300px]">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  accept=".xlsx,.xls,.csv" 
                  className="hidden" 
                />
                
                <div className={cn(
                  "w-20 h-20 rounded-3xl mb-6 flex items-center justify-center transition-all shadow-sm border",
                  file ? "bg-emerald-100 text-emerald-600 border-emerald-200" : "bg-white text-text-muted group-hover:bg-primary group-hover:text-white"
                )}>
                  {file ? <Check className="w-10 h-10" /> : <FileSpreadsheet className="w-10 h-10" />}
                </div>

                {file ? (
                  <div className="space-y-1 px-4">
                    <h3 className="text-[16px] font-black text-text-main truncate max-w-full">{file.name}</h3>
                    <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Validated for {selectedAction} Mission</p>
                    <button 
                      onClick={() => setFile(null)}
                      className="mt-6 text-[11px] font-black text-red-500 hover:bg-red-50 px-4 py-1.5 rounded-full border border-red-100 transition-all font-sans"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 px-4">
                    <div className="space-y-2">
                       <h3 className="text-[18px] font-black text-text-main">Ready for Deployment</h3>
                       <p className="text-[12px] text-text-muted max-w-[320px] mx-auto font-medium leading-relaxed">Please upload the finalized {selectedAction} instruction file (.xlsx or .csv)</p>
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-8 py-3 bg-text-main text-white text-[12px] font-black rounded-lg hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center gap-3 mx-auto"
                    >
                      <Upload size={16} /> Select Data Source
                    </button>
                    <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">Max File Size: 25MB • Up to 10k Records</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 @[600px]:grid-cols-2 gap-4">
                 <button className="p-4 bg-white border border-border-main rounded-xl flex items-start gap-4 hover:border-primary/40 transition-all text-left group min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-bg-app flex items-center justify-center text-primary flex-shrink-0 border group-hover:bg-primary group-hover:text-white transition-all">
                      <Download className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[13px] font-black text-text-main uppercase tracking-tight truncate">Fetch Template</h4>
                      <p className="text-[10px] text-text-muted leading-tight mt-1 font-bold">Download optimized header map for {selectedAction} mission</p>
                    </div>
                 </button>
                 <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-primary flex-shrink-0 border border-primary/20">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[13px] font-black text-primary uppercase tracking-tight truncate">Secure Pipeline</h4>
                      <p className="text-[10px] text-primary/70 leading-tight mt-1 font-bold italic">AES-256 encrypted ingestion with automated SOC2 compliance checks</p>
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center bg-emerald-50/20 rounded-3xl border border-emerald-100 p-8 border-dashed"
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-200 mb-8">
                 <Check className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-text-main mb-3 uppercase tracking-tight">Bulk {selectedAction} Initiated</h2>
              <p className="text-[13px] text-text-muted max-w-[340px] mb-8 font-medium leading-relaxed">
                Your bulk instruction file has been accepted and queued for execution. 
                Our backend provisioning engine is now distributing updates across the fleet.
              </p>
              <div className="w-full max-w-[420px] bg-white border border-border-main rounded-2xl p-6 text-left shadow-sm">
                 <div className="flex items-center justify-between mb-5 pb-5 border-b border-border-main">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Batch Reference</span>
                       <span className="text-[13px] font-black text-primary">OP-MISSION-{selectedAction.toUpperCase()}-092</span>
                    </div>
                    <div className="flex flex-col text-right">
                       <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Est. Completion</span>
                       <span className="text-[13px] font-black text-text-main">45 Minutes</span>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                       <span className="text-[12px] font-bold text-text-main">File parsing & integrity scan: SUCCESS</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                       <span className="text-[12px] font-bold text-text-main">Carrier distribution nodes: BROADCASTING</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-border-main flex items-center justify-between">
        <button 
          onClick={onClose}
          className="px-6 py-3 text-[11px] font-black text-text-muted hover:text-red-500 transition-colors uppercase tracking-[0.2em]"
        >
          {isSuccess ? 'Exit Terminal' : 'Abort Mission'}
        </button>
        
        {!isSuccess ? (
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className={cn(
              "px-10 py-3.5 bg-primary text-white text-[12px] font-black rounded-lg transition-all flex items-center gap-3 shadow-xl",
              (!file || isUploading) ? "opacity-50 cursor-not-allowed bg-slate-400" : "hover:bg-black hover:-translate-y-0.5 active:translate-y-0 shadow-primary/20"
            )}
          >
            {isUploading ? (
              <>
                Deploying Hardware Config {uploadProgress}%
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                Execute Bulk {selectedAction} <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleDone}
            className="px-10 py-3.5 bg-text-main text-white text-[12px] font-black rounded-lg hover:bg-black transition-all shadow-xl active:scale-95 uppercase tracking-widest"
          >
            Acknowledge & Close
          </button>
        )}
      </div>
    </div>
  );
}
