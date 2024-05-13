import { FC, useMemo } from 'react';
import Button from '@src/components/common/Button';
import { useFormContext, useWatch } from 'react-hook-form';
import type { MyPageInformationEditForm } from './MyPageInformationEditModalScreen';

interface MyPageInformationEditSubmitButtonProps {
    isSuccessAuthorization: boolean;
}

const MyPageInformationEditSubmitButton: FC<MyPageInformationEditSubmitButtonProps> = ({
    isSuccessAuthorization,
}) => {
    const { control } = useFormContext<MyPageInformationEditForm>();
    const email = useWatch({ control, name: 'email' });
    const nickName = useWatch({ control, name: 'nickName' });

    const isDisabled = useMemo(() => {
        if (email) {
            return !isSuccessAuthorization;
        }
        return !nickName;
    }, [email, isSuccessAuthorization, nickName]);

    return (
        <section className="mt-5">
            <Button variant="primary" type="submit" disabled={isDisabled}>
                완료
            </Button>
        </section>
    );
};

export default MyPageInformationEditSubmitButton;
