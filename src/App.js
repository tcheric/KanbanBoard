import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  } 

  const addTask = (newTask) => {
    console.log(newTask)
    const id = Math.floor(Math.random() * 1000)
    const newTaskWithID = { id, ...newTask }
    setTasks([ ...tasks, newTaskWithID ])
    console.log(tasks)
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((tasks) => tasks.id !== id))
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => (
      task.id === id 
      ? {...task, reminder: !task.reminder} 
      : task
    )))
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

export default App;
