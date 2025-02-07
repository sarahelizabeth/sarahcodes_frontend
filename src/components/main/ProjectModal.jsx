import React from 'react';
import { Button, Modal } from 'rsuite';
import { LiaExternalLinkSquareAltSolid } from 'react-icons/lia';
import { IconTooltip } from '../ui/IconTooltip';
import { getStackItemByLabel } from './StackList';

const ProjectModal = ({ project, isOpen, handleClose }) => {
  return (
    <Modal overflow={true} open={isOpen} onClose={handleClose} size='md'>
      <Modal.Header>
        <h3 className='rubik font-semibold'>{project.title}</h3>
      </Modal.Header>
      <Modal.Body>
        <div className='flex flex-row gap-2 overflow-x-scroll h-64'>
          {project.imageURLs?.map((i, index) => (
            <img key={index} id={index} src={i} />
          ))}
        </div>
        <div className='border border-black border-2 py-2.5 px-3 mt-3'>
          <div className='flex flex-row justify-between'>
            <h4 className='rubik font-normal text-sm'>Company: <span className='font-semibold text-md'>{project.company}</span></h4>
            <h4 className='rubik font-normal text-sm'>Role: <span className='font-semibold text-md'>{project.position}</span></h4>
          </div>
        </div>
        <p className='py-3 whitespace-pre-wrap'>{project.description}</p>
        <div className='w-full flex flex-row gap-2 flex-wrap'>
          {project.tools?.map((tool, index) => (
            <div key={index} className='flex flex-row gap-2'>
              <div className='rounded-md flex items-center bg-slate-100 py-0.5 px-2.5 border border-transparent text-sm text-slate-900 transition-all shadow-sm'>
                {getStackItemByLabel(tool).icon}
                <p className='pl-2 dosis font-semibold'>{tool}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {project.link && (
          <Button href={project.link} appearance='default' startIcon={<LiaExternalLinkSquareAltSolid />}>
            Go to site
          </Button>
        )}
        <Button onClick={handleClose} appearance='ghost' color='red'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModal;
