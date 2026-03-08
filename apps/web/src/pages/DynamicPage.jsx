import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Footer from '@/components/Footer.jsx';
import { useCMS } from '@/context/CMSContext.jsx';
// Import available generic components from CMS rendering
import HeroSection from '@/components/HeroSection.jsx';
import DynamicModuleRenderer from '@/components/cms/DynamicModuleRenderer.jsx';

const DynamicPage = () => {
    const { "*": slugPath } = useParams();
    const { cmsState } = useCMS();
    const navigate = useNavigate();

    // Reconstruct the full slug to match the CMS format
    const currentSlug = `/${slugPath}`;

    // Find if a page matches this slug
    const pageData = cmsState.pages.find(p => p.slug === currentSlug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentSlug]);

    if (!pageData) {
        return (
            <div className="min-h-screen bg-background pt-[150px] flex flex-col items-center text-center">
                <h1 className="text-4xl font-bold text-white mb-4">404 - Página no encontrada</h1>
                <p className="text-white/60 mb-8">La página "{currentSlug}" no ha sido creada aún.</p>
                <div className="bg-white/5 border border-white/20 p-6 rounded-xl max-w-lg">
                    <p className="text-white/80 mb-4">
                        💡 <strong>¿Quieres editar esta página?</strong>
                    </p>
                    <p className="text-white/60 text-sm mb-6">
                        Abre el <strong>Panel CMS</strong> (desde el ícono de la tuerca en el Header),
                        ve a <em>Admin de Páginas</em>, crea una nueva página y asegúrate de asignarle la ruta: <br />
                        <code className="bg-black/50 text-[#FFD700] px-2 py-1 rounded mt-2 inline-block">{currentSlug}</code>
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#FFD700] text-black px-6 py-2 rounded-lg font-medium hover:brightness-110 transition-all"
                    >
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{pageData.title} | SMQ Industrial</title>
            </Helmet>
            <div className="min-h-screen bg-background pt-[100px] flex flex-col">
                <main className="flex-1">
                    {pageData.modules && pageData.modules.length > 0 ? (
                        pageData.modules.map((mod, index) => (
                            <DynamicModuleRenderer key={mod.id || index} module={mod} pageId={pageData.id} />
                        ))
                    ) : (
                        <div className="flex items-center justify-center min-h-[50vh] text-center px-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">{pageData.title}</h1>
                                <p className="text-white/50">Esta página aún no tiene módulos. Abre el Panel CMS para agregar contenido.</p>
                            </div>
                        </div>
                    )}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default DynamicPage;
