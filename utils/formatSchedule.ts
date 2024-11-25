import { RawScheduleEntry, ScheduleEntry } from "@/types/schedule";

const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

function formatTime(date: Date | null): string {
    if (!date) return "??:??";
    return `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
}

export function formatSchedule(schedule: RawScheduleEntry[]): ScheduleEntry[] {
    return schedule.map((entry) => {
        const date = entry.Data ? new Date(entry.Data) : null;
        const dayOfWeek = date ? daysOfWeek[date.getDay()] : "Неизвестно";

        const timeStart = formatTime(entry.Time?.TimeStart ? new Date(entry.Time.TimeStart) : null);
        const timeEnd = formatTime(entry.Time?.TimeEnd ? new Date(entry.Time.TimeEnd) : null);

        const teacher = entry.User_Schedule_TeacherIDToUser
            ? `${entry.User_Schedule_TeacherIDToUser.FirstName || ""} ${entry.User_Schedule_TeacherIDToUser.LastName || ""}`.trim()
            : "Без преподавателя";

        const individual = entry.User_Schedule_StudentIDToUser
            ? `${entry.User_Schedule_StudentIDToUser.FirstName || ""} ${entry.User_Schedule_StudentIDToUser.LastName || ""}`.trim()
            : "Без преподавателя";

        return {
            id: entry.ScheduleID,
            subject: entry.Subject?.SubjectName || "Без предмета",
            time: `${dayOfWeek}, ${timeStart} - ${timeEnd}`,
            cabinet: entry.Cabinet?.CabinetName || "Без кабинета",
            cabinetId: entry.Cabinet?.CabinetID || 0,
            teacher: teacher,
            teacherId: entry.User_Schedule_TeacherIDToUser?.UserID || 0,
            group: entry.Group?.GroupName || "Без группы",
            groupId: entry.Group?.GroupID || 0,
            individual: individual,
            individualId: entry.User_Schedule_StudentIDToUser?.UserID || 0,
        };
    });
}
