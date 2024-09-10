import { Divider } from 'rsuite';

const MentorList = ({ projects }) => {
  return (
    <>
      {projects.map((project, index) => (
        <div key={index}>
          <div className='flex mb-6'>
            <img className='w-32 h-32' src={project.logo} />
            <div className='pl-5 flex flex-col h-32'>
              <p>{project.title}</p>
              <p className='grow'>{project.description}</p>
            </div>
          </div>
          <div className='quote-container text-justify flex flex-col'>
            <p>{project.quote}</p>
            <p className='place-self-end'>
              {'>'} {project.attribution}
            </p>
          </div>
          <Divider />
        </div>
      ))}
    </>
  );
};

export default MentorList;
