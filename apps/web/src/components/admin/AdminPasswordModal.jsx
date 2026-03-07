
import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const AdminPasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setPassword('');
      setError('');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '2020') {
      onSubmit(password);
    } else {
      setError('Contraseña incorrecta');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      onClick={handleOutsideClick}
    >
      <div 
        ref={modalRef}
        className="w-[400px] backdrop-blur-[30px] bg-[rgba(11,15,20,0.3)] border border-white/10 rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-[40px] relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-[24px] font-bold text-white mb-2 text-center">Acceso Administrador</h2>
        <p className="text-white/60 text-center mb-6">Ingresa la contraseña</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Contraseña"
              className="w-full bg-[#1A1F2E] border border-white/10 text-white px-[16px] py-[12px] rounded-[8px] focus:outline-none focus:border-[#0A84FF] transition-colors"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#2A2F3E] text-white py-[12px] rounded-[8px] font-medium hover:bg-[#3A3F4E] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#FFD700] text-black py-[12px] rounded-[8px] font-medium hover:brightness-110 transition-all"
            >
              Acceder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPasswordModal;
