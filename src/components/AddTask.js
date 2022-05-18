import React, { useState } from 'react'

const AddTask = ({ onAdd, tasks, darkMode }) => {
  const [name, setName] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)
  const board = 0

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      alert('Please enter a task')
      return
    }
    // calculate new id
    let unusedID = 0
    if (!(tasks == null)) {
      for (const item of tasks) {
        if (item.id > unusedID) (unusedID = item.id)
      }
      unusedID++
    }
    // assign id
    const id = unusedID

    onAdd({ name, day, reminder, board, id }) //this is an addTask object
    setName('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className={`form-control ${darkMode ? "dark" : "light"}`}>
        <label>Task:</label>
        <input 
          type='text' 
          placeholder=' Enter Task' 
          value = {name} 
          onChange={(e) => setName(e.target.value)}
          className={`input ${darkMode ? "dark" : "light"}`}
        />
      </div>
      <div className={`form-control ${darkMode ? "dark" : "light"}`}>
        <label>Time:</label>
        <input 
          type='text' 
          placeholder=' Enter Time' 
          value={day} 
          onChange={(e) => setDay(e.target.value)}
          className={`input ${darkMode ? "dark" : "light"}`}
        />
      </div>
      {/* <div className='form-control form-control-check'> */}
      <div className={`form-control ${darkMode ? "dark" : "light"} form-control-check`}>
        <label>Reminder:</label>
        <input 
          type='checkbox' 
          checked={reminder}
          value={reminder} 
          onChange={(e) => setReminder(e.currentTarget.checked)}  
        />
      </div>
      <input 
        type='submit' value='Save Task' className={`submit-input`}
      />
    </form>
  )
}

export default AddTask