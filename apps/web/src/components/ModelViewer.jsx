/* eslint-disable react/no-unknown-property */
import React, { Suspense, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Grid, ContactShadows } from '@react-three/drei';
import { Play, Pause, RotateCcw, BoxSelect } from 'lucide-react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader.js';

const ModelObj = ({ url }) => {
    const obj = useLoader(OBJLoader, url);
    return <primitive object={obj} />;
};

const ModelFbx = ({ url }) => {
    const fbx = useLoader(FBXLoader, url);
    return <primitive object={fbx} />;
};

const ModelDae = ({ url }) => {
    const collada = useLoader(ColladaLoader, url);
    return <primitive object={collada.scene} />;
};

const ModelStl = ({ url }) => {
    const geom = useLoader(STLLoader, url);
    return (
        <mesh geometry={geom}>
            <meshStandardMaterial color="gray" />
        </mesh>
    );
};

const Model3ds = ({ url }) => {
    const tds = useLoader(TDSLoader, url);
    return <primitive object={tds} />;
};

const ModelGltf = ({ url }) => {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
};

const ModelContainer = ({ children, wireframe, fxMode }) => {
    const groupRef = useRef();

    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.traverse((child) => {
                if (child.isMesh && child.material) {
                    // Si no hemos cacheado el material original en esta ejecución, guárdalo 
                    if (!child.userData.originalMaterial) {
                        child.userData.originalMaterial = Array.isArray(child.material)
                            ? child.material.map(m => m.clone())
                            : child.material.clone();
                    }

                    if (fxMode) {
                        // MODO HOLOGRAMA AZUL CIAN FX (TRUE BLUEPRINT)
                        // 1. Material base de cristal oscuro para ocultar el interior pero dar volumen
                        const fxBaseMaterial = new THREE.MeshStandardMaterial({
                            color: new THREE.Color(0x021128),
                            transparent: true,
                            opacity: 0.85,
                            roughness: 0.2,
                            metalness: 0.8,
                            depthWrite: true
                        });

                        if (Array.isArray(child.material)) {
                            child.material = child.userData.originalMaterial.map(() => fxBaseMaterial);
                        } else {
                            child.material = fxBaseMaterial;
                        }

                        // 2. Líneas de bordes (Edges) de color neón brillante
                        if (!child.userData.fxEdges) {
                            const edgesGeometry = new THREE.EdgesGeometry(child.geometry, 15); // Límite de 15 grados para no dibujar demasiadas líneas internas
                            const lineMaterial = new THREE.LineBasicMaterial({
                                color: 0x00E5FF,
                                transparent: true,
                                opacity: 0.9,
                                blending: THREE.AdditiveBlending,
                                depthWrite: false
                            });
                            const lineSegments = new THREE.LineSegments(edgesGeometry, lineMaterial);
                            child.add(lineSegments);
                            child.userData.fxEdges = lineSegments;
                        }
                        child.userData.fxEdges.visible = true;
                    } else {
                        // Restaurar el orginal, pero respetando si el Toggle Wireframe simple está activo
                        const setWire = (m, isWired) => {
                            const mat = m.clone();
                            mat.wireframe = isWired;
                            return mat;
                        };

                        if (Array.isArray(child.userData.originalMaterial)) {
                            child.material = child.userData.originalMaterial.map(m => setWire(m, wireframe));
                        } else {
                            child.material = setWire(child.userData.originalMaterial, wireframe);
                        }

                        // Ocultar las líneas de holograma si existen
                        if (child.userData.fxEdges) {
                            child.userData.fxEdges.visible = false;
                        }
                    }
                }
            });
        }
    }, [children, wireframe, fxMode]);

    return <group ref={groupRef}>{children}</group>;
};

const ModelViewer = ({ url, moduleData, updatePageModule, children }) => {
    const defaultData = moduleData?.data || {};

    const [rotationY, setRotationY] = useState(defaultData.modelRotation ?? 0);
    const [altitude, setAltitude] = useState(defaultData.modelAltitude ?? 0);
    const [autoRotate, setAutoRotate] = useState(defaultData.modelAutoRotate ?? false);
    const [rpm, setRpm] = useState(defaultData.modelRpm ?? 0.5);
    const [wireframe, setWireframe] = useState(defaultData.modelWireframe ?? false);
    const [fxMode, setFxMode] = useState(defaultData.modelFxMode ?? false);
    const extension = url.split('.').pop().toLowerCase();

    const saveToCMS = (key, value) => {
        if (updatePageModule) {
            updatePageModule('home', 'visualizer', { [key]: value });
        }
    };

    const renderModel = () => {
        switch (extension) {
            case 'obj': return <ModelObj url={url} />;
            case 'fbx': return <ModelFbx url={url} />;
            case 'dae': return <ModelDae url={url} />;
            case 'stl': return <ModelStl url={url} />;
            case '3ds': return <Model3ds url={url} />;
            case 'gltf':
            case 'glb':
                return <ModelGltf url={url} />;
            default: return null;
        }
    };

    return (
        <div className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-b from-[#1a1c23] to-[#0A0F14] overflow-hidden group">
            <Canvas dpr={[1, 1]} camera={{ position: [0, 5, 10], fov: 50 }} className="cursor-grab active:cursor-grabbing">
                {/* Piso imaginario y ejes para referencia de centrado a 0 */}
                <Grid
                    position={[0, 0, 0]}
                    args={[100, 100]}
                    cellSize={1}
                    cellThickness={1}
                    cellColor="#3a3c42"
                    sectionSize={5}
                    sectionThickness={1.5}
                    sectionColor="#5a5c62"
                    fadeDistance={50}
                    fadeStrength={1}
                />

                <Suspense fallback={null}>
                    <group position={[0, parseFloat(altitude), 0]} rotation={[0, rotationY * (Math.PI / 180), 0]}>
                        <Stage environment="city" intensity={0.4} shadows={false} adjustCamera={1.2}>
                            <ModelContainer wireframe={wireframe} fxMode={fxMode}>
                                {renderModel()}
                            </ModelContainer>
                        </Stage>
                        {/* Piso Contact Shadows Manual para FX Mode */}
                        {!fxMode && <ContactShadows opacity={0.5} scale={50} blur={2.5} far={10} minDepthThreshold={0.4} />}
                        {children}
                    </group>
                </Suspense>

                <OrbitControls makeDefault autoRotate={autoRotate} autoRotateSpeed={parseFloat(rpm)} enableDamping={false} />
            </Canvas>

            {/* Barra de Control inferior (Modo Editor / Usuario) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#090b10]/95 backdrop-blur-xl rounded-2xl border border-white/5 flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-6 px-4 md:px-6 py-3 shadow-2xl z-50 w-[90%] md:w-auto">
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="flex flex-col">
                            <span className="text-[9px] text-[#00E5FF] font-bold uppercase tracking-wider mb-1">Rotación Y</span>
                            <input type="range" min="-180" max="180" value={rotationY} onChange={(e) => setRotationY(e.target.value)} onPointerUp={(e) => saveToCMS('modelRotation', Number(e.target.value))} className="w-16 md:w-20 accent-white h-1 bg-white/20 rounded-full appearance-none outline-none cursor-pointer pointer-events-auto" />
                        </div>
                        <span className="text-[10px] text-[#00E5FF] w-6 text-right">{rotationY}°</span>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="flex flex-col">
                            <span className="text-[9px] text-[#00E5FF] font-bold uppercase tracking-wider mb-1">Altura</span>
                            <input type="range" min="-10" max="10" step="0.1" value={altitude} onChange={(e) => setAltitude(e.target.value)} onPointerUp={(e) => saveToCMS('modelAltitude', Number(e.target.value))} className="w-16 md:w-20 accent-white h-1 bg-white/20 rounded-full appearance-none outline-none cursor-pointer pointer-events-auto" />
                        </div>
                        <span className="text-[10px] text-[#00E5FF] w-6 text-right">{Number(altitude).toFixed(1)}</span>
                    </div>
                </div>

                <div className="w-[1px] h-6 bg-white/10 hidden md:block"></div>

                <div className="flex items-center gap-4 md:gap-6">
                    <button onClick={() => { const val = !autoRotate; setAutoRotate(val); saveToCMS('modelAutoRotate', val); }} className="text-white/70 hover:text-white transition-colors pointer-events-auto" title="Auto Rotar">
                        {autoRotate ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                    </button>

                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="flex flex-col">
                            <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider mb-1">Velocidad</span>
                            <input type="range" min="0" max="10" step="0.5" value={rpm} onChange={(e) => setRpm(e.target.value)} onPointerUp={(e) => saveToCMS('modelRpm', Number(e.target.value))} className="w-16 md:w-20 accent-white h-1 bg-white/20 rounded-full appearance-none outline-none cursor-pointer pointer-events-auto" />
                        </div>
                    </div>
                </div>

                <div className="w-[1px] h-6 bg-white/10 hidden md:block"></div>

                <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${fxMode ? 'text-[#00E5FF]' : 'text-white/50'}`}>Modo FX</span>
                        <div
                            className={`w-8 h-4 rounded-full flex items-center p-0.5 cursor-pointer transition-colors shadow-inner box-border ${fxMode ? 'bg-[#00E5FF]/30 border border-[#00E5FF]' : 'bg-white/20 border-transparent'}`}
                            onClick={() => { const val = !fxMode; setFxMode(val); saveToCMS('modelFxMode', val); }}
                        >
                            <div className={`w-3 h-3 rounded-full transition-transform ${fxMode ? 'translate-x-4 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]' : 'translate-x-0 bg-white'}`} />
                        </div>
                    </div>

                    <div className="w-[1px] h-4 bg-white/10 hidden md:block"></div>

                    <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
                        <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider">Malla</span>
                        <div
                            className={`w-8 h-4 rounded-full flex items-center p-0.5 cursor-pointer transition-colors ${wireframe ? 'bg-white' : 'bg-white/20'}`}
                            onClick={() => { const val = !wireframe; setWireframe(val); saveToCMS('modelWireframe', val); }}
                        >
                            <div className={`w-3 h-3 rounded-full transition-transform ${wireframe ? 'translate-x-4 bg-black' : 'translate-x-0 bg-white'}`} />
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setRotationY(0); setAltitude(0); setAutoRotate(false); setRpm(0.5); setWireframe(false); setFxMode(false);
                            saveToCMS('modelRotation', 0);
                            saveToCMS('modelAltitude', 0);
                            saveToCMS('modelAutoRotate', false);
                            saveToCMS('modelRpm', 0.5);
                            saveToCMS('modelWireframe', false);
                            saveToCMS('modelFxMode', false);
                        }}
                        className="text-white/50 hover:text-white transition-colors pointer-events-auto"
                        title="Resetear a Cero"
                    >
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModelViewer;
