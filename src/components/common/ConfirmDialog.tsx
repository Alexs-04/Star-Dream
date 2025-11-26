// src/components/common/ConfirmDialog.tsx
import React from "react";
import "../../assets/css/ConfirmDialog.css";

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (
    {
        isOpen,
        title,
        message,
        onConfirm,
        onCancel,
        confirmText = "Confirmar",
        cancelText = "Cancelar"
    }) => {
    if (!isOpen) return null;

    return (
        <div className="dialog-overlay">
        <div className="dialog-content">
            <h3>{title}</h3>
            <p>{message}</p>
            <div className="dialog-actions">
    <button
        onClick={onCancel}
    className="btn-secondary"
        >
        {cancelText}
        </button>
        <button
    onClick={onConfirm}
    className="btn-primary danger"
        >
        {confirmText}
        </button>
        </div>
        </div>
        </div>
);
};

export default ConfirmDialog;