import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchData } from "@/services/scheduleService";
import { typeLabels, ValidType, getTypeLabel } from "@/utils/typeLabels";
import List from "@/components/List";

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ type: string }>;
}): Promise<Metadata> {
    const { type } = await params;

    if (!(type in typeLabels)) {
        return {
            title: "Страница не найдена",
        };
    }

    const typeLabel = getTypeLabel(type as ValidType);

    return {
        title: `Список: ${typeLabel}`,
        description: `Просмотрите список всех ${typeLabel.toLowerCase()} доступных на платформе.`,
    };
}

export default async function TypePage({
                                           params,
                                       }: {
    params: Promise<{ type: string }>;
}) {
    const { type } = await params;

    if (!(type in typeLabels)) {
        notFound();
    }

    const data = await fetchData(type as ValidType);
    const typeLabel = getTypeLabel(type as ValidType);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold capitalize mb-6 text-gray-800 dark:text-gray-100">
                {typeLabel}
            </h1>
            <List data={data} type={type as ValidType} />
        </div>
    );
}
