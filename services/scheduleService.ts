import prisma from "@/prisma/prisma";
import fieldMapping from "@/utils/fieldMapping";
import { addWeeks } from "date-fns";
import { ValidType } from "@/utils/typeLabels";

export async function fetchSchedule(type: string, id: string, weekStart: Date) {
    const weekEnd = addWeeks(weekStart, 1);

    return prisma.schedule.findMany({
        where: {
            [fieldMapping[type as keyof typeof fieldMapping]]: Number(id),
            Data: {
                gte: weekStart,
                lt: weekEnd,
            },
        },
        include: {
            Subject: true,
            Time: true,
            Cabinet: true,
            Group: true,
            User_Schedule_StudentIDToUser: {
               select: {
                   UserID: true,
                   FirstName: true,
                   LastName: true,
               }
            },
            User_Schedule_TeacherIDToUser: {
                select: {
                    UserID: true,
                    FirstName: true,
                    LastName: true,
                },
            },
        },
    });
}

// Функция для получения названия объекта по его типу и id
export async function fetchEntityNameById(type: ValidType, id: number) {
    switch (type) {
        case "groups":
            const group = await prisma.group.findUnique({
                where: {
                    GroupID: id,
                },
                select: {
                    GroupName: true,
                },
            });
            return group?.GroupName || "Без названия";

        case "teachers":
            const teacher = await prisma.user.findUnique({
                where: {
                    UserID: id,
                },
                select: {
                    FirstName: true,
                    LastName: true,
                },
            });
            return teacher
                ? `${teacher.FirstName || ""} ${teacher.LastName || ""}`.trim() || "Без имени"
                : "Без имени";

        case "individuals":
            const student = await prisma.user.findUnique({
                where: {
                    UserID: id,
                },
                select: {
                    FirstName: true,
                    LastName: true,
                },
            });
            return student
                ? `${student.FirstName || ""} ${student.LastName || ""}`.trim() || "Без имени"
                : "Без имени";

        case "cabinets":
            const cabinet = await prisma.cabinet.findUnique({
                where: {
                    CabinetID: id,
                },
                select: {
                    CabinetName: true,
                },
            });
            return cabinet?.CabinetName || "Без названия";

        default:
            throw new Error("Invalid type");
    }
}

export async function fetchData(type: ValidType) {
    switch (type) {
        case "groups":
            const groups = await prisma.group.findMany({
                select: {
                    GroupID: true,
                    GroupName: true,
                },
            });
            return groups.map((group) => ({
                id: group.GroupID,
                name: group.GroupName || "Без названия",
            }));

        case "teachers":
            const teachers = await prisma.user.findMany({
                where: { Status: { StatusName: "Teacher" } },
                select: {
                    UserID: true,
                    FirstName: true,
                    LastName: true,
                },
            });
            return teachers.map((teacher) => ({
                id: teacher.UserID,
                name: `${teacher.FirstName || ""} ${teacher.LastName || ""}`.trim() || "Без имени",
            }));

        case "individuals":
            const individuals = await prisma.user.findMany({
                where: {Status: { StatusName: "Student"} },
                select: {
                    UserID: true,
                    FirstName: true,
                    LastName: true,
                }
            });
            return individuals.map((individual) => ({
                id: individual.UserID,
                name: `${individual.FirstName || ""} ${individual.LastName || ""}`.trim() || "Без имени",
            }));

        case "cabinets":
            const cabinets = await prisma.cabinet.findMany({
                select: {
                    CabinetID: true,
                    CabinetName: true,
                },
            });
            return cabinets.map((cabinet) => ({
                id: cabinet.CabinetID,
                name: cabinet.CabinetName || "Без названия",
            }));

        default:
            throw new Error("Invalid type");
    }
}