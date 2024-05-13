'use client';

import { FC } from 'react';
import { API_GET_USER_PROFILE, getUserProfile } from '@src/api/getUserProfile';
import RoundedButton from '@src/components/common/RoundedButton';
import Modal from '@src/components/common/modal/Modal';
import { ModalService } from '@src/service/ModalService';
import { UserAccountType } from '@src/types/api/Signs';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import GoogleIcon from 'public/my-page/google-login.png';
import KakaoIcon from 'public/my-page/kakao-login.png';
import MyPageInformationEditModalScreen from '../components/MyPageInformationEdit/MyPageInformationEditModalScreen';
import MyPagePasswordEditModalScreen from '../components/MyPagePasswordEdit/MyPagePasswordEditModalScreen';

interface MyPageUserInformationSectionProps {
    isLogin: boolean;
}

const MyPageUserInformationSection: FC<MyPageUserInformationSectionProps> = ({ isLogin }) => {
    const modalService = ModalService.getInstance();
    const userInformation = useQuery({
        queryKey: [API_GET_USER_PROFILE],
        queryFn: getUserProfile,
        enabled: !!isLogin,
    });

    const onClose = () => modalService.closeModal();

    const onClickEditInformationButton = () =>
        modalService.openModal(
            <Modal onClose={onClose}>
                <MyPageInformationEditModalScreen />
            </Modal>,
        );

    const onClickEditPasswordButton = () =>
        modalService.openModal(
            <Modal onClose={onClose}>
                <MyPagePasswordEditModalScreen />
            </Modal>,
        );

    const getSocialIcon = (socialType: UserAccountType) => {
        if (socialType === 'GOOGLE') return GoogleIcon;
        return KakaoIcon;
    };

    return (
        <section className="flex flex-col gap-5">
            <header className="flex  w-full justify-between">
                <section className="flex w-fit w-full items-center">
                    <h1 className="text-xl font-bold">내 정보</h1>
                </section>
                {isLogin ? (
                    <section className="flex gap-2">
                        {userInformation.data?.userType === 'NORMAL' ? (
                            <div className="w-max">
                                <RoundedButton
                                    variant="secondary"
                                    onClick={onClickEditPasswordButton}
                                >
                                    비밀번호변경
                                </RoundedButton>
                            </div>
                        ) : null}
                        <div className="w-max">
                            <RoundedButton variant="primary" onClick={onClickEditInformationButton}>
                                수정
                            </RoundedButton>
                        </div>
                    </section>
                ) : null}
            </header>
            <main className="flex h-28 flex-col gap-4 px-3 py-5 shadow-md">
                <section className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="max-w-fit phoneXs:text-xs">이메일</span>
                        <span className="max-w-fit phoneXs:text-xs">
                            {userInformation.data?.email}
                        </span>
                    </div>
                    <div>
                        {userInformation.data && userInformation.data?.userType !== 'NORMAL' ? (
                            <div className="flex h-full max-h-7 w-full max-w-7  border-amber-300">
                                <Image
                                    src={getSocialIcon(userInformation.data.userType)}
                                    alt="소셜 로그인 아이콘"
                                />
                            </div>
                        ) : null}
                    </div>
                </section>
                {userInformation.data?.nickname ? (
                    <section className="flex gap-3">
                        <span className="max-w-fit">닉네임</span>
                        <span>{userInformation.data?.nickname}</span>
                    </section>
                ) : null}
            </main>
        </section>
    );
};

export default MyPageUserInformationSection;
