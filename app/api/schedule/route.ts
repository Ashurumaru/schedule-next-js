// app/api/schedule/route.ts
import { NextResponse } from "next/server";
import { fetchSchedule } from "@/services/scheduleService";
import { formatSchedule } from "@/utils/formatSchedule";
import fieldMapping from "@/utils/fieldMapping";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");
    const weekStart = searchParams.get("weekStart");

    if (!type || !id || !weekStart) {
        return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    if (!(type in fieldMapping)) {
        return NextResponse.json({ error: "Invalid 'type' parameter" }, { status: 400 });
    }

    const startDate = new Date(weekStart);
    if (isNaN(startDate.getTime())) {
        return NextResponse.json({ error: "Invalid date format for 'weekStart'" }, { status: 400 });
    }

    try {
        const schedule = await fetchSchedule(type, id, startDate);

        const formattedSchedule = formatSchedule(schedule);

        return NextResponse.json(formattedSchedule);
    } catch (error) {
        console.error("Error fetching schedule:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
