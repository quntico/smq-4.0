import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2, X, Brain, Database } from 'lucide-react';
import { createPortal } from 'react-dom';
import { supabase } from '@/lib/supabase.js';

const TrainAIModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [trainedFiles, setTrainedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [activeTab, setActiveTab] = useState('upload');
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const fetchTrainedFiles = async () => {
    try {
      const { data, error } = await supabase.from('ai_documents').select('filename');
      if (data) {
        const uniqueFiles = [...new Set(data.map(item => item.filename))];
        setTrainedFiles(uniqueFiles);
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTrainedFiles();
    }
  }, [isOpen]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const validFiles = Array.from(e.dataTransfer.files).filter(f => {
        // Ignorar archivos ocultos y temporales de Word
        if (f.name.startsWith('.') || f.name.startsWith('~$')) return false;
        return true;
      });
      if (validFiles.length > 0) {
        setFiles(prev => {
          const newFiles = [...prev];
          validFiles.forEach(vf => {
            if (!newFiles.find(existing => existing.name === vf.name)) {
              newFiles.push(vf);
            }
          });
          return newFiles;
        });
        setStatus(null);
        setProgress(0);
      } else {
        alert('No se encontraron archivos PDF o TXT en la carpeta arrastrada.');
      }
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const validFiles = Array.from(e.target.files).filter(f => {
        // Ignorar archivos ocultos y temporales de Word
        if (f.name.startsWith('.') || f.name.startsWith('~$')) return false;
        return true;
      });
      if (validFiles.length === 0) {
        alert('No se encontró ningún archivo.');
        return;
      }
      setFiles(prev => {
        const newFiles = [...prev];
        validFiles.forEach(vf => {
          if (!newFiles.find(existing => existing.name === vf.name && existing.size === vf.size)) {
            newFiles.push(vf);
          }
        });
        return newFiles;
      });
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
      formData.append('path', file.webkitRelativePath || file.name);

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
      fetchTrainedFiles();
      setTimeout(() => {
        setFiles([]);
        setStatus(null);
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

        {/* Tabs */}
        <div className="flex items-center w-full border-b border-white/10">
          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'upload' ? 'text-[#F5C400] border-b-2 border-[#F5C400] bg-white/5' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}`}
          >
            Subir Documentos
          </button>
          <button 
            onClick={() => setActiveTab('directory')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${activeTab === 'directory' ? 'text-[#F5C400] border-b-2 border-[#F5C400] bg-white/5' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}`}
          >
            Bóveda de IA 
            <span className="bg-black/50 px-2 py-0.5 rounded-full text-[10px]">{trainedFiles.length}</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center justify-center min-h-[300px]">
          
          {activeTab === 'upload' && (
            <>
              <p className="text-white/60 text-xs text-center mb-6 max-w-sm">
                Sube tus cotizaciones, catálogos o manuales técnicos en PDF. La inteligencia artificial los leerá, memorizará y usará esta información para contestarle a los clientes y cerrar ventas.
              </p>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
              />
              <input
                type="file"
                ref={folderInputRef}
                onChange={handleFileChange}
                multiple
                webkitdirectory="true"
                directory="true"
                className="hidden"
              />

              {!uploading && status !== 'success' && (
                <div className="w-full flex flex-col gap-4">
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full h-36 border-2 border-dashed ${isDragging ? 'border-[#F5C400] bg-[#F5C400]/10' : 'border-white/20 hover:border-[#F5C400]/50 hover:bg-[#F5C400]/5'} rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-300 group`}
                  >
                    <UploadCloud size={32} className={`transition-colors ${isDragging ? 'text-[#F5C400]' : 'text-white/40 group-hover:text-[#F5C400]'}`} />
                    <span className="text-sm text-white/60 group-hover:text-white/90 text-center px-4 mb-2">
                      Arrastra y suelta tus PDFs aquí
                    </span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-wider hover:bg-white/10 hover:text-[#F5C400] transition-colors"
                      >
                        Archivos
                      </button>
                      <button 
                        onClick={() => folderInputRef.current?.click()}
                        className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-wider hover:bg-white/10 hover:text-[#F5C400] transition-colors"
                      >
                        Carpetas
                      </button>
                    </div>
                  </div>

                  {files.length > 0 && (
                    <div className="w-full mt-2 flex flex-col gap-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <FileText size={12} className="text-[#39FF14]" />
                          <span className="text-[10px] text-[#39FF14] uppercase font-bold tracking-wider">
                            Archivos en Cola para Entrenar ({files.length})
                          </span>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setFiles([]); }} 
                          className="text-[9px] text-white/40 hover:text-red-400 uppercase tracking-wider bg-white/5 px-2 py-1 rounded"
                        >
                          Limpiar
                        </button>
                      </div>
                      <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                        {files.map((f, i) => (
                          <div key={i} className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                            <div className="flex items-center gap-2 truncate overflow-hidden">
                              <FileText size={14} className="text-white/40 shrink-0" />
                              <span className="text-[11px] text-white/80 truncate">{f.webkitRelativePath || f.name}</span>
                            </div>
                            <span className="text-[10px] text-white/40 shrink-0">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {activeTab === 'directory' && (
            <div className="w-full flex flex-col gap-2 h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Database size={14} className="text-[#F5C400]" />
                  <span className="text-xs text-[#F5C400] uppercase font-bold tracking-wider">Directorio Supabase</span>
                </div>
                <button 
                  onClick={() => fetchTrainedFiles()} 
                  className="text-[9px] text-white/40 hover:text-white uppercase tracking-wider bg-white/5 px-2 py-1 rounded transition-colors"
                >
                  Actualizar
                </button>
              </div>
              
              {trainedFiles.length > 0 ? (
                <div className="flex flex-col gap-1.5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar w-full">
                  {trainedFiles.map((fileName, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors w-full">
                      <FileText size={16} className="text-white/60 shrink-0" />
                      <span className="text-sm text-white/90 truncate">{fileName}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 bg-white/5 rounded-xl border border-white/10 border-dashed w-full h-full">
                  <Database size={24} className="text-white/20 mb-3" />
                  <span className="text-sm text-white/40 italic">La bóveda de conocimiento está vacía.</span>
                </div>
              )}
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
