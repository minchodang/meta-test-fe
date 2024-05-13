import { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import CommonInput from '@src/components/common/CommonInput';
import { passwordRegex } from '@src/lib/regex';
import { useFormContext } from 'react-hook-form';
import type { MyPagePasswordEditForm } from './MyPagePasswordEditModalScreen';

interface MyPagePasswordEditNewPasswordInputProps {}

const MyPagePasswordEditNewPasswordInput: FC<MyPagePasswordEditNewPasswordInputProps> = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<MyPagePasswordEditForm>();

    return (
        <>
            <CommonInput
                placeholder="변경하실 비밀번호를 입력해주세요."
                variant="primary"
                type="password"
                {...register('password', {
                    required: '비밀번호는 필수값입니다.',
                    pattern: {
                        value: passwordRegex,
                        message:
                            '비밀번호 형식에 맞지 않습니다.(8자 이상, 1이상의 문자, 숫자, 특수문자 포함)',
                    },
                })}
            />
            <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <span className="text-red-600">{message}</span>}
            />
        </>
    );
};

export default MyPagePasswordEditNewPasswordInput;
