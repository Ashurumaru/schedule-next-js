import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ScheduleCard from "@/components/ScheduleCard";
import { ScheduleEntry } from "@/types/schedule";
import { addDays, format, parse } from "date-fns";
import { ru } from "date-fns/locale";

export interface ScheduleGridProps {
    data: ScheduleEntry[] | null;
    isLoading: boolean;
    weekStart: string;
    onNavigate: (direction: "prev" | "next") => void;
}

export default function ScheduleGrid({
                                         data,
                                         isLoading,
                                         weekStart,
                                         onNavigate,
                                     }: ScheduleGridProps) {
    const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    const weekStartDate = new Date(weekStart);

    const formattedWeekRange = `${format(weekStartDate, "dd MMMM", { locale: ru })} – ${format(
        addDays(weekStartDate, 6),
        "dd MMMM yyyy",
        { locale: ru }
    )}`;

    // Функция для сортировки по времени
    const sortByTime = (entries: ScheduleEntry[]) => {
        return entries.sort((a, b) => {
            const timeA = parse(a.time.split(" ")[1], "HH:mm", new Date());
            const timeB = parse(b.time.split(" ")[1], "HH:mm", new Date());
            return timeA.getTime() - timeB.getTime();
        });
    };

    return (
        <div className="p-4 space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => onNavigate("prev")}
                >
                    ← Неделя назад
                </Button>
                <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
                    {`Расписание на неделю: ${formattedWeekRange}`}
                </span>
                <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => onNavigate("next")}
                >
                    Неделя вперёд →
                </Button>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
                {days.map((day, index) => {
                    const currentDate = addDays(weekStartDate, index);
                    const formattedDate = format(currentDate, "dd MMMM yyyy", { locale: ru });

                    if (isLoading) {
                        // Skeleton для загрузки
                        return (
                            <Card
                                key={day}
                                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col hover:shadow-lg transition"
                            >
                                <CardHeader className="bg-blue-100 dark:bg-blue-900 py-3 text-center">
                                    <Skeleton className="h-5 w-1/2 mx-auto" />
                                </CardHeader>
                                <CardContent className="flex-1 p-4 space-y-3">
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-6 w-2/3" />
                                </CardContent>
                            </Card>
                        );
                    }

                    const dayData = sortByTime(
                        data?.filter(
                            (entry) =>
                                entry.time.includes(day) &&
                                (entry.group || entry.individual)
                        ) || []
                    );

                    const isEmptyDay = dayData.length === 0;

                    return (
                        <Card
                            key={day}
                            className={`${
                                isEmptyDay
                                    ? "bg-gray-50 dark:bg-gray-800"
                                    : "bg-white dark:bg-gray-900 shadow-md"
                            } border border-gray-200 dark:border-gray-700 flex flex-col hover:shadow-lg transition`}
                        >
                            <CardHeader className="bg-blue-100 dark:bg-blue-900 py-3 text-center">
                                <CardTitle className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-300">
                                    {day}
                                </CardTitle>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    {formattedDate}
                                </p>
                            </CardHeader>
                            <CardContent className="flex-1 p-4 sm:p-6">
                                {isEmptyDay ? (
                                    <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                                        <span>Нет занятий</span>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {dayData.map((entry) => (
                                            <ScheduleCard
                                                key={entry.id}
                                                subject={entry.subject}
                                                time={entry.time}
                                                cabinet={{
                                                    id: entry.cabinetId || 0,
                                                    name: entry.cabinet || "Неизвестно",
                                                }}
                                                teacher={{
                                                    id: entry.teacherId || 0,
                                                    name: entry.teacher || "Неизвестно",
                                                }}
                                                group={
                                                    entry.groupId
                                                        ? {
                                                            id: entry.groupId,
                                                            name: entry.group || "Неизвестно",
                                                        }
                                                        : undefined
                                                }
                                                individuals={
                                                    entry.individualId
                                                        ? {
                                                            id: entry.individualId,
                                                            name: entry.individual || "Неизвестно",
                                                        }
                                                        : undefined
                                                }
                                            />
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
