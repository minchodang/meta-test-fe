'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Modal from './Modal';
import { ModalService, ModalState } from '../../../service/ModalService';

const GlobalModal: React.FC = () => {
    const modalService = ModalService.getInstance();
    const [isOpen, setIsOpen] = useState(false);
    const [contents, setContents] = useState<
        Array<{ content: ReactNode; backGroundColor?: string }>
    >([]);
    
    useEffect(() => {
        const handleModalChange = ({
            isOpen: isModalOpen,
            contents: modalContents,
        }: ModalState) => {
            setIsOpen(isModalOpen);
            setContents(modalContents);
        };
        modalService.subscribe(handleModalChange);
        return () => {
            modalService.unsubscribe(handleModalChange);
        };
    }, []);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            {contents.map(({ content, backGroundColor }) => (
                <Modal
                    key={crypto.randomUUID()}
                    onClose={() => ModalService.getInstance().closeModal()}
                    backGroundColor={backGroundColor}
                >
                    {content}
                </Modal>
            ))}
        </>
    );
};

export default React.memo(GlobalModal);
