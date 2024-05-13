import { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import CommonInput from '@src/components/common/CommonInput';
import { passwordRegex } from '@src/lib/regex';
import { useFormContext, useWatch } from 'react-hook-form';
import type { HomeSignupFormValue } from './HomeSignupScreen';

interface HomeSignupPasswordConfirmProps {}

const HomeSignupPasswordConfirm: FC<HomeSignupPasswordConfirmProps> = () => {
    const {
        register,
        formState: { errors },
        control,
    } = useFormContext<HomeSignupFormValue>();

    const password = useWatch({
        control,
        name: 'password',
    });

    const validatePassword = (value: string) => {
        if (password && value !== password) {
            return '비밀번호가 일치하지 않습니다.';
        }
        return true;
    };

    return (
        <section className="flex flex-col">
            <CommonInput
                placeholder="비밀번호 확인"
                variant="primary"
                type="password"
                {...register('passwordConfirm', {
                    required: '비밀번호를 다시 적어주세요.',
                    pattern: {
                        value: passwordRegex,
                        message:
                            '비밀번호 형식에 맞지 않습니다.(8자 이상, 1이상의 문자, 숫자, 특수문자 포함)',
                    },
                    validate: validatePassword,
                })}
            />
            <ErrorMessage
                errors={errors}
                name="passwordConfirm"
                render={({ message }) => <span className="text-red-600">{message}</span>}
            />
        </section>
    );
};

export default HomeSignupPasswordConfirm;
