"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <header className="w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
                {/* Логотип */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Расписание
                </h1>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    <Link
                        href="/groups"
                        className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                        Группы
                    </Link>
                    <Link
                        href="/teachers"
                        className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                        Преподаватели
                    </Link>
                    <Link
                        href="/cabinets"
                        className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                        Кабинеты
                    </Link>
                </nav>

                {/* Mobile Hamburger Menu */}
                <div className="md:hidden">
                    <Button
                        variant="outline"
                        className="p-2"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-900 dark:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                    <ul className="flex flex-col space-y-4 py-4 px-6">
                        <li>
                            <Link
                                href="/groups"
                                className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Группы
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/teachers"
                                className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Преподаватели
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/cabinets"
                                className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Кабинеты
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
