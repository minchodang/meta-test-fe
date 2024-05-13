import { FC, useState } from 'react';
import { API_GET_USER_PROFILE, getUserProfile } from '@src/api/getUserProfile';
import { patchEmailVerification } from '@src/api/patchEmailVerification';
import { patchUsers } from '@src/api/patchUsers';
import { postEmailVerification } from '@src/api/postEmailVerification';
import CommonInput from '@src/components/common/CommonInput';
import EmailVerifyingCode from '@src/components/common/EmailVerifyingCode';
import { ModalService } from '@src/service/ModalService';
import { ToastService } from '@src/service/ToastService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import MyPageInformationEditEmailInput from './MyPageInformationEditEmailInput';
import MyPageInformationEditSubmitButton from './MyPageInformationEditSubmitButton';

interface MyPageInformationEditModalScreenProps {}

interface AuthFormType {
    isOpen: boolean;
    isSuccessAuthorization: boolean;
    request_id?: string;
}

export interface MyPageInformationEditForm {
    email: string;
    nickName: string;
    code: number;
}

const MyPageInformationEditModalScreen: FC<MyPageInformationEditModalScreenProps> = () => {
    const queryClient = useQueryClient();
    const [authForm, setAuthForm] = useState<AuthFormType>({
        isOpen: false,
        isSuccessAuthorization: false,
        request_id: undefined,
    });
    const userInformationQuery = useQuery({
        queryKey: [API_GET_USER_PROFILE],
        queryFn: getUserProfile,
    });

    const toastService = ToastService.getInstance();
    const modalService = ModalService.getInstance();
    const { mutate: sendEmail } = useMutation({
        mutationFn: postEmailVerification,
    });
    const { mutate: verifyEmail } = useMutation({
        mutationFn: patchEmailVerification,
    });

    const { mutate: updateUserInformation } = useMutation({
        mutationFn: patchUsers,
    });

    const form = useForm<MyPageInformationEditForm>({
        defaultValues: {
            email: '',
            nickName: '',
            code: undefined,
        },
        mode: 'all',
    });

    const onClickSendEmailButton = () => {
        sendEmail(
            { email: form.getValues('email') },
            {
                onSuccess: (data) => {
                    setAuthForm((prev) => ({
                        ...prev,
                        isOpen: true,
                        request_id: data.request_id,
                    }));
                    toastService.addToast('코드가 이메일로 발송되었습니다.');
                },
                onError: () => {
                    toastService.addToast('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
                },
            },
        );
    };
    const onClickVerifyingButton = () => {
        if (!authForm.request_id) {
            return;
        }
        verifyEmail(
            { code: Number(form.getValues('code')), request_id: authForm.request_id },
            {
                onSuccess: () => {
                    setAuthForm((prev) => ({
                        ...prev,
                        isSuccessAuthorization: true,
                    }));
                    toastService.addToast('인증이 완료되었습니다.');
                },
                onError: () => {
                    toastService.addToast('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
                },
            },
        );
    };

    const onValid = ({ email, nickName }: MyPageInformationEditForm) => {
        if (authForm.isSuccessAuthorization) {
            updateUserInformation(
                {
                    email,
                    nickname: nickName,
                },
                {
                    onSuccess: async () => {
                        await queryClient.invalidateQueries({
                            queryKey: [API_GET_USER_PROFILE],
                        });
                        modalService.closeModal();
                        toastService.addToast('프로필이 업데이트 되었습니다.');
                    },
                    onError: (error) => {
                        if (error && isAxiosError(error)) {
                            toastService.addToast(error.response?.data.message);
                        }
                    },
                },
            );
            return;
        }
        updateUserInformation(
            {
                nickname: nickName,
            },
            {
                onSuccess: async () => {
                    await queryClient.invalidateQueries({
                        queryKey: [API_GET_USER_PROFILE],
                    });
                    modalService.closeModal();
                    toastService.addToast('프로필이 업데이트 되었습니다.');
                },
                onError: (error) => {
                    if (error && isAxiosError(error)) {
                        toastService.addToast(error.response?.data.message);
                    }
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
                <p className="text-2xl font-bold">정보수정</p>
                <section className="mt-5 flex flex-col gap-6">
                    {userInformationQuery.data?.userType === 'NORMAL' && (
                        <section className="flex w-full flex-col gap-3">
                            <section>
                                <p className="text-base font-bold text-gray-400">아이디(이메일)</p>
                            </section>
                            <MyPageInformationEditEmailInput
                                onClick={onClickSendEmailButton}
                                isSuccessAuthorization={authForm.isSuccessAuthorization}
                            />
                            {authForm.isOpen && (
                                <div className="animate-slideup">
                                    <EmailVerifyingCode
                                        isSuccessAuthorization={authForm.isSuccessAuthorization}
                                        onClickVerifyingButton={onClickVerifyingButton}
                                    />
                                </div>
                            )}
                        </section>
                    )}
                    <section className="flex w-full flex-col gap-3">
                        <section>
                            <p className="text-base font-bold text-gray-400">닉네임</p>
                        </section>
                        <CommonInput
                            placeholder="닉네임"
                            {...form.register('nickName')}
                            variant="primary"
                        />
                    </section>
                </section>
                <MyPageInformationEditSubmitButton
                    isSuccessAuthorization={authForm.isSuccessAuthorization}
                />
            </form>
        </FormProvider>
    );
};

export default MyPageInformationEditModalScreen;
