"use client";

import React from "react";
import { useSchedule } from "@/hooks/useSchedule";
import ScheduleGrid from "@/components/ScheduleGrid";
import { ScheduleEntry, ScheduleType } from "@/types/schedule";

export interface ScheduleClientProps {
    initialData: ScheduleEntry[];
    weekStart: string;
    type: ScheduleType;
    id: string;
}

export default function ScheduleClient({
                                           initialData,
                                           weekStart,
                                           type,
                                           id,
                                       }: ScheduleClientProps) {
    const apiUrl = `/api/schedule?type=${type}&id=${id}`;
    const { scheduleData, weekStartISO, isLoading, navigateWeek } = useSchedule(
        initialData,
        weekStart,
        apiUrl
    );

    return (
        <ScheduleGrid
            data={scheduleData}
            isLoading={isLoading}
            weekStart={weekStartISO}
            onNavigate={navigateWeek}
        />
    );
}
