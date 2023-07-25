import PropTypes from 'prop-types'
import { FaTimes } from 'react-icons/fa'
import Card from './shared/Card.jsx';


const FeedbackItem = ({item, handleDelete}) => {



    return (
        <Card reverse={true}>
            <div className="num-display">{item.rating}</div>
             <button className='close' onClick={() => handleDelete(item.id)}>
                <FaTimes color='purple'/>
             </button>
            <div className="text-display">{item.text}</div>

        </Card>
  )
}

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired
}

export default FeedbackItem