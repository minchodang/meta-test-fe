import { FC } from 'react';
import QuizResultHistoryGraphCard from '@src/components/common/quiz-result/QuizResultHistoryGraphCard';

interface MyPageTestRecordSectionProps {
    isLoginSns: boolean;
}

const MyPageTestRecordSection: FC<MyPageTestRecordSectionProps> = ({ isLoginSns }) => (
    <section className="flex flex-col">
        <h1 className="text-2xl font-bold">나의 테스트 기록</h1>
        <QuizResultHistoryGraphCard isLoginSns={isLoginSns} />
    </section>
);

export default MyPageTestRecordSection;
