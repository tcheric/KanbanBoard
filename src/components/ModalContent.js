import React from 'react'
import { ReactComponent as BlueWhite } from '../bluewhite.svg'
import { ReactComponent as RedWhite } from '../redwhite.svg'
import { ReactComponent as BlackBlue } from '../blackblue.svg'
import { ReactComponent as BlackSand } from '../blacksand.svg'
import { useState } from "react"

const ModalContent = ({ content, changeTheme, togglePointing, pointing }) => {
  const[appliedTheme, setAppliedTheme] = useState(() => {
    return localStorage.getItem("theme")
  })
  const[hoveredTheme, setHoveredTheme] = useState("")

  const testChangeTheme = (newTheme) => {
    console.log(newTheme) 
    changeTheme(newTheme)
    setAppliedTheme(newTheme)
  }

  const handleCheckbox = () => {
    localStorage.setItem("pointing", !pointing)
    togglePointing()
  }

  if (content === "Themes") {
    return (
      <div className="modal-content-container">
        <p>Change Theme:</p>
        <div className="theme-buttons">
          <button 
            onClick={() => testChangeTheme("Blue / White")} 
            onMouseEnter={() => setHoveredTheme("Blue / White")} 
            onMouseLeave={() => setHoveredTheme("")}>
            <BlueWhite style={{height:'25px', width: '25px'}} />
          </button>
          <button 
            onClick={() => testChangeTheme("Red / White")} 
            onMouseEnter={() => setHoveredTheme("Red / White")} 
            onMouseLeave={() => setHoveredTheme("")}>
            <RedWhite style={{height:'25px', width: '25px'}}/>
          </button>          
          <button 
            onClick={() => testChangeTheme("Black / Blue")} 
            onMouseEnter={() => setHoveredTheme("Black / Blue")} 
            onMouseLeave={() => setHoveredTheme("")}>
            <BlackBlue style={{height:'25px', width: '25px'}} />
          </button>          
          <button 
            onClick={() => testChangeTheme("Black / Sand")} 
            onMouseEnter={() => setHoveredTheme("Black / Sand")} 
            onMouseLeave={() => setHoveredTheme("")}>
            <BlackSand style={{height:'25px', width: '25px'}} />
          </button>
        </div>
        <span>{hoveredTheme === "" ? <b>{appliedTheme}</b> : hoveredTheme}</span>
        <p id="check">Pointing Mode:</p>
        <input 
          type='checkbox' 
          checked={pointing}
          value={pointing} 
          onChange={(e) => handleCheckbox()}  
        />
      </div>
    )
  } else if (content === "Help") {
    return (
      <div className="modal-content-container">
        <p>Adding Tasks:</p>
        <ul id="top">
          <li>Press the "+" button to open the add task section. </li>
          <li>Then enter a task name, and optionally a time and reminder. </li>
          <li>Press the "Save Task" button to add the task. </li>
          <li>Press the "-" button to minimise the "add task" section.</li>
        </ul>
        <p>Editing Tasks:</p>
        <ul>
          <li>Highlight a task by double-clicking anywhere on it.</li>
          <li>Rename a task by pressing its "..." button and pressing the "tick" button when done. </li>
          <li>Move a task between boards by clicking on its arrow buttons. </li>
          <li>Delete a task by pressing the "X" button.</li>
        </ul>
      </div>
    )
  } else if (content === "About") {
    return (
      <div className="modal-content-container" id="about">
        <p id="opening">A simple and practical kanban board application for tracking tasks.</p>
        <p>Kanbanooo is a serverless, single-page application made with React JS and hosted using Netlify.</p>
        <a href="https://github.com/tcheric/KanbanBoard" target="_blank" rel="noreferrer">
          Source Code
        </a>
      </div>
    )
  }
}

export default ModalContent