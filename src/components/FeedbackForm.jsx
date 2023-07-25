import Card from "./shared/Card";
import { useState } from "react";

const FeedbackForm = () => {

  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value);
    console.log(e.target.value);
  };

  return (
    <Card>
      <form>
        <h2>How would you rate your service with us?</h2>
        {/* @todo - rating select component */}
        <div className="input-group">
          <input type="text" placeholder="write a review" onChange={handleChange}/>
          <button type="submit">Send</button>
        </div>
      </form>
    </Card>
  )
}

export default FeedbackForm