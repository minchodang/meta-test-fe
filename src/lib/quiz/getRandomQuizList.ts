import crypto from 'crypto';
import { QuizTestLevel } from '@src/types/api/test';
import quizJson from 'json/korean_list.json';

export interface GetRandomQuizListParameter {
    difficulty?: QuizTestLevel;
}

export interface GetRandomQuizList {
    id: number;
    word: string;
}

export const getRandomQuizList = ({
    difficulty = 'beginner',
}: GetRandomQuizListParameter): GetRandomQuizList[] => {
    const quizList: Omit<GetRandomQuizList, 'id'>[] = [...quizJson];
    let numQuizzes: number;

    switch (difficulty) {
        case 'beginner':
            numQuizzes = 10;
            break;
        case 'intermediate':
            numQuizzes = 20;
            break;
        case 'advanced':
            numQuizzes = 30;
            break;
        default:
            numQuizzes = 10;
    }

    const shuffledQuizList = quizList.sort(() => Math.random() - 0.5);
    const randomQuizList = shuffledQuizList.slice(0, numQuizzes).map((quiz) => ({
        ...quiz,
        id: parseInt(crypto.randomBytes(4).toString('hex'), 16),
    }));

    return randomQuizList;
};
