import QuizResultFooter from '@src/components/screens/quiz-result/QuizResultFooter';
import QuizResultDetailSection from '@src/components/screens/quiz-result/section/QuizResultDetailSection';
import QuizResultHistorySection from '@src/components/screens/quiz-result/section/QuizResultHistorySection';
import QuizResultSummarySection from '@src/components/screens/quiz-result/section/QuizResultSummarySection';
import { cookies } from 'next/headers';

const QuizAnswerPage = () => {
    const cookie = cookies();

    return (
        <div className="flex flex-col">
            <QuizResultSummarySection />
            <QuizResultDetailSection />
            <QuizResultHistorySection isLoginSns={!!cookie.get('refreshToken')} />
            <QuizResultFooter />
        </div>
    );
};

export default QuizAnswerPage;
