export interface QuizListItemType {
    id: number;
    word: string;
}

type QuizListItem = (quizList: QuizListItemType[]) => void;

export class QuizListService {
    private static instance: QuizListService;

    private observers: QuizListItem[] = [];

    private quizList: QuizListItemType[] = [];

    private constructor() {}

    public static getInstance(): QuizListService {
        if (!QuizListService.instance) {
            QuizListService.instance = new QuizListService();
        }
        return QuizListService.instance;
    }

    subscribe(observer: QuizListItem) {
        this.observers.push(observer);
    }

    unsubscribe(observer: QuizListItem) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }

    setQuizList(quizList: QuizListItemType[]) {
        this.quizList = quizList;
        this.notifyObservers();
    }

    getQuizList(): QuizListItemType[] {
        return this.quizList;
    }

    private notifyObservers() {
        this.observers.forEach((observer) => observer(this.quizList));
    }
}
