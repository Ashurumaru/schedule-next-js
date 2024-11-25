"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export interface ScheduleCardProps {
    subject: string;
    time: string;
    cabinet: { id: number; name: string };
    teacher: { id: number; name: string };
    group?: { id: number; name: string };
    individuals?: { id: number; name: string };
}

export default function ScheduleCard({
                                         subject,
                                         time,
                                         cabinet,
                                         teacher,
                                         group,
                                         individuals,
                                     }: ScheduleCardProps) {
    return (
        <Card className="bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition rounded-lg shadow p-4">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-blue-600 dark:text-blue-300 truncate">
                    {subject}
                </CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
                <p className="text-gray-500 dark:text-gray-400">{time}</p>
                <p>
                    Аудитория:{" "}
                    <Link
                        href={`/cabinets/${cabinet.id}`}
                        className="text-blue-500 dark:text-blue-400 hover:underline"
                    >
                        {cabinet.name}
                    </Link>
                </p>
                <p>
                    Преподаватель:{" "}
                    <Link
                        href={`/teachers/${teacher.id}`}
                        className="text-blue-500 dark:text-blue-400 hover:underline"
                    >
                        {teacher.name}
                    </Link>
                </p>
                {group ? (
                    <p>
                        Группа:{" "}
                        <Link
                            href={`/groups/${group.id}`}
                            className="text-blue-500 dark:text-blue-400 hover:underline"
                        >
                            {group.name}
                        </Link>
                    </p>
                ) : individuals ? (
                    <p>
                        Студент:{" "}
                        <Link
                            href={`/individuals/${individuals.id}`}
                            className="text-blue-500 dark:text-blue-400 hover:underline"
                        >
                            {individuals.name}
                        </Link>
                    </p>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">Нет информации о группе или студенте</p>
                )}
            </CardContent>
        </Card>
    );
}
