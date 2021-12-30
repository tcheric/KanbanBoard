import { useState, useEffect } from 'react'
import Board from './components/Board'
import Header from './components/Header'
import AddTask from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {fetchTasks()}, [])

  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const tasksFromServer = await res.json()
    setTasks(tasksFromServer)
  }

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask)
  }  
  
  const addTask = async (newTask) => {
    console.log(newTask)
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask),
    })
    const data = await res.json()
    console.log(data)
    fetchTasks()
  }

  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    fetchTasks()
  }

  const toggleReminder = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`) // by default GET
    const item = await res.json()
    const toggledItem = {...item, reminder: !item.reminder}

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toggledItem),
    })
    fetchTasks()
  }

  const sortTasks = ( board ) => { 
    let sortedTasks = []
    tasks.forEach(task => {
      if (task.board === board) sortedTasks.push(task)
    })
    return sortedTasks
  }

  const moveBackwards = async(id) => { 
    const res = await fetch(`http://localhost:5000/tasks/${id}`) // by default GET
    const item = await res.json()
    const movedItem = (item.board > 0) ? {...item, board: (item.board - 1)} : item

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movedItem),
    })
    fetchTasks()
  }

  const moveForward = async(id) => {  
    const res = await fetch(`http://localhost:5000/tasks/${id}`) // by default GET
    const item = await res.json()
    const movedItem = (item.board < 2) ? {...item, board: (item.board + 1)} : item
    
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movedItem),
    })
    fetchTasks()
  }

  return (
    <div className={`float-container Parent`}>
      <Header onToggle={toggleAddTask} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      <Board 
        tasks={sortTasks(0)} 
        onDelete={deleteTask} 
        onToggle={toggleReminder} 
        onBackwards={moveBackwards} 
        onForward={moveForward} 
        name="To-do"
      /> 
      <Board 
        tasks={sortTasks(1)} 
        onDelete={deleteTask} 
        onToggle={toggleReminder} 
        onBackwards={moveBackwards} 
        onForward={moveForward} 
        name="Doing"
      /> 
      <Board 
        tasks={sortTasks(2)} 
        onDelete={deleteTask} 
        onToggle={toggleReminder} 
        onBackwards={moveBackwards} 
        onForward={moveForward} 
        name="Done"/>     
    </div>
  );
}
// *If showAddTask is true, then <...> will execute. "short circuit evaluation"

export default App;
