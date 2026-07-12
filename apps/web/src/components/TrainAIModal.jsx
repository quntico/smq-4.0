import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2, X, Brain } from 'lucide-react';
import { createPortal } from 'react-dom';

const TrainAIModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      // Si suben una carpeta entera, filtramos para que solo tome PDFs y TXTs
      const validFiles = Array.from(e.target.files).filter(f => 
        f.name.toLowerCase().endsWith('.pdf') || f.name.toLowerCase().endsWith('.txt')
      );
      setFiles(validFiles);
      setStatus(null);
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setStatus(null);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/train-ai', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          successCount++;
        } else {
          console.error(`Error uploading ${file.name}`);
        }
      } catch (err) {
        console.error(`Network error for ${file.name}`, err);
      }
      
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setUploading(false);
    if (successCount === files.length) {
      setStatus('success');
      setTimeout(() => {
        setFiles([]);
        onClose();
      }, 3000);
    } else {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-lg bg-[#0F1420] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F5C400]/20 flex items-center justify-center border border-[#F5C400]/50">
              <Brain size={16} className="text-[#F5C400]" />
            </div>
            <h3 className="text-white font-bold tracking-wide uppercase text-sm">Entrenamiento de IA</h3>
          </div>
          <button onClick={onClose} disabled={uploading} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center justify-center">
          <p className="text-white/60 text-xs text-center mb-6 max-w-sm">
            Sube tus cotizaciones, catálogos o manuales técnicos en PDF. La inteligencia artificial los leerá, memorizará y usará esta información para contestarle a los clientes y cerrar ventas.
          </p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            webkitdirectory="true"
            directory="true"
            className="hidden"
          />

          {!uploading && status !== 'success' && (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-40 border-2 border-dashed border-white/20 hover:border-[#F5C400]/50 hover:bg-[#F5C400]/5 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 group"
            >
              <UploadCloud size={32} className="text-white/40 group-hover:text-[#F5C400] transition-colors" />
              <span className="text-sm text-white/60 group-hover:text-white/90">Haz clic para seleccionar la CARPETA con tus PDFs</span>
            </div>
          )}

          {files.length > 0 && !uploading && status !== 'success' && (
            <div className="w-full mt-4 flex flex-col gap-2 max-h-32 overflow-y-auto pr-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                  <div className="flex items-center gap-2 truncate">
                    <FileText size={14} className="text-white/40 shrink-0" />
                    <span className="text-xs text-white/80 truncate">{f.name}</span>
                  </div>
                  <span className="text-[10px] text-white/40 shrink-0">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              ))}
            </div>
          )}

          {uploading && (
            <div className="w-full flex flex-col items-center py-8 gap-4">
              <Loader2 size={32} className="text-[#F5C400] animate-spin" />
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#F5C400]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-[#F5C400] font-mono tracking-widest uppercase">Traduciendo a matemáticas ({progress}%)</span>
            </div>
          )}

          {status === 'success' && (
            <div className="w-full flex flex-col items-center py-8 gap-4">
              <CheckCircle size={40} className="text-green-500" />
              <span className="text-sm text-green-400 font-bold tracking-wide">¡Conocimiento Inyectado!</span>
              <span className="text-xs text-white/50 text-center">La IA ahora usará estas cotizaciones en sus respuestas.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="w-full flex flex-col items-center py-4 gap-2 mt-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <AlertCircle size={24} className="text-red-500" />
              <span className="text-xs text-red-400 font-bold text-center">Ocurrió un error al procesar algunos archivos.<br/>Asegúrate de haber corrido el código SQL en Supabase.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        {!uploading && status !== 'success' && (
          <div className="p-4 bg-black/40 border-t border-white/5 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-xs text-white/60 hover:text-white transition-colors">
              Cancelar
            </button>
            <button 
              onClick={handleUpload} 
              disabled={files.length === 0}
              className="px-6 py-2 bg-[#F5C400] text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-[#FFD700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Iniciar Entrenamiento
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export default TrainAIModal;
