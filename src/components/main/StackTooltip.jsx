import { Tooltip, Whisper } from 'rsuite';

const StackTooltip = ({ icon, text, placement }) => {
  return (
    <Whisper placement={placement} controlId='control-id-hover' trigger='hover' speaker={<Tooltip>{text}</Tooltip>}>
      <>{icon}</>
    </Whisper>
  );
};

export default StackTooltip;
