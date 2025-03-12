"use client";

import { useEffect, useRef } from "react";

interface SpecialSoundEffectsProps {
    emotionType: "joy" | "surprise" | "calm";
    trigger?: boolean;
}

export default function SpecialSoundEffects({
    emotionType,
    trigger = false,
}: SpecialSoundEffectsProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // url des effets sonores spéciaux
    const soundEffects = {
        joy: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CRWDCheer_Cris%20et%20applaudissements%20d%20ados%202%20%28ID%200237%29_LS-G5lTcxvmd0909HMyYDwWoZ43RnfP2w.wav", // applaudissements
        surprise:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/funny-sound-effect-for-quotjack-in-the-boxquot-sound-ver1-110923-c14ah1zOlCRprS5dY74JdW7ITElo1S.mp3", // son très funny
        calm: "",
    };

    useEffect(() => {
        // crée l'élément audio mais ne pas le jouer automatiquement
        audioRef.current = new Audio(soundEffects[emotionType]);
        audioRef.current.volume = 0.7;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [emotionType]);

    // joue le son quand le trigger change à true
    useEffect(() => {
        if (trigger && audioRef.current && soundEffects[emotionType]) {
            audioRef.current.currentTime = 0; // remet à zéro pour pouvoir rejouer
            audioRef.current
                .play()
                .catch((e) => console.error("Erreur de lecture audio:", e));
        }
    }, [trigger, emotionType]);

    return null; // ce composant ne rend rien visuellement
}
