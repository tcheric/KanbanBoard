import PropTypes from 'prop-types'
import Button from './Button'
import { FaPlus, FaCog, FaMinus } from "react-icons/fa";
import SettingsModal from "./SettingsModal"
import { useState } from "react"

const Header = ({ title, toggleAddTask, showAdd, theme, changeTheme }) => {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }
  
  return (
    <div className="header-container">
      <header className='header'>
        <h1> { title } </h1>
        <div className="buttons">
          <Button 
            id="add"
            text={showAdd ? <FaMinus/> : <FaPlus/>}
            type={`toggle ${showAdd ? "expanded" : ""}`}
            onClick = {() => {
              console.log('Click')
              toggleAddTask()
            }}
          />
          <Button 
            text={<FaCog/>}
            type="toggle"
            onClick = {() => {
              console.log('Click')
              toggleModal()
            }}
          />
        </div>
        <SettingsModal open={showModal} onClose={toggleModal} changeTheme={changeTheme}/>
      </header>
    </div>

  )
}

Header.defaultProps = {
  title: 'Kanban Board.',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
