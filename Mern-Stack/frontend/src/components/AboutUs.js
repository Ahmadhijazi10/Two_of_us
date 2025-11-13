import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Hero Image */}
      <img src="Landing.png" alt="Harvard University" className="hero-image" />

      {/* Separator */}
      <div class="parent-container">
        <hr class="separator" />
      </div>

      {/* Overview Section */}
      <section className="about-content">
        <div className="text-section">
          <h2>Overview</h2>
          <div className="overview-questions">
            <p className="question">
              <strong>When was Harvard founded?</strong>
            </p>
            <p>
              On October 28, 1636, Harvard, the first college in the American
              colonies, was founded.
            </p>
            <p className="question">
              <strong>Who founded Harvard?</strong>
            </p>
            <p>
              John Harvard was its first major benefactor, donating half his
              estate and over 400 books.
            </p>
            <p className="question">
              <strong>Where is Harvard University located?</strong>
            </p>
            <p>
              It includes campuses in Cambridge, Longwood, and Allston,
              Massachusetts.
            </p>
            <p className="question">
              <strong>
                Is Harvard College the same as Harvard University?
              </strong>
            </p>
            <p>
              Harvard College is one of 14 Harvard Schools, specifically for
              undergraduate students.
            </p>
          </div>
        </div>
        <div className="image-section">
          <img
            src="Overview.jpeg"
            alt="Overview of Harvard"
            className="about-image"
          />
        </div>
      </section>

      {/* Separator */}
      <div class="parent-container">
        <hr class="separator" />
      </div>

      {/* The People of Harvard Section */}
      <section className="about-content">
        <div className="image-section">
          <img
            src="PeopleOfHarvard.png"
            alt="Harvard Community"
            className="about-image"
          />
        </div>
        <div className="text-section">
          <h2>The People of Harvard</h2>
          <p>
            Harvard’s community embraces diverse backgrounds, cultures, and
            perspectives.
          </p>
          <ul>
            <li>
              <strong>25,266</strong> undergraduate and graduate students
            </li>
            <li>
              <strong>19,639</strong> faculty and staff
            </li>
            <li>
              <strong>400k+</strong> alumni worldwide
            </li>
          </ul>
          <p>
            Explore more data about our community with the{" "}
            <a
              href="https://oira.harvard.edu/factbook"
              target="_blank"
              rel="noopener noreferrer"
            >
              Harvard Fact Book
            </a>
            .
          </p>
        </div>
      </section>

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
    </div>
  );
};

export default AboutUs;
