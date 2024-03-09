import { ChangeEvent, FC, MouseEventHandler, useState } from 'react';
import Button from '@src/components/common/Button';
import SelectBox from '@src/components/common/SelectBox';
import { useRouter } from 'next/navigation';

interface HomeQuizSelectScreenProps {
    onClickButton: MouseEventHandler<HTMLButtonElement>;
    testId: string;
}

const options = [
    {
        difficulty: 'easy',
        text: '10개 - 초급',
    },
    {
        difficulty: 'middle',
        text: '20개 - 중급',
    },
    {
        difficulty: 'hard',
        text: '30개 - 고급',
    },
];

const HomeQuizSelectScreen: FC<HomeQuizSelectScreenProps> = ({ onClickButton, testId }) => {
    const router = useRouter();
    const { push } = router;
    const [selectedOption, setSelectedOption] = useState('');

    const onOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    const onClickQuizButton = () => {
        push(`/quiz?difficulty=${selectedOption}`);
    };

    return (
        <div
            className="container
        flex
        w-full flex-col 
        gap-y-5 
        pb-5 pl-3 pr-3
        pt-5
        "
            data-testid={testId}
        >
            <p className="text-2xl font-bold">테스트 단어 수 선택</p>
            <SelectBox
                options={options}
                onOptionChange={onOptionChange}
                selectedOption={selectedOption}
            />
            <div className="flex gap-4">
                <Button variant="primary-unselect" onClick={onClickButton}>
                    취소
                </Button>
                <Button variant="primary" onClick={onClickQuizButton}>
                    확인
                </Button>
            </div>
        </div>
    );
};

export default HomeQuizSelectScreen;
