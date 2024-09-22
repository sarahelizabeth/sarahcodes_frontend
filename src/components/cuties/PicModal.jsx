import React, { useEffect } from 'react'
import { Modal } from 'rsuite'

export const PicModal = ({ picData, isOpen, handleClose }) => {
  console.log(picData)
  return (
    <Modal overflow={false} open={isOpen} onClose={handleClose} className='jetbrains-mono'>
      <div className='flex'>
        {/* <img src={picData.image} /> */}
      </div>
    </Modal>
  )
}
