'use client';

import { FC } from 'react';
import RefreshIcon from '@src/components/common/Icons/RefreshIcon';
import ShareIcon from '@src/components/common/Icons/ShareIcon';
import { useRouter } from 'next/navigation';

interface QuizResultFooterProps {}

const QuizResultFooter: FC<QuizResultFooterProps> = () => {
    const { replace } = useRouter();

    const onClickRefreshIcon = () => {
        replace('/');
    };
    const onClickShareIcon = () => {};

    return (
        <footer className="fixed bottom-4 left-0 flex w-full justify-between">
            <div
                onClick={onClickRefreshIcon}
                className="container flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-violet-400"
            >
                <RefreshIcon />
            </div>
            <div
                onClick={onClickShareIcon}
                className="container flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-violet-400"
            >
                <ShareIcon />
            </div>
        </footer>
    );
};

export default QuizResultFooter;
