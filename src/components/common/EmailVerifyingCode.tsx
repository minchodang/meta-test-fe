import { FC, MouseEventHandler } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@src/components/common/Button';
import CommonInput from '@src/components/common/CommonInput';
import { useFormContext, useWatch } from 'react-hook-form';

interface EmailVerifyingCodeProps {
    onClickVerifyingButton: MouseEventHandler<HTMLButtonElement>;
    isSuccessAuthorization: boolean;
}

const EmailVerifyingCode: FC<EmailVerifyingCodeProps> = ({
    onClickVerifyingButton,
    isSuccessAuthorization,
}) => {
    const {
        register,
        formState: { errors },
        control,
    } = useFormContext();
    const code = useWatch({
        control,
        name: 'code',
    });

    return (
        <section className="flex w-full  gap-3">
            <div className="flex w-4/5 flex-col gap-3">
                <CommonInput
                    variant="primary"
                    placeholder="인증 코드 입력"
                    inputMode="numeric"
                    maxLength={4}
                    disabled={isSuccessAuthorization}
                    {...register('code', {
                        required: true,
                        validate: {
                            isValidCode: (value) =>
                                /^\d{4}$/.test(String(value)) ||
                                '인증 코드는 4자리 숫자여야 합니다.',
                        },
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="code"
                    render={({ message }) => <span className="text-red-600">{message}</span>}
                />
            </div>
            <div className="h-10 w-40">
                <Button
                    type="button"
                    variant="blue"
                    onClick={onClickVerifyingButton}
                    disabled={!code || isSuccessAuthorization}
                >
                    {isSuccessAuthorization ? '인증 완료' : '인증 하기'}
                </Button>
            </div>
        </section>
    );
};

export default EmailVerifyingCode;
