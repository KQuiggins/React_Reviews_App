import PropTypes from 'prop-types';
import FeedbackItem from './FeedbackItem';

const FeedbackList = ({feedback, handleDelete}) => {
    if (!feedback || feedback.length === 0) {
        return <div>No feedback items</div>
    }
  return (
    <div className='feedback-list'>
        {feedback.map((item) => (
            <FeedbackItem
                key={item.id}
                item={item}
                handleDelete={handleDelete}
            />
        ))}
    </div>
  )
}

FeedbackList.propTypes = {
    handleDelete: PropTypes.func.isRequired,
    feedback: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        })
    )
}

export default FeedbackList