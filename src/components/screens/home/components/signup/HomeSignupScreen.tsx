import { FC, useState } from 'react';
import { patchEmailVerification } from '@src/api/patchEmailVerification';
import { postEmailVerification } from '@src/api/postEmailVerification';
import { postLogin } from '@src/api/postLogin';
import { postSignup } from '@src/api/postSingup';
import EmailVerifyingCode from '@src/components/common/EmailVerifyingCode';
import defaultRequest from '@src/lib/axios/defaultRequest';
import { ModalService } from '@src/service/ModalService';
import { ToastService } from '@src/service/ToastService';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useCookies } from 'react-cookie';
import { FormProvider, useForm } from 'react-hook-form';
import HomeSignupButton from './HomeSignupButton';
import HomeSignupPassword from './HomeSignupPassword';
import HomeSignupPasswordConfirm from './HomeSignupPasswordConfirm';
import HomeSingupEmail from './HomeSingupEmail';

export interface HomeSignupFormValue {
    email: string;
    password: string;
    passwordConfirm: string;
    code: number;
}

const HomeSignupScreen: FC = () => {
    const [, setCookie] = useCookies(['refreshToken']);
    const [step, setStep] = useState<number>(1);
    const toastService = ToastService.getInstance();
    const modalService = ModalService.getInstance();
    const [emailVerifyingRequestId, setEmailVerifyingRequestId] = useState<string>('');

    const sendEmail = useMutation({
        mutationFn: postEmailVerification,
    });
    const verifyEmail = useMutation({
        mutationFn: patchEmailVerification,
    });

    const methods = useForm<HomeSignupFormValue>({
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
            code: undefined,
        },
        mode: 'all',
    });

    const submitSignupForm = useMutation({
        mutationFn: postSignup,
    });

    const login = useMutation({
        mutationFn: postLogin,
        onSuccess: async (data) => {
            if (data) {
                const accessToken = data.headers.access_token;
                const refreshToken = data.headers.refresh_token;
                defaultRequest.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
                await setCookie('refreshToken', refreshToken);
            }
        },
    });

    const onSubmit = async ({ email, password }: HomeSignupFormValue) => {
        submitSignupForm.mutate(
            { email, password },
            {
                onSuccess: async () => {
                    await toastService.addToast('가입이 완료되었습니다.');
                    await modalService.closeEntireModal();
                    login.mutate({
                        email,
                        password,
                    });
                },
                onError: (data) => {
                    if (isAxiosError(data)) {
                        toastService.addToast(data.response?.data.message);
                        return;
                    }
                    toastService.addToast(data.message);
                },
            },
        );
    };

    const onClickAuthButton = () => {
        sendEmail.mutate(
            {
                email: methods.getValues('email'),
            },
            {
                onSuccess: (data) => {
                    setEmailVerifyingRequestId(data.request_id);
                    toastService.addToast('코드가 이메일로 발송되었습니다.');
                    setStep(2);
                },
                onError: (error) => {
                    if (error && isAxiosError(error)) {
                        toastService.addToast(error.response?.data.message);
                    }
                },
            },
        );
    };

    const onClickVerifyingButton = () => {
        verifyEmail.mutate(
            {
                code: Number(methods.getValues('code')),
                request_id: emailVerifyingRequestId,
            },
            {
                onSuccess: () => {
                    toastService.addToast('인증이 완료되었습니다.');
                    setStep(3);
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
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-96 rounded-md border border-violet-400 bg-violet-200 px-5 pb-5 pt-7"
            >
                <p className="text-2xl font-bold">회원가입</p>
                <section className="mt-5 flex flex-col gap-6">
                    <HomeSingupEmail
                        onClickAuthButton={onClickAuthButton}
                        isSuccessAuthorization={step > 2}
                    />
                    {step > 1 && (
                        <div className="animate-slideup">
                            <EmailVerifyingCode
                                onClickVerifyingButton={onClickVerifyingButton}
                                isSuccessAuthorization={step > 2}
                            />
                        </div>
                    )}
                    {step > 2 && (
                        <div className="flex animate-slideup flex-col gap-3">
                            <HomeSignupPassword />
                            <HomeSignupPasswordConfirm />
                        </div>
                    )}
                </section>
                <HomeSignupButton isSubmittedEmail />
            </form>
        </FormProvider>
    );
};

export default HomeSignupScreen;
