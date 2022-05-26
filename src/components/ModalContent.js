import React from 'react'

const ModalContent = ({ content }) => {
  if (content === "Themes") {
    return (
      <div className="modal-content-container">
        <p>Change Theme</p>
        <div className="theme-buttons">

        </div>
        <p>Pointing Mode</p>
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
        <p id="opening">A simple and useful kanban board app for tracking tasks.</p>
        <p>Kanbanooo is a serverless, single-page application made with React JS and hosted using Netlify.</p>
        <a href="https://github.com/tcheric/KanbanBoard" target="_blank">Source Code</a>
      </div>
    )
  }
}

export default ModalContent