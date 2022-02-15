import * as React from "react";
declare type HandleModal = (newModal: ModalContent, title?: string) => void;
declare type ModalContent = JSX.Element | string | null;
declare type ModalType = {
    modalContent: ModalContent;
    handleModal: HandleModal;
    showModal: boolean;
    title?: string;
};
export declare const ModalContext: React.Context<ModalType>;
export declare const useModal: () => ModalType;
export declare const ModalProvider: ({ children }: {
    children: any;
}) => JSX.Element;
export default function Modal(): JSX.Element | null;
export {};
//# sourceMappingURL=Modal.d.ts.map