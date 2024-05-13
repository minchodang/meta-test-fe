'use client';

import React, { FC, useCallback, useMemo } from 'react';
import Button from '@src/components/common/Button';
import { ModalService } from '@src/service/ModalService';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import HomeLoginModalScreen from '../components/login/HomeLoginModalScreen';

const HomeHeaderButton: FC = () => {
    const [cookie] = useCookies(['refreshToken']);
    const { push } = useRouter();
    const modalService = ModalService.getInstance();
    const token = cookie.refreshToken;

    const isLogin = useMemo(() => !!token, [token]);

    const onClickLoginButton = useCallback(() => {
        if (isLogin) {
            push('/my-page');
            return;
        }
        modalService.openModal(<HomeLoginModalScreen />);
    }, [isLogin, modalService, push]);

    return (
        <div>
            <Button onClick={onClickLoginButton} variant="secondary">
                <span>{isLogin ? '마이페이지' : '로그인 / 회원가입'}</span>
            </Button>
        </div>
    );
};

export default React.memo(HomeHeaderButton);
