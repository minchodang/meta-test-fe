'use client';

import { FC } from 'react';
import RefreshIcon from '@src/components/common/Icons/RefreshIcon';
import ShareIcon from '@src/components/common/Icons/ShareIcon';
import { useRouter } from 'next/navigation';
import { ToastService } from '@src/service/ToastService';

interface QuizResultFooterProps {}

const QuizResultFooter: FC<QuizResultFooterProps> = () => {
    const toastService = ToastService.getInstance();
    const { replace } = useRouter();

    const onClickShareIcon = () => {
        navigator
            .share({
                title: '메타 인지 테스트',
                text: '메타 인지를 테스트 해 보세요.',
                url: 'https://meta-cognition.site/',
            })
            .then(() => {
                toastService.addToast('공유가 완료되었습니다.');
            })
            .catch(() => {
                toastService.addToast('공유가 실패했습니다. 잠시후 다시 시도해 주세요.');
            });
    };

    return (
        <footer className="fixed bottom-4 left-0 flex w-full justify-between">
            <div
                onClick={() => replace('/')}
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
