import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GetUserTestResponse } from '@src/types/api/test';
import { InfinitePaginationDataType } from '@src/types/common/InfinitePaginationType';
import { InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Observer from '../hoc/Observer';

interface QuizResultBarChartProps {
    chartData?: InfiniteData<InfinitePaginationDataType<'items', GetUserTestResponse>>;
    onObserve: VoidFunction;
}

export const QuizResultBarChart: React.FC<QuizResultBarChartProps> = ({ chartData, onObserve }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    const smoothScrollTo = (targetX: number) => {
        if (!chartContainerRef.current) return;

        const startX = chartContainerRef.current.scrollLeft;
        const distance = targetX - startX;
        const duration = 500; // milliseconds

        let startTime: number;

        const animateScroll = (timestamp: number) => {
            if (!startTime) startTime = timestamp;

            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            if (chartContainerRef.current) {
                chartContainerRef.current.scrollLeft = startX + distance * progress;
            }

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    const handleScrollLeft = () => {
        if (chartContainerRef.current) {
            const targetX =
                chartContainerRef.current.scrollLeft - chartContainerRef.current.clientWidth * 0.5;
            smoothScrollTo(targetX);
        }
    };

    const handleScrollRight = () => {
        if (chartContainerRef.current) {
            const targetX =
                chartContainerRef.current.scrollLeft + chartContainerRef.current.clientWidth * 0.5;
            smoothScrollTo(targetX);
            onObserve();
        }
    };

    const handleScroll = useCallback(() => {
        const container = chartContainerRef.current;
        if (!container) return;

        const scrollPosition = container.scrollLeft + container.offsetWidth;
        const { scrollWidth } = container;

        if (scrollPosition >= scrollWidth) {
            onObserve();
        }
    }, [onObserve]);

    return (
        <div className="flex h-80 w-full">
            <div
                className="mr-4 flex cursor-pointer flex-col justify-center"
                onClick={handleScrollLeft}
            >
                ◀
            </div>
            {chartData && chartData.pages[0].count > 0 ? (
                <>
                    <div>
                        <BarChart
                            width={70}
                            height={300}
                            data={chartData?.pages.flatMap((chart) => chart.items)}
                            barSize={10}
                            barGap={10}
                        >
                            <YAxis display={3} dataKey="score" />
                        </BarChart>
                    </div>
                    <div
                        style={{
                            width: 550,
                            height: 300,
                            overflow: 'auto',
                            scrollbarWidth: 'none' /* Firefox */,
                            msOverflowStyle: 'none',
                        }}
                        onScroll={handleScroll}
                        ref={chartContainerRef}
                    >
                        <ResponsiveContainer width={550} height={300}>
                            <BarChart
                                width={550}
                                height={300}
                                data={chartData?.pages.flatMap((chart) => chart.items)}
                                barSize={10}
                                barGap={500}
                            >
                                <XAxis dataKey="createdAt" />
                                <Tooltip />
                                <Bar
                                    width={25}
                                    barSize={10}
                                    dataKey="score"
                                    fill="#8884d8"
                                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                                />
                                {/* Observer 컴포넌트를 차트 끝에 배치 */}
                                <Observer onObserve={onObserve} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </>
            ) : null}
            {chartData && chartData.pages[0].count === 0 ? (
                <span className="justify- flex h-full w-full items-center justify-center">
                    현재 레벨에 해당하는 결과가 없습니다.
                </span>
            ) : null}
            <div
                className="ml-4 flex cursor-pointer flex-col justify-center "
                onClick={handleScrollRight}
            >
                ▶
            </div>
        </div>
    );
};
