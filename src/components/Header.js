import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, toggleAddTask, showAdd, toggleDarkMode, darkMode }) => {
  
  return (
    <header className='header'>
      <h1 style={darkMode ? {color:'whitesmoke'} : {color:'black'}}><u> { title } </u></h1>
      <div className="buttons">
        <Button 
          color={showAdd ? 'darkGray' : 'steelBlue'} 
          text={showAdd ? 'HIDE' : 'ADD'} 
          onClick = {() => {
            console.log('Click')
            toggleAddTask()
          }}
        />
        <Button 
          color={darkMode ? 'steelBlue' : 'dimgrey'} 
          text={darkMode ? 'Light Mode' : 'Dark Mode'} 
          onClick = {() => {
            console.log('Click')
            toggleDarkMode()
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
