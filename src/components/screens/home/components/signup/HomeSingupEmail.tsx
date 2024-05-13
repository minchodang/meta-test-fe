import { FC, MouseEventHandler, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@src/components/common/Button';
import CommonInput from '@src/components/common/CommonInput';
import { emailRegex } from '@src/lib/regex';
import { useFormContext, useWatch } from 'react-hook-form';
import type { HomeSignupFormValue } from './HomeSignupScreen';

interface HomeSingupEmailProps {
    onClickAuthButton: MouseEventHandler<HTMLButtonElement>;
    isSuccessAuthorization: boolean;
}

const HomeSingupEmail: FC<HomeSingupEmailProps> = ({
    onClickAuthButton,
    isSuccessAuthorization,
}) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<HomeSignupFormValue>();
    const emailValue = useWatch({ control, name: 'email' });

    const isEmailPatternValid = emailRegex.test(emailValue);

    return (
        <section className="flex w-full gap-1">
            <p className="w-full">
                <CommonInput
                    placeholder="아이디(이메일)"
                    variant="primary"
                    {...register('email', {
                        required: '이메일을 필수값입니다',
                        pattern: {
                            value: emailRegex,
                            message: '이메일 형식에 맞게 입력해 주세요',
                        },
                    })}
                    disabled={isSuccessAuthorization}
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => <span className="text-red-600">{message}</span>}
                />
            </p>
            <p className="h-10 w-40">
                <Button
                    variant="blue"
                    type="button"
                    onClick={onClickAuthButton}
                    disabled={!emailValue || !isEmailPatternValid || isSuccessAuthorization}
                >
                    인증요청
                </Button>
            </p>
        </section>
    );
};

export default HomeSingupEmail;
