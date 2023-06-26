import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onChange, onClose, largeImageURL }) => {
  useEffect(() => {
    window.addEventListener('keydown', onChange);

    return () => {
      window.removeEventListener('keydown', onChange);
    };
  }, [onChange]);

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalWindow>
        <img src={largeImageURL} alt="" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
