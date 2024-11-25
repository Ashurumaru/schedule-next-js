import { startOfWeek, formatISO } from "date-fns";
import ScheduleClient from "@/components/ScheduleClient";
import { fetchSchedule } from "@/services/scheduleService";
import { formatSchedule } from "@/utils/formatSchedule";
import { ScheduleType } from "@/types/schedule";

export default async function SchedulePage({
                                               params,
                                           }: {
    params: Promise<{ type: string; id: string }>;
}) {
    const { type, id } = await params;

    // Проверяем валидность типа
    const validTypes = ["groups", "teachers", "cabinets"];
    if (!validTypes.includes(type)) {
        throw new Error("Invalid type");
    }

    // Приведение к ScheduleType
    const validatedType = type as ScheduleType;

    // Вычисляем начало недели
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Понедельник
    const formattedWeekStart = formatISO(weekStart, { representation: "date" });

    try {
        // Получаем расписание с данными
        const schedule = await fetchSchedule(validatedType, id, weekStart);

        const entityName =
            schedule.length > 0
                ? validatedType === "groups"
                    ? schedule[0].Group?.GroupName
                    : validatedType === "teachers"
                        ? `${schedule[0].User_Schedule_TeacherIDToUser?.FirstName || ""} ${
                            schedule[0].User_Schedule_TeacherIDToUser?.LastName || ""
                        }`.trim()
                        : schedule[0].Cabinet?.CabinetName
                : "Нет данных";

        const initialData = formatSchedule(schedule);

        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Расписание:{" "}
                    {validatedType === "groups"
                        ? "Группа"
                        : validatedType === "teachers"
                            ? "Преподаватель"
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
