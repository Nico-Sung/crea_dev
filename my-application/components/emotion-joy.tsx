"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function EmotionJoy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

    // cénvas animation pour joie - particules qui rebondissent
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
            originalX: number;
            originalY: number;
        }[] = [];

        // creee les particules
        for (let i = 0; i < 50; i++) {
            const size = Math.random() * 15 + 5;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;

            particles.push({
                x,
                y,
                originalX: x,
                originalY: y,
                size,
                speedX: (Math.random() - 0.5) * 3,
                speedY: (Math.random() - 0.5) * 3,
                color: `hsl(${Math.random() * 60 + 30}, 100%, 65%)`,
            });
        }

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                // calcule la distance de la souris
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // si la souris est proche, attire la particule
                if (distance < 200) {
                    const angle = Math.atan2(dy, dx);
                    const force = ((200 - distance) / 200) * 5;

                    particle.x += Math.cos(angle) * force;
                    particle.y += Math.sin(angle) * force;

                    // augmente la taille des particules
                    ctx.beginPath();
                    ctx.arc(
                        particle.x,
                        particle.y,
                        particle.size * (1 + (200 - distance) / 200),
                        0,
                        Math.PI * 2
                    );
                    ctx.fillStyle = particle.color;
                    ctx.fill();
                } else {
                    // mouvement normal
                    ctx.beginPath();
                    ctx.arc(
                        particle.x,
                        particle.y,
                        particle.size,
                        0,
                        Math.PI * 2
                    );
                    ctx.fillStyle = particle.color;
                    ctx.fill();

                    // mets a jour position
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;

                    // rebondis sur le mur
                    if (particle.x < 0 || particle.x > canvas.width) {
                        particle.speedX *= -1;
                    }

                    if (particle.y < 0 || particle.y > canvas.height) {
                        particle.speedY *= -1;
                    }

                    // retourne à la position d'origine
                    particle.x += (particle.originalX - particle.x) * 0.01;
                    particle.y += (particle.originalY - particle.y) * 0.01;
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full bg-gradient-to-b from-yellow-400 to-orange-500 overflow-hidden"
        >
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* suivi du curseur */}
            <motion.div
                className="absolute w-32 h-32 rounded-full bg-yellow-200 mix-blend-screen opacity-70 pointer-events-none"
                animate={{
                    x: mousePosition.x - 64,
                    y: mousePosition.y - 64,
                    scale: [1, 1.2, 1],
                    transition: {
                        x: { type: "spring", damping: 15 },
                        y: { type: "spring", damping: 15 },
                        scale: {
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                        },
                    },
                }}
            />

            <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-8">
                <motion.div
                    className="max-w-2xl text-center"
                    style={{ opacity: textOpacity, y: textY }}
                >
                    <motion.h2
                        className="text-6xl font-extrabold text-white mb-6 font-poppins tracking-tight"
                        animate={{
                            scale: [1, 1.05, 1],
                            y: [0, -5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        Joie
                    </motion.h2>
                    <p className="text-xl text-white/90 leading-relaxed font-poppins font-light">
                        La joie est cette émotion qui nous fait vibrer, qui nous
                        élève et nous fait sentir vivants. C'est un sentiment
                        d'allégresse qui illumine notre être et nous connecte
                        aux autres. Laissez-vous porter par ces bulles d'énergie
                        positive qui dansent autour de vous.
                    </p>
                </motion.div>
            </div>

            {/* elements animés */}
            <motion.div
                className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-yellow-300 opacity-30"
                animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-20 right-20 w-60 h-60 rounded-full bg-orange-300 opacity-30"
                animate={{
                    y: [0, 40, 0],
                    x: [0, -30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 7,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
