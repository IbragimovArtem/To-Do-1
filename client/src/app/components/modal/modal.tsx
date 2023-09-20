import React, { ReactNode } from "react";
import s from './Modal.module.css'

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
    setActive: () => void;
}

export default function Modal(props: ModalType) {

const a = () => {
    props.toggle()
    props.setActive()
}

    return (
        <>
            {props.isOpen && (
                <div className={s.modal_overlay} onClick={a}>
                    <div onClick={(e) => e.stopPropagation()} className={s.modal_box}>
                        {props.children}
                    </div>
                </div>
            )}
        </>
    );
}