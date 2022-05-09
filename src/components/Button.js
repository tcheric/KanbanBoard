import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {

  return (
    <button 
    onClick ={onClick} 
    style={{ backgroundColor: color }} 
    className='btn'>
      <p>{text}</p>
    </button>
  )
}

// Button.defaultProps = {
//   color: 'steelBlue',
// }


Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
