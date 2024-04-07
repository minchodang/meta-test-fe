'use client';

import React, { useEffect, useState } from 'react';
import ToastMessage from './ToastMessage';
import { ToastService } from './ToastService';

interface IndividualToastType {
    id: number;
    message: string;
}

const Toast = () => {
    const [messages, setMessages] = useState<IndividualToastType[]>([]);

    useEffect(() => {
        const toastService = ToastService.getInstance();

        const handleNewMessage = (message: string) => {
            if (messages.length > 3) {
                return;
            }
            setMessages((prev) => [...prev, { id: Date.now(), message }]);
            // 메시지를 일정 시간 후에 제거
            setTimeout(() => {
                setMessages((prev) => prev.slice(1));
            }, 2000);
        };

        toastService.subscribe(handleNewMessage);

        return () => {
            toastService.unsubscribe(handleNewMessage);
        };
    }, [messages.length]);

    return (
        <div className="fixed bottom-10 left-1/2 z-50 flex -translate-x-1/2 transform flex-col gap-3">
            {messages.map((toast) => (
                <ToastMessage message={toast.message} key={toast.id} />
            ))}
        </div>
    );
};

export default React.memo(Toast);
