import { useState, useEffect } from 'react'
import Board from './components/Board'
import Header from './components/Header'
import AddTask from './components/AddTask'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState(() => {
    // A. Called on initial state on page (re)load
    const stringTasks = localStorage.getItem("tasks")
    const tasksFromLocal = JSON.parse(stringTasks)
    if (tasksFromLocal == null) {
      return []
    } else {
      return tasksFromLocal
    }
  })
  /* This useEffect has [] as 2nd arg, so is only called after first mount/render */
  useEffect(() => {updateTasks()}, []) // does this even need to be a useeffect?

  const updateTasks = () => {
    // B. called to update state
    const stringTasks = localStorage.getItem("tasks")
    const tasksFromLocal = JSON.parse(stringTasks)
    setTasks(tasksFromLocal)
  }

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask)
  }  
  
  const addTask = newTask => {
    // C. called to add task to local
    // if tasks is null, if it isn't null - also im pretty sure local storage and usestate are alwways the same
    const newTaskInArray = (tasks == null) ? [newTask] : [...tasks, newTask]
    localStorage.setItem("tasks", JSON.stringify(newTaskInArray))
    updateTasks()
  }

  const deleteTask = id => {
    // D. called to delete task from local
    const updatedTasks = tasks.filter(item => item.id !== id)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    updateTasks()
  }

  const toggleReminder = id => {
    // E. changes reminder for item with 'id'
    const updatedTasks = tasks.map(item => {
      if (item.id === id) {
        (item.reminder = !item.reminder)
      }
      return item
    })
    console.log(tasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    updateTasks()
  }

  const sortTasks =  board => { 
    if (tasks == null) {
      return []
    } else {
      const sortedTasks = tasks.filter(item => item.board === board)
      return sortedTasks
    }
  }

  const moveBackwards = id => { 
    const updatedTasks = tasks.map(item => {
      if (item.id === id && item.board > 0) (item.board--)
      return item
    })
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    updateTasks()
  }

  const moveForward = id => {  
    const updatedTasks = tasks.map(item => {
      if (item.id === id && item.board < 2) (item.board++)
      return item
    })
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    updateTasks()
  }

  return (
    <div className='app'>
      <div className={`float-container`} data-theme={ darkMode ? 'dark' : 'light'}>
        <Header onToggle={toggleAddTask} showAdd={showAddTask}/>
        {showAddTask && <AddTask onAdd={addTask} tasks={tasks}/>}
        <Board 
          tasks={sortTasks(0)} 
          onDelete={deleteTask} 
          onToggle={toggleReminder} 
          onBackwards={moveBackwards} 
          onForward={moveForward} 
          name="To-do:"
        /> 
        <Board 
          tasks={sortTasks(1)} 
          onDelete={deleteTask} 
          onToggle={toggleReminder} 
          onBackwards={moveBackwards} 
          onForward={moveForward} 
          name="Doing:"
        /> 
        <Board 
          tasks={sortTasks(2)} 
          onDelete={deleteTask} 
          onToggle={toggleReminder} 
          onBackwards={moveBackwards} 
          onForward={moveForward} 
          name="Done:"
        />
      </div>
    </div>
  );
}
// *If showAddTask is true, then <...> will execute. "short circuit evaluation"

export default App;
