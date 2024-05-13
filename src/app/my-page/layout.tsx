import React from 'react';

type Props = {
    children: React.ReactNode;
};

const QuizAnswerLayout = ({ children }: Props) => (
    <div
        className="
flex
h-screen
w-screen
items-center
justify-center
"
    >
        <section
            className="flex
        h-full  
        w-full
        max-w-3xl
        flex-col
        gap-5
       border-l border-r border-violet-300 bg-white pl-5 pr-5 pt-10"
        >
            {children}
        </section>
    </div>
);

export default QuizAnswerLayout;
