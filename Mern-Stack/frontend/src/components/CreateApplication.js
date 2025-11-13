import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateApplication.css";

const CreateApplication = () => {
  const [essay, setEssay] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!essay) {
      alert("Please write something before submitting!");
      return;
    }

    if (!userId) {
      alert("User not logged in. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/application/createapplication",
        {
          user_id: userId,
          application_description: essay,
          application_status: "pending",
        }
      );

      if (response.status === 200) {
        alert("Application submitted successfully!");
        setEssay("");
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit the application. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/loginUser");
  };

  const wordCount = essay.split(/\s+/).filter((word) => word).length;

  return (
    <div className="application-container">
      <div className="left-side">
        <img
          src="./images/Harvard-gif1.gif"
          alt="Motivational GIF"
          className="motivational-gif"
        />
      </div>

      <div className="right-side">
        <h1>Motivational Letter</h1>
        <p className="instructions">
          - The motivational letter should be written <b>in English</b>. <br />-{" "}
          <b>Word limit:</b> 400 - 600 words. (
          <span className="alert">
            Not adhering to the limit may result in disqualification.
          </span>
          )<br />- Use this space to showcase your{" "}
          <b>personality, academic achievements, and ambitions</b>.<br />-
          Provide specific examples and focus on{" "}
          <b>why you are a great fit for Harvard University</b>.
        </p>

        <div className="guiding-questions">
          <h2>Guiding Questions</h2>
          <ul>
            <li>
              <b>Your Background:</b> Briefly introduce yourself and significant
              achievements.
            </li>
            <li>
              <b>Your Academic Journey:</b> Share your chosen major, previous
              school(s), and grades.
            </li>
            <li>
              <b>Why Harvard?</b> Explain why you’re applying and what excites
              you about Harvard.
            </li>
            <li>
              <b>Future Aspirations:</b> Discuss how Harvard will help achieve
              your goals.
            </li>
            <li>
              <b>Personal Values and Interests:</b> Highlight extracurricular
              activities or passions.
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            className="motivational-textarea"
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Start writing your motivational letter here..."
            rows="10"
            required
          ></textarea>
          <div className="word-counter">
            <span>Word Count: {wordCount}</span>
            {wordCount > 600 && (
              <span className="word-limit-exceeded">Word limit exceeded!</span>
            )}
          </div>
          <div className="container-button">
            <button className="submit-button" onClick={handleBack}>
              Back to Login
            </button>
            <button type="submit" className="submit-button">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateApplication;
