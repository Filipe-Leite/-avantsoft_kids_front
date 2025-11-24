import React, { ReactNode } from 'react';
import './chooseCardTypeModal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md'
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div 
        className={`modal-content modal-${size}`}
        onClick={handleContentClick}
      >
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Fechar modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-card-type-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;