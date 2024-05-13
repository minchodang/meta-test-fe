import { FC } from 'react';
import Button from '@src/components/common/Button';
import Modal from '@src/components/common/modal/Modal';
import { ModalService } from '@src/service/ModalService';
import { useMutation } from '@tanstack/react-query';
import { useFormContext, useWatch } from 'react-hook-form';
import QuizAnswerExpectationPopup from './QuizAnswerExpectation/QuizAnswerExpectationPopup';
import type { QuizAnswerFormType } from './QuizAnswerForm';

interface QuizAnswerSubmitButtonProps {}

const QuizAnswerSubmitButton: FC<QuizAnswerSubmitButtonProps> = () => {
    const modalService = ModalService.getInstance();
    const { control } = useFormContext<QuizAnswerFormType>();
    const answers = useWatch({ control, name: 'answers' });

    const onClickSubmitButton = () => {
        modalService.openModal(<QuizAnswerExpectationPopup answers={answers} />);
    };

    return (
        <div className="h-10 w-full">
            <Button
                variant="primary"
                type="button"
                disabled={answers.length === 0}
                onClick={onClickSubmitButton}
            >
                제출하기
            </Button>
        </div>
    );
};

export default QuizAnswerSubmitButton;
