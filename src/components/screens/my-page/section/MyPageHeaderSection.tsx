'use client';

import { FC } from 'react';
import { API_GET_USER_PROFILE } from '@src/api/getUserProfile';
import Button from '@src/components/common/Button';
import HomeIcon from '@src/components/common/Icons/HomeIcon';
import { ToastService } from '@src/service/ToastService';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

interface MyPageHeaderSectionProps {
    isLogin: boolean;
}

const MyPageHeaderSection: FC<MyPageHeaderSectionProps> = ({ isLogin }) => {
    const [, , removeCookies] = useCookies(['refreshToken']);
    const queryClient = useQueryClient();
    const toastService = ToastService.getInstance();
    const { replace } = useRouter();
    const onClickHome = () => {
        replace('/');
    };
    const onClickLogout = async () => {
        await removeCookies('refreshToken');
        await queryClient.removeQueries({
            queryKey: [API_GET_USER_PROFILE],
        });
        await toastService.addToast('로그아웃 되었습니다.');
        replace('/');
    };

    return (
        <section className="relative">
            <div className="flex w-full justify-between">
                <div
                    onClick={onClickHome}
                    className="h-15 w-15 flex cursor-pointer items-center justify-center rounded-md shadow-md"
                >
                    <HomeIcon />
                </div>
                <h1
                    className="
                  flex 
                  max-w-3xl
                  items-center
                  justify-center
                  text-center text-2xl font-bold 
                  "
                >
                    마이페이지
                </h1>
                <div className="w-34">
                    {isLogin ? (
                        <Button variant="primary-unselect" type="button" onClick={onClickLogout}>
                            로그아웃
                        </Button>
                    ) : null}
                </div>
            </div>
            <hr
                className="absolute -bottom-5  -left-5 h-1 w-screen
            max-w-3xl
            bg-violet-400"
            />
        </section>
    );
};

export default MyPageHeaderSection;
