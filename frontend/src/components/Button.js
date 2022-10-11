

const Button = ({btnRef, text}) => {
  return (
    <button ref={ btnRef } className='btn btn-form'>{text}</button>
  )
}

export default Button