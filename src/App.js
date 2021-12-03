import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
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
    //setTasks(tasks.filter((tasks) => tasks.id !== id))
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

    // setTasks(tasks.map((task) => (
    //   task.id === id 
    //   ? {...task, reminder: !task.reminder} 
    //   : task
    // )))
  }

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask)
  }  

  return (
    <div className="container">
      <Header onToggle={toggleAddTask} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
      ) : (
        'No tasks'
      )}
    </div>
  );
}

// *If showAddTask is true, then <...> will execute. "short circuit evaluation"

export default App;
