import React from 'react';
import './Education.css';

const Education = () => {
  return (
    <div className="education-container">
      {/* Selection Process Section */}
      <section className="education-content">
        <img 
          src="../images/process.png" 
          alt="Selection Process" 
          className="education-image"
        />
        <div className="education-text">
          <h2 className="text-danger">Selection Process</h2>
          <p>After an initial shortlisting based on submitted applications, selected candidates will:</p>
          <ul>
            <li>Be invited to an initial screening interview</li>
            <li>Submit a motivation letter explaining career aspirations and future goals</li>
            <li>Be invited to a further interview with an EVEREST committee member</li>
          </ul>
        </div>
      </section>

      <hr className="separator" />

      {/* Application Process Section */}
      <section className="education-content">
        <img 
          src="../images/application.jpeg" 
          alt="Application Process" 
          className="education-image"
        />
        <div className="education-text">
          <h2 className="text-danger">Application Process</h2>
          <ul>
            <li>Apply online via the website. Only submitted applications will be considered.</li>
            <li>Applications with missing information or documents will not be processed.</li>
            <li>You can save and edit your application before submission, but no edits are allowed after submission.</li>
            <li>Decisions on next steps will be communicated via email.</li>
            <li>Avoid waiting until the deadline to submit your application.</li>
          </ul>
        </div>
      </section>

      <hr className="separator" />

      {/* Who Can Apply Section */}
      <section className="education-content ">
      <img 
          src="../images/apply.jpg" 
          alt="Who Can Apply" 
          className="education-image"
        />
        <div className="education-text">
          <h2 className="text-danger">Who Can Apply</h2>
          <p>To be eligible for acceptance, you must meet the following criteria:</p>
          <ul>
            <li>Be a high school graduate</li>
            <li>Be pursuing a degree in STEM, Economics, Finance, or Law</li>
            <li>Demonstrate financial need</li>
            <li>Maintain an excellent academic record (at or above the 70th percentile)</li>
            <li>Show drive and ambition to lead in your field</li>
          </ul>
          <button className="apply-button">
            <a className="nav-link" href="/loginUser">Apply Now</a>
          </button>
        </div>
      </section>

      <hr className="separator" />

      {/* Contact Us Section */}
      <section id="contact-us" className="contact-section">
        <div className="contact-content">
          <h2>Contact Us</h2>
          <p>
            Harvard is registered in England (No. 07268886, VAT registration No.
            890223721).
          </p>
          <p>
            <span role="img" aria-label="email">
              📧
            </span>{" "}
            <strong>Email:</strong> harvardadmission@gmail.com
          </p>
          <p>
            <span role="img" aria-label="phone">
              ☎️
            </span>{" "}
            <strong>Phone:</strong> +96176876209
          </p>
          <img
            src="harvard-logo.png"
            alt="Harvard Logo"
            className="harvard-logo"
          />
        </div>
      </section>

      {/* Social Media Section */}
      <section id="social-media" className="social-media-section">
        <div className="social-content">
          <h2>Follow Us on Instagram</h2>
          <p>Stay connected for updates and more!</p>
          <p>
            <a
              href="https://www.instagram.com/hadimattar04/"
              target="_blank"
              rel="noopener noreferrer"
            >
              📷 @harvardUniversity
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Copyright ©2025 Harvard. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Education;
