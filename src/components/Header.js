import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, toggleAddTask, showAdd, toggleTheme, theme }) => {
  
  return (
    <header className='header'>
      <h1><u> { title } </u></h1>
      <div className="buttons">
        <Button 
          id="add"
          text={showAdd ? 'HIDE' : 'ADD'} 
          type={`toggle ${showAdd ? "expanded" : ""}`}
          onClick = {() => {
            console.log('Click')
            toggleAddTask()
          }}
        />
        <Button 
          text={theme === "dark" ? 'Light Mode' : 'Dark Mode'} 
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
