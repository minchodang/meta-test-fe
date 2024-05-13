'use client';

import { FC } from 'react';
import Button from '@src/components/common/Button';
import QuizResultHistoryGraphCard from '@src/components/common/quiz-result/QuizResultHistoryGraphCard';
import QuizResultRankingCard from '@src/components/common/quiz-result/QuizResultRankingCard';
import { useRouter } from 'next/navigation';

interface QuizResultHistorySectionProps {
    isLoginSns: boolean;
}

const QuizResultHistorySection: FC<QuizResultHistorySectionProps> = ({ isLoginSns }) => {
    const { push } = useRouter();
    const onClick = () => {
        push('/my-page');
    };
    return (
        <section className="mt-8 flex flex-col">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">기록</h1>
                {isLoginSns && (
                    <div>
                        <Button variant="primary" onClick={onClick}>
                            마이페이지
                        </Button>
                    </div>
                )}
            </div>
            <QuizResultHistoryGraphCard isLoginSns={isLoginSns} />
        </section>
    );
};

export default QuizResultHistorySection;
