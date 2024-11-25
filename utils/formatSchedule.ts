import { RawScheduleEntry, ScheduleEntry } from "@/types/schedule";

const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

function formatTime(date: Date): string {
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function formatSchedule(schedule: RawScheduleEntry[]): ScheduleEntry[] {
    return schedule.map((entry) => {
        const date = entry.Data ? new Date(entry.Data) : null;
        const dayOfWeek = date ? daysOfWeek[date.getDay()] : "Неизвестно";

        // Форматируем время
        const timeStart = entry.Time?.TimeStart ? formatTime(new Date(entry.Time.TimeStart)) : "??:??";
        const timeEnd = entry.Time?.TimeEnd ? formatTime(new Date(entry.Time.TimeEnd)) : "??:??";

        return {
            id: entry.ScheduleID,
            subject: entry.Subject?.SubjectName || "Без предмета",
            time: `${dayOfWeek}, ${timeStart} - ${timeEnd}`,
            cabinet: entry.Cabinet?.CabinetName || "Без кабинета",
            cabinetId: entry.Cabinet?.CabinetID || 0,
            teacher: entry.User_Schedule_TeacherIDToUser
                ? `${entry.User_Schedule_TeacherIDToUser.FirstName || ""} ${entry.User_Schedule_TeacherIDToUser.LastName || ""}`.trim()
                : "Без преподавателя",
            teacherId: entry.User_Schedule_TeacherIDToUser?.UserID || 0,
            group: entry.Group?.GroupName || "Без группы",
            groupId: entry.Group?.GroupID || 0,
        };
    });
}
