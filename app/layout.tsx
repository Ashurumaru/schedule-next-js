import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

// Подключение шрифтов
const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Расписание Цифровой ветер",
    description: "Расписание занятий для цифрового ветра",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body
            className={cn(
                geistSans.variable,
                geistMono.variable,
                "antialiased min-h-screen bg-gray-50 text-gray-800"
            )}
        >
        <Header />

        {/* Основной контент */}
        <main className="container mx-auto py-14 px-6 lg:px-10">
            <section className="rounded-xl bg-white shadow-2xl p-4">
                {children}
            </section>
        </main>
        </body>
        </html>
    );
}

