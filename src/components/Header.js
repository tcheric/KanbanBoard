import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, toggleAddTask, showAdd, toggleTheme, darkMode }) => {
  
  return (
    <header className='header'>
      <h1><u> { title } </u></h1>
      <div className="buttons">
        <Button 
          text={showAdd ? 'HIDE' : 'ADD'} 
          type="toggle"
          onClick = {() => {
            console.log('Click')
            toggleAddTask()
          }}
        />
        <Button 
          text={darkMode ? 'Light Mode' : 'Dark Mode'} 
          type="toggle"
          onClick = {() => {
            console.log('Click')
            toggleTheme()
          }}
        />
      </div>
    </header>
  )
}

Header.defaultProps = {
  title: 'Kanban Board.',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
