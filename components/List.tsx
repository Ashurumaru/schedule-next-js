"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ListItem, ScheduleType } from "@/types/schedule";
import { getTypeLabel, ValidType } from "@/utils/typeLabels";

export interface ListProps {
    data: ListItem[];
    type: ScheduleType;
}

export default function List({ data, type }: ListProps) {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const typeLabel = getTypeLabel(type as ValidType);
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        setSearch(e.target.value);
        setTimeout(() => setLoading(false), 300); // Симуляция задержки
    };

    return (
        <div className="space-y-6">
            <Input
                placeholder={`Найти ${typeLabel}`}
                value={search}
                onChange={handleSearch}
                className="w-full"
            />
            {loading && (
                <p className="text-center text-gray-500">Загрузка...</p>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <Card
                            key={item.id}
                            className="cursor-pointer hover:shadow-lg hover:scale-105 transition transform"
                            onClick={() =>
                                window.location.assign(`/${type}/${item.id}`)
                            }
                        >
                            <CardContent className="p-4">
                                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                    {item.name}
                                </h3>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        Ничего не найдено
                    </p>
                )}
            </div>
        </div>
    );
}
