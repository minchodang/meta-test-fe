export type QuizTestLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';

export interface GetUserTestResponse {
    total_words: string[];
    total_count: number;
    correct_words: string[];
    input_words: string[];
    level: QuizTestLevel;
    expected_count: number;
    category: string;
    score: number;
    createdAt: string | Date;
    id: string;
    sort_key: string;
}

export interface PostTestResultResponse {
    id: string;
    sort_key: string;
}
