import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types'


const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    const response = await fetch("/api/feedback");
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);

  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch("/api/addFeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),

    });

    const data = await response.json();


    setFeedback([data, ...feedback]);
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {

      await fetch(`/api/deleteFeedback/${id}`, {
        method: "DELETE",
      });

      setFeedback(feedback.filter((item) => item._id !== id));
    }
  };

  const updateFeedback = async (id, updItem) => {

    const response = await fetch(`/api/updateFeedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();
    

    setFeedback(
      feedback.map((item) => (item._id === id ? {...item, ...data} : item))
    );

    setFeedbackEdit({
      item: {},
      edit: false,
    });

  };

  // Edit feedback
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

FeedbackProvider.propTypes = {
  children: PropTypes.node.isRequired
}



export default FeedbackContext;
