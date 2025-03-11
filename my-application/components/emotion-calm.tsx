"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function EmotionCalm() {
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

    // caanvas animation pour calm - vagues douces
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let time = 0;
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let y = 0; y < canvas.height; y += 20) {
                ctx.beginPath();
                ctx.moveTo(0, y);

                for (let x = 0; x < canvas.width; x += 10) {
                    // calcule la distance de la souris
                    const dx = mouseX - x;
                    const dy = mouseY - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // cree une onde en fonction de la distance de la souris
                    const mouseFactor = Math.max(0, 1 - distance / 300) * 15;
                    const wave =
                        Math.sin(x * 0.01 + time) * 10 +
                        mouseFactor * Math.sin(x * 0.02 + time * 1.5);

                    ctx.lineTo(x, y + wave);
                }

                // opacité des vagues en fonction de la position de la souris
                const dy = Math.abs(mouseY - y);
                const opacity =
                    0.03 +
                    (y / canvas.height) * 0.05 +
                    (dy < 100 ? ((100 - dy) / 100) * 0.1 : 0);

                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.stroke();
            }

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
            className="relative h-full w-full bg-gradient-to-b from-blue-600 to-teal-500 overflow-hidden"
        >
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* curseur  */}
            <motion.div
                className="absolute w-48 h-48 rounded-full bg-blue-200 mix-blend-screen opacity-30 pointer-events-none blur-xl"
                animate={{
                    x: mousePosition.x - 96,
                    y: mousePosition.y - 96,
                    scale: [1, 1.1, 1],
                    transition: {
                        x: { type: "spring", damping: 25, stiffness: 50 },
                        y: { type: "spring", damping: 25, stiffness: 50 },
                        scale: {
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
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
                        className="text-6xl font-light text-white mb-6 font-poppins tracking-widest"
                        animate={{
                            opacity: [0.8, 1, 0.8],
                            letterSpacing: ["0.15em", "0.2em", "0.15em"],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        Calme
                    </motion.h2>
                    <p className="text-xl text-white/90 leading-relaxed font-poppins font-light">
                        Le calme est cet état de tranquillité où l'esprit et le
                        corps trouvent leur équilibre. C'est un moment de pause
                        dans le tumulte quotidien, une respiration profonde qui
                        nous recentre. Laissez-vous bercer par ces vagues douces
                        et retrouvez votre sérénité intérieure.
                    </p>
                </motion.div>
            </div>

            {/* elements floatants */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-300 opacity-20"
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                }}
                transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 8,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-teal-200 opacity-20"
                animate={{
                    y: [0, 30, 0],
                    x: [0, -15, 0],
                }}
                transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 10,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-white opacity-10"
                animate={{
                    y: [0, 15, 0],
                    x: [0, -10, 0],
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
