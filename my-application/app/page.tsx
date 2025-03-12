"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import EmotionJoy from "@/components/emotion-joy";
import EmotionSurprise from "@/components/emotion-surprise";
import EmotionCalm from "@/components/emotion-calm";
import EmotionNav from "@/components/emotion-nav";

export default function Home() {
    const [currentEmotion, setCurrentEmotion] = useState<number>(0);
    const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsIntroComplete(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const emotions = [
        { id: 0, name: "Joie", component: <EmotionJoy /> },
        { id: 1, name: "Surprise", component: <EmotionSurprise /> },
        { id: 2, name: "Calme", component: <EmotionCalm /> },
    ];

    return (
        <main className="h-screen w-full overflow-hidden">
            <AnimatePresence>
                {!isIntroComplete ? (
                    <motion.div
                        key="intro"
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-center"
                        >
                            <motion.h1
                                className="text-5xl font-bold text-white mb-2 font-poppins"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                The Mood Studio
                            </motion.h1>
                            <motion.p
                                className="text-xl text-white/80 font-poppins"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.9, duration: 0.8 }}
                            >
                                Explorez vos émotions
                            </motion.p>
                        </motion.div>
                    </motion.div>
                ) : (
                    <div className="relative h-full w-full">
                        <EmotionNav
                            emotions={emotions.map((e) => e.name)}
                            currentEmotion={currentEmotion}
                            setCurrentEmotion={setCurrentEmotion}
                        />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentEmotion}
                                className="h-full w-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {emotions[currentEmotion].component}
                            </motion.div>
                        </AnimatePresence>

                        {currentEmotion < emotions.length - 1 && (
                            <motion.div
                                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
                                initial={{ y: 0 }}
                                animate={{ y: [0, 10, 0] }}
                                transition={{
                                    repeat: Number.POSITIVE_INFINITY,
                                    duration: 1.5,
                                }}
                                onClick={() =>
                                    setCurrentEmotion((prev) =>
                                        Math.min(prev + 1, emotions.length - 1)
                                    )
                                }
                            >
                                <ChevronDown className="h-10 w-10 text-white drop-shadow-lg" />
                            </motion.div>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
