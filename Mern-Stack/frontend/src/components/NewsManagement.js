import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NewsManagement.css";

const NewsManagement = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ newsTitle: "", newsContent: "" });
  const [newNews, setNewNews] = useState({ newsTitle: "", newsContent: "" });

  // Fetch news on mount
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

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/news/news/${id}`);
      if (response.status === 200) {
        setNewsList((prev) => prev.filter((news) => news._id !== id));
      } else {
        console.error("Failed to delete news");
      }
    } catch (error) {
      console.error("Failed to delete news", error);
    }
  };

  // Start editing the news
  const startEdit = (news) => {
    setEditId(news._id);
    setEditData({ newsTitle: news.news_title, newsContent: news.news_content });
  };

  // Handle input changes in edit mode
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save action
  const handleSave = async () => {
    try {
      const updatedNews = {
        newsId: editId,
        newsTitle: editData.newsTitle,
        newsContent: editData.newsContent,
      };

      const response = await axios.put(
        `http://localhost:3001/api/news/updatenews/${editId}`,
        updatedNews,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.updatedNews) {
        setNewsList((prev) =>
          prev.map((news) =>
            news._id === editId
              ? { ...news, news_title: updatedNews.newsTitle, news_content: updatedNews.newsContent }
              : news
          )
        );
        setEditId(null);
        setEditData({ newsTitle: "", newsContent: "" });
      } else {
        console.error("Failed to update news", response.data);
      }
    } catch (error) {
      console.error("Error while saving news:", error);
    }
  };

  // Handle input changes for new news
  const handleNewNewsChange = (e) => {
    const { name, value } = e.target;
    setNewNews((prev) => ({ ...prev, [name]: value }));
  };

  // Handle creating new news
  const handleCreate = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/news/createnews", newNews);
      if (response.data.response) {
        setNewsList((prev) => [...prev, response.data.response]);
        setNewNews({ newsTitle: "", newsContent: "" });
      } else {
        console.error("Failed to create news");
      }
    } catch (error) {
      console.error("Error while creating news:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>News Management</h1>
      <div className="create-news">
        <h2>Create News</h2>
        <input type="text" name="newsTitle" placeholder="Title" value={newNews.newsTitle} onChange={handleNewNewsChange} />
        <textarea name="newsContent" placeholder="Content" value={newNews.newsContent} onChange={handleNewNewsChange}></textarea>
        <button onClick={handleCreate}>Create</button>
      </div>

      {newsList.length === 0 ? (
        <p>No news found.</p>
      ) : (
        <table className="user-table-Man">
          <thead>
            <tr>
              <th>News ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr key={news._id}>
                {editId === news._id ? (
                  <>
                    <td>{news._id}</td>
                    <td><input name="newsTitle" value={editData.newsTitle} onChange={handleEditChange} /></td>
                    <td><textarea name="newsContent" value={editData.newsContent} onChange={handleEditChange}></textarea></td>
                    <td>
                      <button onClick={handleSave} className="save">Save</button>
                      <button onClick={() => setEditId(null)} className="cancel">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{news._id}</td>
                    <td>{news.news_title}</td>
                    <td>{news.news_content}</td>
                    <td>
                      <button onClick={() => startEdit(news)} className="edit">Edit</button>
                      <button onClick={() => handleDelete(news._id)} className="delete">Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => navigate("/")} className="back-btn">Back</button>
    </div>
  );
};

export default NewsManagement;
