import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewsAndUpdates.css";

const NewsCard = ({ news }) => (
  <div className="news-card">
    <div className="news-card-header">
      <h3 className="news-card-title">{news.news_title}</h3>
    </div>
    <div className="news-card-content">
      <p>{news.news_content}</p>
    </div>
  </div>
);

const NewsAndUpdates = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/news/getnews");
        if (response.data && Array.isArray(response.data.news)) {
          setNewsList(response.data.news);
        } else {
          throw new Error("Expected an array of news");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <div className="slick-next">{'>'}</div>,
    prevArrow: <div className="slick-prev">{'<'}</div>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      <h2 className="news-heading">News & Updates</h2>
      <Slider {...settings}>
        {newsList.map((news) => (
          <NewsCard key={news.news_id} news={news} />
        ))}
      </Slider>

      {/* Separator */}
      <hr className="news-separator" />

      {/* Historical Highlight Section */}
      <div className="news-container expanded">
        <div className="news-image expanded">
          <img src="/images/History.png" alt="History" />
        </div>
        <div className="news-text expanded">
          <h2 className="news-heading">Historical Highlight</h2>
          <p className="news-content">
            Harvard and the legacy of slavery<br />
            On April 26, 2022, Harvard President Larry Bacow released the Report
            of the Committee on Harvard & the Legacy of Slavery, accepted the
            committee’s recommendations in full, and announced a historic
            commitment of $100 million to fund their implementation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsAndUpdates;
