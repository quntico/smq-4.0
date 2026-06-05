import React from 'react';
import { useCMS } from '@/context/CMSContext.jsx';

const BrandsTicker = () => {
  const { isEditorMode, cmsState, updatePageModule } = useCMS();
  
  const homePage = cmsState.pages.find(p => p.id === 'home');
  const moduleData = homePage?.modules?.find(m => m.id === 'brands_ticker')?.data || {};
  const sectionTitle = moduleData.title || 'Marcas con las que trabajamos';

  // We repeat the single strip image to fill the marquee seamlessly
  const repeatCount = 4;

  return (
    <section className="bg-[#070b0e] border-y border-white/5 py-6 overflow-hidden relative w-full select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-marquee {
          display: flex;
          width: max-content;
          animation: scrollMarquee 30s linear infinite;
        }
        .animate-scroll-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-16 relative z-10">
        
        {/* Banner Label */}
        <div className="flex-shrink-0 text-center lg:text-left min-w-[220px]">
          <span className="text-[9px] text-[#F5C400] font-mono tracking-widest uppercase block mb-1 font-semibold">
            TECNOLOGÍA E INTEGRACIÓN
          </span>
          <h3 
            className={`text-sm md:text-base font-bold text-white tracking-tight uppercase ${isEditorMode ? 'outline-dashed outline-1 outline-blue-400 p-1 cursor-text bg-black/40 rounded' : ''}`}
            contentEditable={isEditorMode}
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              updatePageModule('home', 'brands_ticker', { title: e.target.innerText });
            }}
          >
            {sectionTitle}
          </h3>
        </div>

        {/* Ticker Container with gradient mask */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
          <div className="animate-scroll-marquee gap-8 py-2 items-center">
            {/* First Set */}
            {[...Array(repeatCount)].map((_, idx) => (
              <div key={`set1-${idx}`} className="flex-shrink-0 flex items-center justify-center px-4 transition-all duration-300 hover:scale-[1.02]">
                <img 
                  src="/marcas_ticker.png" 
                  alt="Industrial Brands" 
                  className="h-8 md:h-10 object-contain mix-blend-screen opacity-60 hover:opacity-100 transition-all duration-300 filter brightness-110"
                />
              </div>
            ))}
            {/* Second Set (Duplicate for seamless scroll) */}
            {[...Array(repeatCount)].map((_, idx) => (
              <div key={`set2-${idx}`} className="flex-shrink-0 flex items-center justify-center px-4 transition-all duration-300 hover:scale-[1.02]">
                <img 
                  src="/marcas_ticker.png" 
                  alt="Industrial Brands" 
                  className="h-8 md:h-10 object-contain mix-blend-screen opacity-60 hover:opacity-100 transition-all duration-300 filter brightness-110"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandsTicker;
