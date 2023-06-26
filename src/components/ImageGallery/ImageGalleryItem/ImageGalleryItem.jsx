import PropTypes from 'prop-types';
import { useState } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';

import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ largeImageURL, webformatURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      setShowModal(false);
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div>
      <Item>
        <Image
          src={webformatURL}
          alt={tags}
          loading="lazy"
          onClick={() => {
            setShowModal(true);
          }}
        />
      </Item>
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          onClose={handleBackdropClick}
          onChange={handleKeyDown}
        />
      )}
    </div>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
