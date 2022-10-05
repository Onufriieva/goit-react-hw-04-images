import PropTypes from 'prop-types';
import { Overlay, StyledModal } from './ModalStyled';
import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({ onClose, children }) {
  const handleClose = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleClose);
    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, [handleClose]);

  return createPortal(
    <Overlay onClick={handleClose}>
      <StyledModal>{children}</StyledModal>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};