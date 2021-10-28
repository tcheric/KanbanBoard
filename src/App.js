import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([
    {
      id: 1,
      name: 'shopping',
      day: '29th October 10pm',
      reminder: false,
    },
    {
      id: 2,
      name: 'lunch',
      day: '31st October 10am',
      reminder: false,
    },
  ])

  const addTask = (newTask) => {
    console.log(newTask)
    const id = Math.floor(Math.random() * 1000)
    const newTaskWithID = { id, ...newTask }
    setTask([ ...tasks, newTaskWithID ])
    console.log(tasks)
  }

  const deleteTask = (id) => {
    setTask(tasks.filter((tasks) => tasks.id !== id))
  }

  const toggleReminder = (id) => {
    setTask(tasks.map((task) => (
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
