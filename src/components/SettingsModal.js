import React from 'react'
import Button from "./Button"
import { FaTimes } from "react-icons/fa";
import { useState } from "react"
import ModalContent from "./ModalContent"

const SettingsModal = ({ open, onClose, changeTheme }) => {
  const [currContent, setCurrContent] = useState("Themes")

  if (!open) return null

  return (
    <>
      <div className="modal-bg" onClick={onClose}>
        <div className="popup" onClick={(e)=> {e.stopPropagation()}}>
          <div className="modal-header"> 
            <span>Settings</span>
            <Button 
              id="modal"
              text={<FaTimes />}
              type="close"
              onClick={onClose}
            />  
          </div>
          <div className="modal-buttons">
            <Button 
              text="Themes"
              type={`modal ${(currContent === "Themes") ? "selected" : ""}`}
              onClick={() => setCurrContent("Themes")}
            />
            <Button 
              text="Help"
              type={`modal ${(currContent === "Help") ? "selected" : ""}`}
              onClick={() => setCurrContent("Help")}
            />
            <Button 
              text="About"
              type={`modal ${(currContent === "About") ? "selected" : ""}`}
              onClick={() => setCurrContent("About")}
            />
          </div>
          <ModalContent content={currContent} changeTheme={changeTheme}/>
        </div>
      </div>
    </>
  )
}

export default SettingsModal