import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onToggle, showAdd }) => {
  
  return (
    <header className='header'>
      <h1> { title } </h1>
      <Button 
        color={showAdd ? 'darkGray' : 'steelBlue'} 
        text={showAdd ? 'HIDE' : 'ADD'} 
        onClick = {() => {
          console.log('Click')
          onToggle()
        }}
      />
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
