"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SpecialSoundEffects from "./special-sound-effects";

export default function EmotionSurprise() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [playFunnySound, setPlayFunnySound] = useState(false);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.3, 0.6], [50, 0, -50]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // reset le déclencheur du son après un délai
    useEffect(() => {
        if (playFunnySound) {
            const timer = setTimeout(() => {
                setPlayFunnySound(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [playFunnySound]);

    // pop-up qui apparait et disparait
    const [popElements, setPopElements] = useState<
        { id: number; x: number; y: number; size: number; delay: number }[]
    >([]);

    useEffect(() => {
        const elements = [];
        for (let i = 0; i < 15; i++) {
            elements.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 80 + 40,
                delay: Math.random() * 10,
            });
        }
        setPopElements(elements);
    }, []);

    const handleContainerClick = () => {
        setPlayFunnySound(true);
    };

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full bg-gradient-to-br from-purple-600 to-pink-500 overflow-hidden cursor-pointer"
            onClick={handleContainerClick}
        >
            {/* effet sonore spécial pour le son funny */}
            <SpecialSoundEffects
                emotionType="surprise"
                trigger={playFunnySound}
            />

            {/* suivi du curseur */}
            <motion.div
                className="absolute w-40 h-40 rounded-full bg-yellow-300 mix-blend-screen opacity-70 pointer-events-none"
                animate={{
                    x: mousePosition.x - 80,
                    y: mousePosition.y - 80,
                    transition: { type: "spring", damping: 10 },
                }}
            />

            {/* elements qui pop */}
            {popElements.map((element) => (
                <motion.div
                    key={element.id}
                    className="absolute rounded-full bg-white mix-blend-screen"
                    style={{
                        left: `${element.x}%`,
                        top: `${element.y}%`,
                        width: element.size,
                        height: element.size,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, 1.2, 1],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: 2,
                        delay: element.delay,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 8 + element.delay,
                    }}
                />
            ))}

            <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-8">
                <motion.div
                    className="max-w-2xl text-center"
                    style={{ opacity: textOpacity, y: textY }}
                >
                    <motion.h2
                        className="text-6xl font-bold text-white mb-6 font-poppins italic tracking-wide"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 3, -3, 0],
                            textShadow: [
                                "0 0 5px rgba(255,255,255,0.3)",
                                "0 0 15px rgba(255,255,255,0.7)",
                                "0 0 5px rgba(255,255,255,0.3)",
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 1,
                        }}
                    >
                        Surprise
                    </motion.h2>
                    <p className="text-xl text-white/90 leading-relaxed">
                        La surprise nous saisit, nous émerveille et nous
                        déstabilise en même temps. C'est cette émotion qui nous
                        fait voir le monde avec des yeux neufs, qui nous
                        rappelle que l'inattendu peut surgir à tout moment.
                        Explorez cet espace où l'imprévisible devient source
                        d'émerveillement.
                    </p>
                    <p className="mt-4 text-white/80 text-sm">
                        Cliquez n'importe où pour une surprise sonore !
                    </p>
                </motion.div>
            </div>

            {/* animation geometrique */}
            <motion.div
                className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-pink-300 opacity-40"
                animate={{
                    scale: [1, 1.5, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 8,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-10 right-10 w-60 h-60 rounded-full bg-purple-300 opacity-40"
                animate={{
                    scale: [1, 0.7, 1],
                    x: [0, -40, 0],
                    y: [0, 60, 0],
                }}
                transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 6,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
