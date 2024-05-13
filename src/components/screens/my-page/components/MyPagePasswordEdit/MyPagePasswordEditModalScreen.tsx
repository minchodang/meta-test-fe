import { FC } from 'react';
import { API_GET_USER_PROFILE, getUserProfile } from '@src/api/getUserProfile';
import { patchUsers } from '@src/api/patchUsers';
import { ModalService } from '@src/service/ModalService';
import { ToastService } from '@src/service/ToastService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { FormProvider, useForm } from 'react-hook-form';
import MyPagePasswordEditNewPasswordConfirmInput from './MyPagePasswordEditNewPasswordConfirmInput';
import MyPagePasswordEditNewPasswordInput from './MyPagePasswordEditNewPasswordInput';
import MyPagePasswordEditSubmitButton from './MyPagePasswordEditSubmitButton';

interface MyPagePasswordEditModalScreenProps {}

export interface MyPagePasswordEditForm {
    password: string;
    passwordConfirm: string;
}

const MyPagePasswordEditModalScreen: FC<MyPagePasswordEditModalScreenProps> = () => {
    const [, , removeCookies] = useCookies();
    const { replace } = useRouter();
    const toastService = ToastService.getInstance();
    const modalService = ModalService.getInstance();
    const updatePassword = useMutation({
        mutationFn: patchUsers,
    });
    const userInformation = useQuery({
        queryKey: [API_GET_USER_PROFILE],
        queryFn: getUserProfile,
    });

    const form = useForm<MyPagePasswordEditForm>({
        defaultValues: {
            password: '',
            passwordConfirm: '',
        },
        mode: 'all',
    });

    const onValid = ({ password }: MyPagePasswordEditForm) => {
        updatePassword.mutate(
            { password },
            {
                onSuccess: async () => {
                    await removeCookies('refreshToken');
                    await modalService.closeEntireModal();
                    await toastService.addToast('비밀번호가 변경 되었습니다. 재로그인 해 주세요.');
                    replace('/');
                },
                onError: (error) => {
                    if (isAxiosError(error)) toastService.addToast(error.response?.data.messages);
                },
            },
        );
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onValid)}
                className="container max-w-96 rounded-md border border-violet-400 bg-white px-5 pb-5 pt-7"
            >
                <p className="text-2xl font-bold">비밀번호 변경</p>
                <section className="mt-5 flex w-full flex-col gap-6">
                    <section className="flex w-full flex-col gap-3">
                        <section className="flex w-full gap-3">
                            <p className="text-base font-bold text-gray-400">아이디</p>
                            <span>{userInformation.data?.email}</span>
                        </section>
                        <section className="flex gap-3">
                            <p className="text-base font-bold text-gray-400">닉네임</p>
                            <span>{userInformation.data?.nickname}</span>
                        </section>
                    </section>
                    <section className="flex w-full flex-col gap-3">
                        <section>
                            <p className="text-base font-bold text-gray-400">비밀번호</p>
                        </section>
                        <MyPagePasswordEditNewPasswordInput />
                    </section>
                    <section className="flex w-full flex-col gap-3">
                        <section>
                            <p className="text-base font-bold text-gray-400">비밀번호 확인</p>
                        </section>
                        <MyPagePasswordEditNewPasswordConfirmInput />
                    </section>
                </section>

                <section className="mt-5">
                    <MyPagePasswordEditSubmitButton />
                </section>
            </form>
        </FormProvider>
    );
};

export default MyPagePasswordEditModalScreen;
