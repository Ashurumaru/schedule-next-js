import { startOfWeek, formatISO } from "date-fns";
import ScheduleClient from "@/components/ScheduleClient";
import { fetchEntityNameById, fetchSchedule} from "@/services/scheduleService";
import { formatSchedule } from "@/utils/formatSchedule";
import { ScheduleType } from "@/types/schedule";

export default async function SchedulePage({
                                               params,
                                           }: {
    params: Promise<{ type: string; id: string }>;
}) {
    const { type, id } = await params;

    const validTypes = ["groups", "teachers", "cabinets", "individuals"];
    if (!validTypes.includes(type)) {
        throw new Error("Invalid type");
    }

    const validatedType = type as ScheduleType;

    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const formattedWeekStart = formatISO(weekStart, { representation: "date" });

    try {
        const schedule = await fetchSchedule(validatedType, id, weekStart);

        const entityName = await fetchEntityNameById(validatedType, Number(id));

        const initialData = formatSchedule(schedule);

        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Расписание:{" "}
                    {validatedType === "groups"
                        ? "Группа"
                        : validatedType === "teachers"
                            ? "Преподаватель"
                            : validatedType === "individuals"
                                ? "Студент"
                                : "Кабинет"}{" "}
                    {entityName}
                </h1>
                <ScheduleClient
                    initialData={initialData}
                    weekStart={formattedWeekStart}
                    type={validatedType}
                    id={id}
                />
            </div>
        );
    } catch (error) {
        console.error("Error fetching schedule:", error);
        throw new Error("Ошибка при получении расписания");
    }
}
