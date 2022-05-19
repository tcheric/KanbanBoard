const Button = ({ id, type, text, onClick }) => {

  return (
    <button 
      id={id}
      onClick ={onClick} 
      className={`button ${type}`}>
        {text}
    </button>
  )
}

export default Button