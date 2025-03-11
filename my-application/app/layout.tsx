import type React from "react";
import "./globals.css";
import type { Metadata } from "next";

// Importer la police Poppins
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "The Mood Studio",
    description: "Explorez vos émotions à travers des expériences interactives",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className={`${poppins.variable} font-sans`}>{children}</body>
        </html>
    );
}
