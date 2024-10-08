import React, { useState } from 'react';
import { API } from '../../utils/api';
import { Button, Modal } from 'rsuite';
import { LiaExternalLinkSquareAltSolid } from 'react-icons/lia';

const ProjectModal = ({ project, isOpen, handleClose }) => {
  return (
    <Modal overflow={true} open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <h3 className='rubik font-semibold'>{project.title}</h3>
      </Modal.Header>
      <Modal.Body>
        <div className='flex flex-row gap-2 overflow-x-scroll h-64'>
          {project.images?.map((i, index) => (
            <img key={index} id={index} src={i} />
          ))}
        </div>
        <p className='py-3'>{project.description}</p>
        {project.tools?.map((tool, index) => (
          <span key={index} className='bg-gray-100 rounded-full mx-1 px-3 py-1 text-sm font-semibold text-gray-600'>
            {tool}
          </span>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button href={project.link} appearance='default' startIcon={<LiaExternalLinkSquareAltSolid />}>
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
