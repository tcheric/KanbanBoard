import React from 'react'

const ModalContent = ({ content }) => {
  if (content === "Themes") {
    return (
      <div className="modal-content-container">
        Themes
      </div>
    )
  } else if (content === "Help") {
    return (
      <div className="modal-content-container">
        Help
      </div>
    )
  } else if (content === "About") {
    return (
      <div className="modal-content-container">
        About
      </div>
    )
  }
}

export default ModalContent