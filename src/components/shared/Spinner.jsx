import spinner from '../../assets/spinner.gif'

const Spinner = () => {
  return (
    <div>
        <img src={spinner} alt="Loading..." style={{ width: '100px', margin: 'auto', display: 'block' }} />
    </div>
  )
}

export default Spinner