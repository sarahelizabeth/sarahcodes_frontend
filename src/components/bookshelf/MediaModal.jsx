import React, { useState } from 'react';
import { Modal, Button } from 'rsuite';
import { LiaExternalLinkSquareAltSolid } from 'react-icons/lia';

export const MediaModal = ({ media, isOpen, handleClose }) => {
  const image = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/projects/bookshelf/${media.imageURL}`;

  return (
    <Modal overflow={true} open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <h3 className='rubik font-bold'>{media.title}</h3>
      </Modal.Header>
      <Modal.Body>
        {media.media_type === 'article' ? (
          <p className='description-mask text-justify whitespace-pre-wrap'>{media.description}</p>
        ) : (
          <div className='wrap-text-container'>
            <div className='float-left pr-3 pb-3'>
              <img src={image} className='max-w-36' />
            </div>
            <p className='text-justify'>{media.description}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button href={media.link} appearance='default' endIcon={<LiaExternalLinkSquareAltSolid />}>
          {media.media_type === 'article' ? (
            <span>Continue reading</span>
          ) : media.media_type === 'book' ? (
            <span>View on Goodreads</span>
          ) : media.media_type === 'app' ? (
            <span>Download on AppStore</span>
          ) : (
            <span>View more</span>
          )}
        </Button>
        <Button onClick={handleClose} appearance='ghost' color='red'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
