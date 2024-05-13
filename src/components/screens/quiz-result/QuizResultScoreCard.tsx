'use client';

import { randomUUID } from 'crypto';
import { FC } from 'react';
import { API_GET_USER_PROFILE, getUserProfile } from '@src/api/getUserProfile';
import { API_GET_USER_TEST_DETAIL, getUserTestDetail } from '@src/api/getUserTestDetail';
import StarIcon from '@src/components/common/Icons/StarIcon';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

interface QuizResultScoreCardProps {}

interface StarIconFillRatioProps {
    totalScore: number;
    maxScore: number;
    index: number;
}

const getQuizResultText = ({ score }: { score?: number }) => {
    if (!score) {
        return '';
    }
    switch (true) {
        case score < 31:
            return '조금 더 노력해보세요~!';
        case score < 61:
            return '괜찮아요~';
        case score < 81:
            return '훌륭하네요!';
        default:
            return '메타인지 천재시군요?';
    }
};

const calculateFillRatio = ({ totalScore, maxScore, index }: StarIconFillRatioProps) => {
    if (!totalScore) {
        return 0;
    }
    const maxStars = 10;
    const scorePerStar = maxScore / maxStars;
    const currentStarScore = (index + 1) * scorePerStar;

    if (totalScore >= currentStarScore) {
        return 1; // 별 꽉 채우기
    }
    if (totalScore >= currentStarScore - scorePerStar) {
        return 0.5; // 별 반쪽 채우기
    }
    return 0; // 별 비우기
};

const QuizResultScoreCard: FC<QuizResultScoreCardProps> = () => {
    const queryParams = useSearchParams();
    const userProfileQuery = useQuery({
        queryKey: [API_GET_USER_PROFILE],
        queryFn: () => getUserProfile(),
    });

    const userTestQuery = useQuery({
        queryKey: [API_GET_USER_TEST_DETAIL],
        queryFn: () =>
            getUserTestDetail({
                id: queryParams.get('id') || '',
                sort_key: queryParams.get('sort_key') || '',
            }),
        enabled: !!queryParams.get('id') && !!queryParams.get('sort_key'),
    });

    return (
        <div
            className="
        mt-9
        flex
        w-full flex-col items-center justify-center rounded-lg pb-10 pl-3 pr-3 pt-5 shadow-md"
        >
            <span className="font-sans text-3xl font-bold">{userTestQuery.data?.score}점</span>
            <div className="mt-3 w-full">
                <div className="flex w-full">
                    {Array.from({ length: 10 }).map((value, index) => (
                        <StarIcon
                            fillRatio={calculateFillRatio({
                                totalScore: userTestQuery.data?.score ?? 0,
                                maxScore: 100,
                                index,
                            })}
                            key={crypto.randomUUID()}
                        />
                    ))}
                </div>
            </div>
            <span className="font-sans text-2xl font-bold">
                {getQuizResultText({ score: userTestQuery.data?.score })}
            </span>
        </div>
    );
};

export default QuizResultScoreCard;
