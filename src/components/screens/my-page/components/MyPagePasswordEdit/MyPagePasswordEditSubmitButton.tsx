import { FC } from 'react';
import Button from '@src/components/common/Button';
import { useFormContext, useWatch } from 'react-hook-form';
import type { MyPagePasswordEditForm } from './MyPagePasswordEditModalScreen';

interface MyPagePasswordEditSubmitButtonProps {}

const MyPagePasswordEditSubmitButton: FC<MyPagePasswordEditSubmitButtonProps> = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<MyPagePasswordEditForm>();
    const password = useWatch({ control, name: 'password' });
    const passwordConfirm = useWatch({ control, name: 'passwordConfirm' });

    return (
        <Button
            variant="primary"
            type="submit"
            disabled={
                !password || !passwordConfirm || !!errors.password || !!errors.passwordConfirm
            }
        >
            완료
        </Button>
    );
};

export default MyPagePasswordEditSubmitButton;
