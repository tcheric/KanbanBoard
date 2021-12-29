import React, { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)
  const [board, setBoard] = useState(0)


  const onSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      alert('Please enter a task')
      return
    }
    onAdd({ name, day, reminder, board }) //this is an addTask object
    setName('')
    setDay('')
    setReminder(false)
    setBoard(0)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input 
          type='text' 
          placeholder='Enter Task' 
          value = {name} 
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Day and Time</label>
        <input 
          type='text' 
          placeholder='Enter Day and Time' 
          value={day} 
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Reminder</label>
        <input 
          type='checkbox' 
          checked={reminder}
          value={reminder} 
          onChange={(e) => setReminder(e.currentTarget.checked)}  
        />
      </div>
      <input 
        type='submit' value='Save Task' className='btn btn-block'
      />
    </form>
  )
}

export default AddTask