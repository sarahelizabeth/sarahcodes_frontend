import { Tooltip, Whisper } from 'rsuite';

export const IconTooltip = ({ icon, text, placement }) => {
  return (
    <Whisper placement={placement} controlId='control-id-hover' trigger='hover' speaker={<Tooltip>{text}</Tooltip>}>
      <>{icon}</>
    </Whisper>
  );
};