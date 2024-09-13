import React from 'react';
import { Modal, Button } from 'rsuite';
import { LiaExternalLinkSquareAltSolid } from 'react-icons/lia';

export const MediaModal = ({ media, isOpen, handleClose }) => {
  return (
    <Modal overflow={true} open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <h3 className='rubik font-bold'>{media.title}</h3>
      </Modal.Header>
      <Modal.Body>
        <div className='wrap-text-container'>
          <div className='float-left pr-3 pb-3'>
            <img src={media.image} className='max-w-36' />
          </div>
          <p className='text-justify'>{media.description}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button href={media.link} appearance='default' startIcon={<LiaExternalLinkSquareAltSolid />}>
          Go to site
        </Button>
        <Button onClick={handleClose} appearance='ghost' color='red'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
