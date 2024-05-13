import { FC, useMemo } from 'react';
import { API_GET_USER_PROFILE, getUserProfile } from '@src/api/getUserProfile';
import { postTestResult } from '@src/api/postTestResult';
import Button from '@src/components/common/Button';
import { ModalService } from '@src/service/ModalService';
import { QuizListService } from '@src/service/QuizListService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import QuizAnswerExpectationInput from './QuizAnswerExpectationInput';
import QuizAnswerExpectationSubmitButton from './QuizAnswerExpectationSubmitButton';

interface QuizAnswerExpectationFormProps {
    answers: string[];
}

export interface QuizAnswerExpectationPopupFormValue {
    expectationNumber: string;
}

const getQuizLevel = (array: string[]) => {
    const arrayLength = array.length;
    switch (arrayLength) {
        case 20:
            return 'intermediate';
        case 30:
            return 'advanced';
        default:
            return 'beginner';
    }
};

const QuizAnswerExpectationForm: FC<QuizAnswerExpectationFormProps> = ({ answers }) => {
    const { replace } = useRouter();
    const { data: userProfile } = useQuery({
        queryKey: [API_GET_USER_PROFILE],
        queryFn: () => getUserProfile(),
    });
    const modalService = ModalService.getInstance();
    const quizService = QuizListService.getInstance();
    const testSubmit = useMutation({
        mutationFn: postTestResult,
    });

    const onClickCloseButton = () => {
        modalService.closeModal();
    };

    const form = useForm<QuizAnswerExpectationPopupFormValue>({
        defaultValues: {
            expectationNumber: undefined,
        },
        mode: 'onChange',
    });

    const onValid = ({ expectationNumber }: QuizAnswerExpectationPopupFormValue) => {
        testSubmit.mutate(
            {
                id: userProfile?.id,
                level: getQuizLevel(quizService.getQuizList().flatMap((quiz) => quiz.word)),
                total_count: quizService.getQuizList().length,
                expected_count: Number(expectationNumber),
                total_words: quizService.getQuizList().flatMap((quiz) => quiz.word),
                input_words: answers,
            },
            {
                onSuccess: async (data) => {
                    await modalService.closeEntireModal();
                    replace(`/quiz-result?id=${data.id}&sort_key=${data.sort_key}`);
                },
            },
        );
    };

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onValid)}>
                <QuizAnswerExpectationInput />
                <div className="flex gap-4">
                    <Button variant="primary-unselect" type="button" onClick={onClickCloseButton}>
                        취소
                    </Button>
                    <QuizAnswerExpectationSubmitButton />
                </div>
            </form>
        </FormProvider>
    );
};

export default QuizAnswerExpectationForm;
