import React from 'react';
import { Whisper, Tooltip } from 'rsuite';

export const DescriptionTooltip = ({ placement, text, icon }) => {
  return (
    <Whisper
      placement={placement}
      enterable
      controlId='control-id-hover'
      trigger='hover'
      speaker={
        <Tooltip>
          <blockquote className='pl-4 pr-2 py-3 my-1 border-l-4 border-gray-300 dark:border-gray-500'>
            <p className='text-xs jetbrains-mono italic font-light leading-relaxed text-gray-900 dark:text-white'>
              {text.length > 0 && <>{text}</>}
            </p>
          </blockquote>
        </Tooltip>
      }
    >
      <>{icon}</>
    </Whisper>
  );
};
