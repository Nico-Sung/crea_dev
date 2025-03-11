"use client";

import { motion } from "framer-motion";

interface EmotionNavProps {
    emotions: string[];
    currentEmotion: number;
    setCurrentEmotion: (index: number) => void;
}

export default function EmotionNav({
    emotions,
    currentEmotion,
    setCurrentEmotion,
}: EmotionNavProps) {
    return (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-4 px-6 py-3 rounded-full bg-black/20 backdrop-blur-md">
            {emotions.map((emotion, index) => {
                let buttonStyle =
                    "relative px-4 py-2 text-white font-medium font-poppins cursor-pointer ";

                if (index === 0) {
                    // Joie
                    buttonStyle += " font-extrabold";
                } else if (index === 1) {
                    // Surprise
                    buttonStyle += " italic";
                } else if (index === 2) {
                    // Calme
                    buttonStyle += " font-light tracking-wider";
                }

                return (
                    <button
                        key={emotion}
                        onClick={() => setCurrentEmotion(index)}
                        className={buttonStyle}
                    >
                        {currentEmotion === index && (
                            <motion.div
                                layoutId="activeEmotion"
                                className="absolute inset-0 rounded-full bg-white/20"
                                transition={{ type: "spring", duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{emotion}</span>
                    </button>
                );
            })}
        </div>
    );
}
