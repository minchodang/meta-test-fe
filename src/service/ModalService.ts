import { ReactNode } from 'react';

export interface ModalState {
    isOpen: boolean;
    contents: Array<{ content: ReactNode; backGroundColor?: string }>;
}

export class ModalService {
    static instance: ModalService;

    private currentState: ModalState = { isOpen: false, contents: [] };
    private constructor() {};

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
        try {
            const newContents = [
                ...this.currentState.contents,
                { content: modalContent, backGroundColor },
            ];
            this.updateState({ isOpen: true, contents: newContents });
        } catch (error) {
            console.error('Failed to open modal:', error);
        }
    }

    closeModal() {
        try {
            const newContents = [...this.currentState.contents];
            newContents.pop();
            this.updateState({ isOpen: newContents.length > 0, contents: newContents });
        } catch (error) {
            console.error('Failed to close modal:', error);
        }
    }

    closeEntireModal() {
        try {
            this.updateState({ isOpen: false, contents: [] });
        } catch (error) {
            console.error('Failed to close entire modal:', error);
        }
    }

    isModalOpen(): boolean {
        return this.currentState.isOpen;
    }

    private updateState(newState: ModalState) {
        this.currentState = newState;
        this.subscribers.forEach((callback) => callback(newState));
    }
}
