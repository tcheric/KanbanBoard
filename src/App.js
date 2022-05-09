import { useState, useEffect } from 'react'
import Board from './components/Board'
import Header from './components/Header'
import AddTask from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState(() => {
    const stringTasks = localStorage.getItem("tasks")
    const tasksFromLocal = JSON.parse(stringTasks)
    if (tasksFromLocal == null) {
      return []
    } else {
      return tasksFromLocal
    }
  })

  const [darkMode, setDarkMode] = useState(() => {
    // darkMode is a string, not a bool
    const stringDarkMode = localStorage.getItem("darkMode")
    const DarkModeFromLocal = JSON.parse(stringDarkMode)
    return DarkModeFromLocal
  })

  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      console.log(localStorage.getItem("darkMode"))
      document.body.classList.toggle("dark-mode-body");
    } else {
      document.body.classList.toggle("light-mode-body");
    }
  }, [])

  const updateTasks = () => {
    const stringTasks = localStorage.getItem("tasks")
    const tasksFromLocal = JSON.parse(stringTasks)
    setTasks(tasksFromLocal)
  }

  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", JSON.stringify(!darkMode))
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.body.classList.toggle("light-mode-body");
      document.body.classList.toggle("dark-mode-body");
      console.log('set to dark mode using classlist')
    } else {
      document.body.classList.toggle("light-mode-body");
      document.body.classList.toggle("dark-mode-body");
      console.log('set to light mode using classlist')
    }
  }  

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask)
  }  
  
  const addTask = newTask => {
    const newTaskInArray = (tasks == null) ? [newTask] : [...tasks, newTask]
    localStorage.setItem("tasks", JSON.stringify(newTaskInArray))
    updateTasks()
  }

  const editTask = (id, newName) => {
    const updatedTasks = tasks.map((item) => {
      if (item.id === id) {
        item.name = newName
      }
      return item
    })
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    updateTasks()
  }

  const deleteTask = id => {
    const updatedTasks = tasks.filter(item => item.id !== id)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    updateTasks()
  }

  const toggleReminder = id => {
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
    <div className={`float-container`}>
      <Header 
        toggleAddTask={toggleAddTask} 
        showAdd={showAddTask} 
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
      {showAddTask && <AddTask onAdd={addTask} tasks={tasks} darkMode={darkMode}/>}
      <Board 
        tasks={sortTasks(0)} 
        onDelete={deleteTask} 
        onToggle={toggleReminder} 
        onBackwards={moveBackwards} 
        onForward={moveForward} 
        onEdit={editTask}
        darkMode={darkMode}
        name="To-do:"
      /> 
      <Board 
        tasks={sortTasks(1)} 
        onDelete={deleteTask} 
        onToggle={toggleReminder} 
        onBackwards={moveBackwards} 
        onForward={moveForward} 
        onEdit={editTask}
        darkMode={darkMode}
        name="Doing:"
      /> 
      <Board 
        tasks={sortTasks(2)} 
        onDelete={deleteTask} 
        onToggle={toggleReminder} 
        onBackwards={moveBackwards} 
        onForward={moveForward} 
        onEdit={editTask}
        darkMode={darkMode}
        name="Done:"
      />
    </div>
  );
}
// *If showAddTask is true, then <...> will execute. "short circuit evaluation"

export default App;
