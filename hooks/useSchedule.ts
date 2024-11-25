// hooks/useSchedule.ts
import { useState } from "react";
import { addWeeks, formatISO } from "date-fns";
import { ScheduleEntry } from "@/types/schedule";

export function useSchedule(
    initialData: ScheduleEntry[],
    initialWeekStart: string,
    apiUrl: string
) {
    const [weekStartISO, setWeekStartISO] = useState(initialWeekStart);
    const [scheduleData, setScheduleData] = useState<ScheduleEntry[]>(initialData);
    const [isLoading, setIsLoading] = useState(false);

    async function navigateWeek(direction: "prev" | "next") {
        setIsLoading(true);

        const newWeekStart = formatISO(
            addWeeks(new Date(weekStartISO), direction === "prev" ? -1 : 1),
            { representation: "date" }
        );
        setWeekStartISO(newWeekStart);

        const response = await fetch(`${apiUrl}&weekStart=${newWeekStart}`);
        const newData: ScheduleEntry[] = await response.json(); // Предполагаем, что API возвращает ScheduleEntry[]

        setScheduleData(newData);
        setIsLoading(false);
    }

    return {
        scheduleData,
        weekStartISO,
        isLoading,
        navigateWeek,
    };
}
