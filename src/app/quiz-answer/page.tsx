import { QuizAnswerForm } from '@src/components/screens/quiz-answer/QuizAnswerForm';

const QuizAnswerPage = () => (
    <div
        className="
            flex
            h-screen
            w-screen
            items-center
            justify-center"
    >
        <section className="flex  h-screen w-full max-w-3xl flex-col items-center gap-5 bg-zinc-100 p-5">
            <div className="flex w-full">
                <h1 className="w-full text-2xl font-bold">기억하고 있는 단어를 입력 해 주세요.</h1>
            </div>
            <QuizAnswerForm />
        </section>
    </div>
);

export default QuizAnswerPage;
