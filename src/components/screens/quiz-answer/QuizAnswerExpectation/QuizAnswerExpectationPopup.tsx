import React, { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import Button from '@src/components/common/Button';
import CommonInput from '@src/components/common/CommonInput';
import { ModalService } from '@src/service/ModalService';
import { QuizListService } from '@src/service/QuizListService';
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import QuizAnswerExpectationForm from './QuizAnswerExpectationForm';
import QuizAnswerExpectationInput from './QuizAnswerExpectationInput';
import type { QuizAnswerFormType } from '../QuizAnswerForm';

interface QuizAnswerExpectationPopupProps {
    answers: string[];
}

const QuizAnswerExpectationPopup: FC<QuizAnswerExpectationPopupProps> = ({ answers }) => (
    <div
        className="flex
w-96
flex-col
gap-y-5 
rounded bg-white pb-5
pl-3
pr-3
pt-5
"
    >
        <p className="text-md">몇 개의 단어를 맞출 것으로 예상하나요?</p>
        <QuizAnswerExpectationForm answers={answers} />
    </div>
);
export default React.memo(QuizAnswerExpectationPopup);
