export const typeLabels = {
    groups: "Группы",
    teachers: "Преподаватели",
    cabinets: "Кабинеты",
} as const;

export type ValidType = keyof typeof typeLabels;

export function getTypeLabel(type: ValidType): string {
    return typeLabels[type];
}