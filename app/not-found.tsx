"use client";

import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-6">
            <h1 className="text-8xl font-extrabold text-gray-800 tracking-tight">
                404
            </h1>
            <p className="text-lg text-gray-600 mt-4 text-center max-w-lg">
                Упс! Страница, которую вы ищете, не существует. Возможно, она была
                удалена, или вы ввели неверный URL.
            </p>
            <Button
                className="mt-6 px-6 py-3 text-lg font-medium"
                onClick={() => window.location.assign("/")}
            >
                На главную
            </Button>
        </div>
    );
}
