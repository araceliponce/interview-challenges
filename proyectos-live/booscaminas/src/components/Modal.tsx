import React, { ReactElement, useEffect, useRef } from "react";
import styles from "./modal.module.css";

// from https://benfrain.com/a-react-modal-that-uses-the-dialog-element-and-transitions-in-and-out/
interface ModalProps {
    content: ReactElement;
    height?: string;
    onClose?: () => void;
    open: boolean;
    padding?: number;
    radii?: number;
    theme?: string;
    transitionSpeed?: string;
    width?: string;
}

const Modal = ({
    open,
    onClose,
    padding,
    theme,
    radii,
    content,
    width,
    height,
    transitionSpeed,
}: ModalProps) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    // Keep a stable ref to onClose so the event listener never needs re-attaching
    const onCloseRef = useRef(onClose);
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    // Show/hide in response to the `open` prop
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open) {
            if (!dialog.open) {
                dialog.showModal();
            }
        } else {
            if (dialog.open) {
                dialog.close();
            }
        }
    }, [open]);

    // Attach the close listener once — uses the ref so it always calls the latest onClose
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const handleClose = () => {
            document.body.style.overflow = "";
            onCloseRef.current?.();
        };

        dialog.addEventListener("close", handleClose);
        return () => {
            dialog.removeEventListener("close", handleClose);
        };
    }, []); // empty — intentionally attached once

    function closeDialog(e) {
        if (e.target === buttonRef.current || e.target === dialogRef.current) {
            dialogRef.current?.close();
        }
    }

    const styleProps = {
        "--padding": `${padding}px`,
        "--radii": `${radii}px`,
        "--height": `${height}`,
        "--width": `${width}`,
        "--transitionSpeed": `${transitionSpeed}`,
    } as React.CSSProperties;

    return (
        <dialog
            ref={dialogRef}
            className={styles.dialog}
            style={styleProps}
            data-theme={theme}
            onClick={(e) => closeDialog(e)}
        >
            <div className={styles.dialogInner}>{content}</div>
            <button
                ref={buttonRef}
                className={styles.close}
                onClick={(e) => closeDialog(e)}
            >
                <span className={styles.cross}>Close</span>
            </button>
        </dialog>
    );
};

export default Modal;
