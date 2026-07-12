import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const savedLang = localStorage.getItem('smq_lang_v2');
      if (savedLang) return savedLang;
      localStorage.setItem('smq_lang_v2', 'es');
      return 'es';
    } catch (e) {
      console.warn("[Language] Error accessing localStorage:", e);
      return 'es';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('smq_lang_v2', language);
    } catch (e) {
      console.warn("[Language] Error saving to localStorage:", e);
    }
    document.documentElement.lang = language;
    
    // Si el idioma es árabe, cambiamos la dirección del texto (opcional, pero recomendado)
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Fallback a Español si no existe la traducción
        let fallback = translations['es'];
        for (const fk of keys) {
          if (fallback && fallback[fk]) {
            fallback = fallback[fk];
          } else {
            return key; 
          }
        }
        return fallback;
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
