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

  const [theme, setTheme] = useState(() => {
    // GET THEME FROM LOCALSTORAGE USER OBJECT
    return localStorage.getItem("theme")
  })

  useEffect(() => {
    let theme = localStorage.getItem("theme")
    changeTheme(theme)
  }, [])

  const updateTasks = () => {
    const stringTasks = localStorage.getItem("tasks")
    const tasksFromLocal = JSON.parse(stringTasks)
    setTasks(tasksFromLocal)
  }

  const changeTheme = newTheme => {
    document.documentElement.setAttribute("data-theme", newTheme)
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme) 
    if (newTheme === "Black / Sand" || newTheme === "Black / Blue" ) {
      document.body.classList.remove("light-mode-body");
      document.body.classList.add("dark-mode-body");
    } else if (newTheme === "Blue / White" || newTheme === "Red / White" ) {
      document.body.classList.remove("dark-mode-body");
      document.body.classList.add("light-mode-body");
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
        changeTheme={changeTheme}
      />
      {showAddTask && <AddTask onAdd={addTask} tasks={tasks} darkMode={theme}/>}
      <Board 
        tasks={sortTasks(0)} 
        onDelete={deleteTask} 
        onToggle={toggleReminder} 
        onBackwards={moveBackwards} 
        onForward={moveForward} 
        onEdit={editTask}
        name="To-do:"
      /> 
      <Board 
        tasks={sortTasks(1)} 
        onDelete={deleteTask} 
        onToggle={toggleReminder} 
        onBackwards={moveBackwards} 
        onForward={moveForward} 
        onEdit={editTask}
        name="Doing:"
      /> 
      <Board 
        tasks={sortTasks(2)} 
        onDelete={deleteTask} 
        onToggle={toggleReminder} 
        onBackwards={moveBackwards} 
        onForward={moveForward} 
        onEdit={editTask}
        name="Done:"
      />
    </div>
  );
}
// *If showAddTask is true, then <...> will execute. "short circuit evaluation"

export default App;
