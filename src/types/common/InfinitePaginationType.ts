export type InfinitePaginationDataType<K extends string, T> = {
    [key in K]: T[];
} & {
    count: number;
    lastEvaluatedKey: string;
};
