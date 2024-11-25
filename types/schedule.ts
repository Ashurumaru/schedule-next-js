// types/schedule.ts

// Общий тип для элементов списка (группы, преподаватели, кабинеты)
export interface ListItem {
    id: number;
    name: string;
}

// Тип для необработанных данных расписания из базы
export interface RawScheduleEntry {
    ScheduleID: number;
    Data: Date | null;
    Subject?: {
        SubjectID: number;
        SubjectName: string | null;
    } | null;
    Time?: {
        TimeID: number;
        TimeStart: Date | null;
        TimeEnd: Date | null;
    } | null;
    Cabinet?: {
        CabinetID: number;
        CabinetName: string | null;
    } | null;
    Group?: {
        GroupID: number;
        GroupName: string | null;
    } | null;
    User_Schedule_TeacherIDToUser?: {
        UserID: number;
        FirstName: string | null;
        LastName: string | null;
    } | null;
    User_Schedule_StudentIDToUser?: {
        UserID: number;
        FirstName: string | null;
        LastName: string | null;
    } | null;
}




// Тип для обработанных (отформатированных) данных расписания
export interface ScheduleEntry {
    id: number;
    subject: string;
    time: string;
    cabinet: string;
    cabinetId: number;
    individual?: string;
    individualId?: number;
    teacher?: string;
    teacherId?: number;
    group?: string;
    groupId?: number;
}


// Типы, допустимые для расписания
export type ScheduleType = "groups" | "teachers" | "cabinets" | "individuals";
