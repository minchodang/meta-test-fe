'use client';

import { FC, useCallback } from 'react';
import CommonInput from '@src/components/common/CommonInput';
import { FormProvider, useForm } from 'react-hook-form';
import QuizAnswerSortingButtonSection from './QuizAnswerSortingButtonSection';
import QuizAnswerSubmitButton from './QuizAnswerSubmitButton';

interface QuizAnswerFormProps {}

export interface QuizAnswerFormType {
    inputValue: string;
    answers: string[];
}

export const QuizAnswerForm: FC<QuizAnswerFormProps> = () => {
    const control = useForm<QuizAnswerFormType>({
        defaultValues: {
            inputValue: '',
            answers: [],
        },
    });
    const { register, handleSubmit, setValue, getValues, resetField } = control;

    const setSortingAnswers = useCallback(
        (value: string) => {
            const originalArr = getValues('answers');
            if (originalArr.includes(value) || !value) {
                return;
            }
            setValue('answers', [...originalArr, value]);
        },
        [getValues, setValue],
    );

    const onValid = useCallback(
        async ({ inputValue }: QuizAnswerFormType) => {
            await setSortingAnswers(inputValue);
            resetField('inputValue');
        },
        [resetField, setSortingAnswers],
    );

    return (
        <FormProvider {...control}>
            <form
                className="flex h-full max-h-screen w-full  flex-col"
                onSubmit={handleSubmit(onValid)}
            >
                <CommonInput
                    placeholder="단어 입력후 엔터를 쳐 주세요."
                    variant="secondary"
                    {...register('inputValue')}
                />

                <QuizAnswerSortingButtonSection />
            </form>
            <QuizAnswerSubmitButton />
        </FormProvider>
    );
};
