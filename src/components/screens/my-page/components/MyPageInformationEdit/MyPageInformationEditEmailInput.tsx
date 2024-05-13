import { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@src/components/common/Button';
import CommonInput from '@src/components/common/CommonInput';
import { emailRegex } from '@src/lib/regex';
import { useFormContext, useWatch } from 'react-hook-form';
import type { MyPageInformationEditForm } from './MyPageInformationEditModalScreen';

interface MyPageInformationEditEmailInputProps {
    onClick: VoidFunction;
    isSuccessAuthorization: boolean;
}

const MyPageInformationEditEmailInput: FC<MyPageInformationEditEmailInputProps> = ({
    onClick,
    isSuccessAuthorization,
}) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<MyPageInformationEditForm>();
    const email = useWatch({ control, name: 'email' });
    const isEmailPatternValid = emailRegex.test(email);

    return (
        <section className="flex w-full gap-1">
            <p className="flex w-full flex-col gap-1">
                <CommonInput
                    placeholder="아이디(이메일)"
                    variant="primary"
                    {...register('email', {
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
                    disabled={!email || !isEmailPatternValid || isSuccessAuthorization}
                    onClick={onClick}
                >
                    인증요청
                </Button>
            </p>
        </section>
    );
};

export default MyPageInformationEditEmailInput;
