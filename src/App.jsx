import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import { FeedbackProvider } from "./context/FeedbackContext";
import AboutIconLink from "./components/AboutIconLink";
import FeedbackData from "./data/FeedbackData.js";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  return (
    <>
      <FeedbackProvider>
        <Router>
          <Header />

          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <FeedbackForm handleAdd={addFeedback} />
                    <FeedbackStats />
                    <FeedbackList handleDelete={deleteFeedback} />
                  </>
                }
              ></Route>
              <Route path="/about" element={<AboutPage />} />
            </Routes>
            <AboutIconLink />
          </div>
        </Router>
      </FeedbackProvider>
    </>
  );
}

export default App;
