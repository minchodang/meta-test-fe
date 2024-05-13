'use client';

import { FC, useMemo, useState } from 'react';
import { API_GET_USER_PROFILE, getUserProfile } from '@src/api/getUserProfile';
import { API_GET_USER_TEST_LIST, getUserTestList } from '@src/api/getUserTestList';
import SelectBox, { SelectBoxOptionType } from '@src/components/common/SelectBox';
import HomeLoginModalScreen from '@src/components/screens/home/components/login/HomeLoginModalScreen';
import { ModalService } from '@src/service/ModalService';
import { QuizTestLevel } from '@src/types/api/test';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { QuizResultBarChart } from './QuizResultBarChart';

interface QuizResultHistoryGraphCardProps {
    isLoginSns: boolean;
}

const options: SelectBoxOptionType[] = [
    { id: 'all', label: '전체' },
    {
        id: 'beginner',
        label: '초급',
    },
    {
        id: 'intermediate',
        label: '중급',
    },
    {
        id: 'advanced',
        label: '고급',
    },
];
function isValidTestLevelType(value: unknown): value is QuizTestLevel {
    return (
        value === 'all' || value === 'beginner' || value === 'intermediate' || value === 'advanced'
    );
}

const QuizResultHistoryGraphCard: FC<QuizResultHistoryGraphCardProps> = () => {
    const [selectedLevel, setSelectedLevel] = useState<QuizTestLevel>('all');
    const { data: userData } = useQuery({
        queryKey: [API_GET_USER_PROFILE],
        queryFn: () => getUserProfile(),
    });
    const {
        data: chartData,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: [API_GET_USER_TEST_LIST, { level: selectedLevel }],
        queryFn: ({ pageParam }) =>
            getUserTestList({
                limit: 5,
                level: selectedLevel,
                order: 'desc',
                startKey: pageParam || undefined,
            }),
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.lastEvaluatedKey ?? undefined,
        enabled: !!userData?.id,
        staleTime: 0,
    });
    const modalService = ModalService.getInstance();
    const [token] = useCookies(['refreshToken']);

    const onClickLoginButton = () => {
        modalService.openModal(<HomeLoginModalScreen />);
    };

    const isLogin = useMemo(() => !!token, [token]);

    const onObserve = () => {
        if (hasNextPage) fetchNextPage();
    };

    return (
        <section className="relative mt-3 w-full rounded-md border border-none p-5 shadow-md">
            {!isLogin ? (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                    <button
                        onClick={onClickLoginButton}
                        className="cursor-pointer rounded-3xl bg-gray-500 px-4 py-2 text-white"
                    >
                        로그인하고 내 기록 확인하기
                    </button>
                </div>
            ) : null}
            <div className={`${isLogin ? '' : 'pointer-events-none opacity-50'}`}>
                <article className="flex w-full justify-between">
                    <h3 className="w-full">테스트 점수 기록</h3>
                    <div className="w-36">
                        <SelectBox
                            options={options}
                            onOptionChange={(e) => {
                                if (isValidTestLevelType(e.target.value)) {
                                    setSelectedLevel(e.target.value);
                                }
                            }}
                            selectedOption={selectedLevel}
                        />
                    </div>
                </article>
                <section className="h-80 w-full">
                    <QuizResultBarChart chartData={chartData} onObserve={onObserve} />
                </section>
            </div>
        </section>
    );
};

export default QuizResultHistoryGraphCard;
