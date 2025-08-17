import React from 'react'

const Modal = ({children}) => {
  return (
    <div
    className={`p-2 mt-2 w-full bg-white  z-1 py-4 pt-3  rounded-2xl`}>
        {children}
    </div>
  )
}

export default Modal