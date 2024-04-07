import { ReactNode } from 'react';

export interface ModalState {
    isOpen: boolean;
    contents: Array<{ content: ReactNode; backGroundColor?: string }>;
}

export class ModalService {
    static instance: ModalService;

    private currentState: ModalState = { isOpen: false, contents: [] };

    subscribers: ((state: ModalState) => void)[] = [];

    static getInstance(): ModalService {
        if (!ModalService.instance) {
            ModalService.instance = new ModalService();
        }
        return ModalService.instance;
    }

    subscribe(callback: (state: ModalState) => void) {
        this.subscribers.push(callback);
    }

    unsubscribe(callback: (state: ModalState) => void) {
        this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    }

    openModal(modalContent: ReactNode, backGroundColor?: string) {
        const newContents = [
            ...this.currentState.contents,
            { content: modalContent, backGroundColor },
        ];
        const newState = { isOpen: true, contents: newContents };
        this.currentState = newState;
        this.subscribers.forEach((callback) => callback(newState));
    }

    closeModal() {
        const newContents = [...this.currentState.contents];
        newContents.pop();
        const newState = { isOpen: newContents.length > 0, contents: newContents };
        this.currentState = newState;
        this.subscribers.forEach((callback) => callback(newState));
    }

    closeEntireModal() {
        const newState = { isOpen: false, contents: [] };
        this.currentState = newState;
        this.subscribers.forEach((callback) => callback(newState));
    }

    // 현재 모달의 열림 상태 확인
    isModalOpen(): boolean {
        return this.currentState.isOpen;
    }
}
