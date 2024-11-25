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