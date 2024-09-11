import React, { useState } from 'react';
import { API } from '../../api';
import { Button, Carousel, Modal } from 'rsuite';
import { LiaExternalLinkSquareAltSolid } from 'react-icons/lia';

const ProjectModal = ({ project, isOpen, handleClose }) => {
  return (
    <Modal overflow={true} open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <h3 className='rubik font-semibold'>{project.title}</h3>
      </Modal.Header>
      <Modal.Body>
        <div className='w-full'>
          <Carousel autoplay shape='bar'>
            {project.images?.map((i, index) => (
              <img key={index} id={index} src={API.defaults.baseURL + i.image} />
            ))}
          </Carousel>
        </div>
        <p className='py-3'>{project.description}</p>
        {project.tools?.map((tool, index) => (
          <span key={index} className='bg-gray-100 rounded-full mx-1 px-3 py-1 text-sm font-semibold text-gray-600'>
            {tool}
          </span>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button href={project.link} appearance='primary' startIcon={<LiaExternalLinkSquareAltSolid />}>
          Go to site
        </Button>
        <Button onClick={handleClose} appearance='ghost' color='red'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModal;
