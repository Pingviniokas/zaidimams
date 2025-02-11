"use client";
import { Suspense, useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { countryServices } from '@/data/countryServices';
import { useTheme } from '@/contexts/ThemeContext';

const MODEL_PATH = "/images/europe.glb";
useGLTF.preload(MODEL_PATH);

// Type definitions
interface CountryData {
    name: string;
    fullName: string;
    center?: THREE.Vector3;  // Will store the calculated center
    color: string;  // Add color property
    services: {
        description: string;
        features?: string[];
    };
}

interface MeshUserData {
    onPointerOver: () => void;
    onPointerOut: () => void;
    onClick: () => void;
}

interface ThreeEvent extends THREE.Event {
    object: THREE.Mesh;
}

// Modify the color generation function to alternate between two ranges
function generateDarkGrayColor(isAlt: boolean = false) {
    // Generate random number between two different ranges for contrast
    const baseValue = isAlt 
        ? Math.floor(Math.random() * 20) + 180  // 180-200 (brighter)
        : Math.floor(Math.random() * 20) + 140; // 140-160 (darker)
    return `rgb(${baseValue}, ${baseValue}, ${baseValue})`;
}

// Update COUNTRIES array
const COUNTRIES: CountryData[] = Object.entries(countryServices).map(([code, content]) => ({
    name: code,
    fullName: content.fullName,
    color: generateDarkGrayColor(code.charCodeAt(0) % 2 === 0), // Alternate colors based on country code
    services: content.services
}));

// Popular destinations for quick access
const POPULAR_DESTINATIONS = ["PL", "DE", "GB", "IE", "ES", "FR", "NO", "FI"];

// Lighter color for non-interactive countries
const DEFAULT_COUNTRY_COLOR = "rgb(150, 150, 150)";

function EuropeMapModel({ selectedCountry, setSelectedCountry, onZoomToCountry }: { 
    selectedCountry: string | null, 
    setSelectedCountry: (country: string | null) => void,
    onZoomToCountry: (countryName: string, center: THREE.Vector3) => void
}) {
    const { scene } = useGLTF(MODEL_PATH);
    const clonedScene = useMemo(() => scene.clone(), [scene]);
    const meshRef = useRef<THREE.Group>(null);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const { camera } = useThree();

    // Define the model's transformations
    const modelPosition = new THREE.Vector3(-5, 8, 4.5);
    const modelRotation = new THREE.Euler(-5, 0, -0.4);
    const modelScale = new THREE.Vector3(65, 65, 65);

    // Add a ref to store all materials
    const materialsRef = useRef<Map<string, THREE.MeshStandardMaterial>>(new Map());

    // Initial setup of meshes and materials
    useEffect(() => {
        clonedScene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh && child.name) {
                const mesh = child as THREE.Mesh;
                const country = COUNTRIES.find(c => c.name === mesh.name);
                
                mesh.castShadow = true;
                mesh.receiveShadow = false;

                if (mesh.material) {
                    const material = (mesh.material as THREE.MeshStandardMaterial).clone();
                    const countryColor = country ? country.color : DEFAULT_COUNTRY_COLOR;
                    material.color = new THREE.Color(countryColor);
                    material.emissive = new THREE.Color(countryColor);
                    material.emissiveIntensity = 0.1;
                    material.roughness = 0.8;
                    material.metalness = 0.2;
                    material.transparent = true;
                    material.opacity = 1;
                    
                    mesh.material = material;
                    materialsRef.current.set(mesh.name, material);

                    // Optimize the geometry
                    mesh.geometry.dispose();
                    mesh.geometry = (mesh.geometry as THREE.BufferGeometry).clone().toNonIndexed();
                    mesh.geometry.deleteAttribute('uv');
                    mesh.geometry.deleteAttribute('normal');
                    mesh.geometry.computeVertexNormals();
                }
                
                if (country) {
                    // Calculate the center of the mesh
                    const boundingBox = new THREE.Box3().setFromObject(mesh);
                    const center = new THREE.Vector3();
                    boundingBox.getCenter(center);

                    // Apply model transformations to the center
                    center.multiply(modelScale);
                    center.applyEuler(modelRotation);
                    center.add(modelPosition);

                    country.center = center;
                }

                mesh.userData = {
                    onPointerOver: () => {
                        if (!mesh.userData.isHovered) {
                            mesh.userData.isHovered = true;
                            gsap.to(mesh.scale, {
                                y: 1.5,
                                duration: 0.2,
                                ease: "power1.out"
                            });
                            gsap.to(mesh.material, {
                                emissiveIntensity: 0.5,
                                duration: 0.2,
                                ease: "power1.out"
                            });
                            (mesh.material as THREE.MeshStandardMaterial).color.setRGB(0.9, 0.9, 0.9);
                        }
                    },
                    onPointerOut: () => {
                        if (mesh.userData.isHovered) {
                            mesh.userData.isHovered = false;
                            gsap.to(mesh.scale, {
                                y: 1,
                                duration: 0.2,
                                ease: "power1.out"
                            });
                            gsap.to(mesh.material, {
                                emissiveIntensity: 0.1,
                                duration: 0.2,
                                ease: "power1.out"
                            });
                            const countryColor = country ? country.color : DEFAULT_COUNTRY_COLOR;
                            (mesh.material as THREE.MeshStandardMaterial).color.setStyle(countryColor);
                        }
                    },
                    onClick: () => {
                        console.log(`Clicked on ${mesh.name}`);
                        const country = COUNTRIES.find(c => c.name === mesh.name);
                        if (country?.center) {
                            setSelectedCountry(mesh.name);
                            onZoomToCountry(mesh.name, country.center);
                        }
                    },
                    isHovered: false
                } as MeshUserData & { isHovered: boolean };
            }
        });
    }, [clonedScene]);

    // Separate effect for handling material updates based on selection
    useEffect(() => {
        materialsRef.current.forEach((material, meshName) => {
            gsap.to(material, {
                opacity: selectedCountry ? (meshName === selectedCountry ? 1 : 0.3) : 1,
                emissiveIntensity: selectedCountry ? (meshName === selectedCountry ? 0.3 : 0.05) : 0.1,
                duration: 0.5,
            });
        });
    }, [selectedCountry]);

    return (
        <>
            <directionalLight
                position={[-5, 10, 5]}
                castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                intensity={selectedCountry ? 0.7 : 1}
            />
            <ambientLight intensity={selectedCountry ? 0.8 : 0.6} />
            {selectedCountry && (
                <spotLight
                    position={[0, 10, 0]}
                    intensity={0.3}
                    angle={0.5}
                    penumbra={1}
                />
            )}
            <primitive
                ref={meshRef}
                object={clonedScene}
                position={modelPosition}
                rotation={modelRotation}
                scale={modelScale}
                dispose={null}
                onPointerOver={(e: ThreeEvent) => e.object.userData.onPointerOver?.()}
                onPointerOut={(e: ThreeEvent) => e.object.userData.onPointerOut?.()}
                onClick={(e: ThreeEvent) => e.object.userData.onClick?.()}
            />
        </>
    );
}

// Create a style element for the scrollbar styles
const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        borderRadius: 2px;
        margin: 8px 0;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        borderRadius: 2px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background-clip: padding-box;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
    }
    @media (max-width: 768px) {
        .custom-scrollbar::-webkit-scrollbar {
            display: none;
        }
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateX(20px) translateY(-50%);
        }
        to {
            opacity: 1;
            transform: translateX(0) translateY(-50%);
        }
    }
`;

export default function EuropeMap() {
    const { theme } = useTheme();
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const cameraRef = useRef<THREE.Camera | null>(null);

    // Match these exactly with the initial Canvas camera position
    const DEFAULT_CAMERA_POSITION = new THREE.Vector3(10, 0, 15);
    const DEFAULT_LOOK_AT = new THREE.Vector3(0, 0, 0); // Changed to look at origin

    const handleCameraMove = (position: THREE.Vector3, isReset: boolean = false) => {
        if (cameraRef.current && cameraRef.current instanceof THREE.PerspectiveCamera) {
            // Store the current look-at target
            const currentLookAt = new THREE.Vector3();
            cameraRef.current.getWorldDirection(currentLookAt);
            currentLookAt.multiplyScalar(15).add(cameraRef.current.position);

            if (isReset) {
                // Create a dummy object to track the look-at point
                const lookAtTarget = { x: currentLookAt.x, y: currentLookAt.y, z: currentLookAt.z };
                
                gsap.to(lookAtTarget, {
                    x: DEFAULT_LOOK_AT.x,
                    y: DEFAULT_LOOK_AT.y,
                    z: DEFAULT_LOOK_AT.z,
                    duration: 1,
                    onUpdate: () => {
                        cameraRef.current?.lookAt(lookAtTarget.x, lookAtTarget.y, lookAtTarget.z);
                    }
                });

                gsap.to(cameraRef.current.position, {
                    x: DEFAULT_CAMERA_POSITION.x,
                    y: DEFAULT_CAMERA_POSITION.y,
                    z: DEFAULT_CAMERA_POSITION.z,
                    duration: 1,
                });
            } else {
                const offsetPosition = new THREE.Vector3(
                    position.x + 2,
                    position.y + 2,
                    position.z + 5
                );

                // Create a dummy object to track the look-at point
                const lookAtTarget = { x: currentLookAt.x, y: currentLookAt.y, z: currentLookAt.z };
                
                gsap.to(lookAtTarget, {
                    x: position.x,
                    y: position.y,
                    z: position.z,
                    duration: 1,
                    onUpdate: () => {
                        cameraRef.current?.lookAt(lookAtTarget.x, lookAtTarget.y, lookAtTarget.z);
                    }
                });

                gsap.to(cameraRef.current.position, {
                    x: offsetPosition.x,
                    y: offsetPosition.y,
                    z: offsetPosition.z,
                    duration: 1,
                });
            }
        }
    };

    const zoomToCountry = (countryName: string, center: THREE.Vector3) => {
        setSelectedCountry(countryName);
        handleCameraMove(center, false);
    };

    const resetView = () => {
        setSelectedCountry(null);
        handleCameraMove(DEFAULT_CAMERA_POSITION, true);
    };

    return (
        <div style={{ 
            position: "relative", 
            width: "100%", 
            height: "100%",
            minHeight: "100vh",
        }}>
            <style>{scrollbarStyles}</style>
            <div 
                className="custom-scrollbar country-list-item"
                style={{ 
                    position: "absolute", 
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: 20, 
                    zIndex: 1,
                    padding: "16px",
                    borderRadius: "16px",
                    boxShadow: theme === 'light' 
                        ? "0 8px 32px rgba(0, 0, 0, 0.1)"
                        : "0 8px 32px rgba(0, 0, 0, 0.2)",
                    width: "300px",
                    maxHeight: "60vh",
                    overflowY: "auto",
                    willChange: "transform",
                    backfaceVisibility: "hidden"
                }}
            >
                <div style={{
                    marginBottom: "20px",
                    position: "sticky",
                    top: 0,
                    background: "rgba(255, 255, 255, 0.1)",
                    padding: "8px",
                    borderRadius: "12px",
                }}>
                    <input
                        type="text"
                        placeholder="Ieškoti šalies..."
                        style={{
                            width: "100%",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            fontSize: "13px",
                            outline: "none",
                        }}
                        onChange={(e) => {
                            // Add search functionality here
                        }}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <h3 style={{
                        fontSize: "12px",
                        color: "rgba(255, 255, 255, 0.7)",
                        marginBottom: "10px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                    }}>
                        Populiariausios kryptys
                    </h3>
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "12px"
                    }}>
                        {POPULAR_DESTINATIONS.map((code, index) => {
                            const country = COUNTRIES.find(c => c.name === code);
                            return country ? (
                                <button
                                    key={country.name}
                                    className={`stagger-item hover-scale`}
                                    onClick={() => zoomToCountry(country.name, country.center || new THREE.Vector3())}
                                    style={{
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        border: "none",
                                        background: selectedCountry === country.name 
                                            ? "rgba(255, 255, 255, 0.15)"
                                            : "rgba(255, 255, 255, 0.05)",
                                        color: "#FFFFFF",
                                        cursor: "pointer",
                                        fontSize: "11px",
                                        fontWeight: "600",
                                        letterSpacing: "0.7px",
                                        textTransform: "uppercase",
                                        transition: "all 0.2s",
                                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                                        transform: "translateZ(0)",
                                        WebkitFontSmoothing: "antialiased",
                                        MozOsxFontSmoothing: "grayscale",
                                        textRendering: "geometricPrecision",
                                        textShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    {country.fullName}
                                </button>
                            ) : null;
                        })}
                    </div>
                </div>

                <h3 style={{
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "10px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                }}>
                    Visos šalys
                </h3>
                {COUNTRIES.map((country, index) => (
                    <button
                        key={country.name}
                        onClick={() => country.center && zoomToCountry(country.name, country.center)}
                        className="country-list-button w-full text-left mb-2 p-4 rounded-lg"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "14px",
                            letterSpacing: "0.3px",
                            transition: "none",
                            transform: "none",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            userSelect: "none"
                        }}
                    >
                        <div className="font-medium">
                            {country.fullName}
                        </div>
                        <span style={{ 
                            fontSize: "10px",
                            opacity: 0.7,
                            fontWeight: "700",
                            backgroundColor: selectedCountry === country.name
                                ? theme === 'light' 
                                    ? "rgba(0, 0, 0, 0.1)"
                                    : "rgba(255, 255, 255, 0.1)"
                                : "transparent",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            letterSpacing: "1px",
                        }}>
                            {country.name}
                        </span>
                    </button>
                ))}
            </div>

            <div style={{ position: "absolute", bottom: 20, left: 20, zIndex: 1 }}>
                <button
                    className="opacity-0 animate-fade-in delay-100 hover-lift"
                    style={{
                        padding: "16px 32px",
                        background: selectedCountry 
                            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))"
                            : "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "12px",
                        cursor: selectedCountry ? "pointer" : "not-allowed",
                        opacity: selectedCountry ? 1 : 0.5,
                        color: "rgba(255, 255, 255, 0.9)",
                        fontWeight: "600",
                        fontSize: "15px",
                        transition: "all 0.2s",
                    }}
                    onClick={resetView}
                    disabled={!selectedCountry}
                >
                    ← Grįžti į apžvalgą
                </button>
            </div>

            <div style={{
                position: "absolute",
                top: "40px",
                left: "50%",
                transform: "translate(-50%, 0)",
                zIndex: 1,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.15)",
                padding: "16px 32px",
                borderRadius: "16px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                willChange: "transform",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
            }} className="animate-title">
                <h1 style={{
                    color: "rgba(255, 255, 255, 0.95)",
                    fontSize: "2rem",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    margin: 0,
                    textTransform: "uppercase",
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                    lineHeight: "1.2",
                    whiteSpace: "nowrap",
                }}>
                    Tarptautiniai perkraustymai
                </h1>
            </div>

            {selectedCountry && (
                <div 
                    className="info-panel animate-slide-right"
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: 20,
                        transform: "translateY(-50%)",
                        zIndex: 1,
                        padding: "16px",
                        borderRadius: "16px",
                        boxShadow: theme === 'light' 
                            ? "0 8px 32px rgba(0, 0, 0, 0.1)"
                            : "0 8px 32px rgba(0, 0, 0, 0.2)",
                        width: "500px",
                        height: "60vh",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px"
                    }}>
                        <h2 style={{
                            color: "rgba(255, 255, 255, 0.95)",
                            margin: 0,
                            fontSize: "1.5rem",
                            fontWeight: "500"
                        }}>
                            {COUNTRIES.find(c => c.name === selectedCountry)?.fullName}
                        </h2>
                        <button
                            onClick={resetView}
                            style={{
                                background: "none",
                                border: "none",
                                color: "rgba(255, 255, 255, 0.6)",
                                cursor: "pointer",
                                fontSize: "20px",
                                padding: "4px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "color 0.2s"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)"}
                            onMouseOut={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)"}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="custom-scrollbar description-box" style={{
                        flex: 1,
                        overflowY: "auto",
                        marginBottom: "16px"
                    }}>
                        <div style={{
                            color: "rgba(255, 255, 255, 0.8)",
                            marginBottom: "24px",
                            lineHeight: "1.6"
                        }}>
                            {COUNTRIES.find(c => c.name === selectedCountry)?.services.description}
                        </div>

                        <div>
                            {COUNTRIES.find(c => c.name === selectedCountry)?.services.features?.map((feature, index) => (
                                <div 
                                    key={index}
                                    style={{
                                        color: "rgba(255, 255, 255, 0.7)",
                                        padding: "8px 0",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px"
                                    }}
                                >
                                    <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>•</span>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "auto"
                    }}>
                        <button
                            className="hover-lift"
                            style={{
                                flex: 1,
                                padding: "12px",
                                background: "rgba(255, 255, 255, 0.15)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "8px",
                                color: "rgba(255, 255, 255, 0.9)",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: "500",
                                transition: "all 0.2s"
                            }}
                        >
                            SKAIČIUOTI KAINĄ
                        </button>
                        <button
                            className="hover-lift"
                            style={{
                                flex: 1,
                                padding: "12px",
                                background: "linear-gradient(135deg, #2563eb, #1e40af)",
                                border: "none",
                                borderRadius: "8px",
                                color: "white",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: "500",
                                transition: "all 0.2s"
                            }}
                        >
                            UŽSAKYTI PASLAUGĄ
                        </button>
                    </div>
                </div>
            )}

            <Canvas
                style={{ 
                    position: "absolute", 
                    width: "100%", 
                    height: "100%",
                    imageRendering: "crisp-edges"
                }}
                camera={{ 
                    position: [10, 0, 15], 
                    fov: 50,
                    near: 0.1,
                    far: 1000
                }}
                shadows
                gl={{ 
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    precision: "highp"
                }}
                onCreated={(state) => {
                    cameraRef.current = state.camera;
                    if (cameraRef.current instanceof THREE.PerspectiveCamera) {
                        cameraRef.current.lookAt(DEFAULT_LOOK_AT);
                    }
                }}
            >
                <Environment
                    preset="city"
                    background={false}
                    blur={0.8}
                />
                <Suspense fallback={null}>
                    <EuropeMapModel 
                        selectedCountry={selectedCountry} 
                        setSelectedCountry={setSelectedCountry}
                        onZoomToCountry={zoomToCountry}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

