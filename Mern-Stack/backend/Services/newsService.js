const News = require("../Model/News");

/**
 * Create a new news entry.
 *
 * @param {string} newsTitle - The title of the news entry.
 * @param {string} newsContent - The content of the news entry.
 * @returns {Object} - The created news entry in JSON format.
 */
const createNews = async (newsTitle, newsContent) => {
    try {
        // Create a new news entry using the News model
        const newNews = new News({
            news_title: newsTitle,
            news_content: newsContent,
        });

        // Save the news entry to the database
        const savedNews = await newNews.save();

        // Return the created news entry in JSON format
        return savedNews.toObject();
    } catch (error) {
        console.error('Error creating news', error);
        throw new Error('Failed to create news entry');
    }
};

/**
 * Get all news entries.
 *
 * @returns {Array} - An array containing all news entries.
 */
const getAllNews = async () => {
    try {
        // Retrieve all news entries from the News model
        const news = await News.find();

        // Return the array of news entries
        return news.map(newsItem => newsItem.toObject());
    } catch (error) {
        console.error('Error fetching news entries', error);
        throw new Error('Failed to fetch news entries');
    }
};

/**
 * Get a news entry by its ID.
 *
 * @param {string} newsId - The ID of the news entry to retrieve.
 * @returns {Object|string} - The retrieved news entry object or a message indicating that the news entry was not found.
 */
const getNewsById = async (newsId) => {
    try {
        // Find a news entry by its ID
        const news = await News.findById(newsId);

        // Return the news entry if found, otherwise return a message
        if (!news) {
            return "News not found";
        }

        return news.toObject();
    } catch (error) {
        console.error('Error fetching news by ID', error);
        throw new Error('Failed to fetch news by ID');
    }
};

/**
 * Update an existing news entry.
 *
 * @param {string} newsId - The ID of the news entry to update.
 * @param {string} newsTitle - The updated title of the news entry.
 * @param {string} newsContent - The updated content of the news entry.
 * @returns {Object} - The updated news entry object.
 */
const updateNews = async (newsId, newsTitle, newsContent) => {
    try {
        // Update the news entry using the News model
        const updatedNews = await News.findByIdAndUpdate(
            newsId,
            {
                news_title: newsTitle,
                news_content: newsContent,
            },
            { new: true } // Return the updated document
        );

        if (!updatedNews) {
            return "News entry not found";
        }

        // Return the updated news entry in JSON format
        return updatedNews.toObject();
    } catch (error) {
        console.error('Error updating news entry', error);
        throw new Error('Failed to update news entry');
    }
};

/**
 * Delete a news entry by its ID.
 *
 * @param {string} newsId - The ID of the news entry to delete.
 * @returns {Object|string} - The deleted news entry or a message indicating that the news entry was not found.
 */
const deleteNews = async (newsId) => {
    try {
        // Find a news entry by its ID
        const news = await News.findById(newsId);

        // If the news entry exists, delete it and return the deleted news entry
        if (news) {
            await news.remove();
            return news.toObject();
        }

        return "News entry not found";
    } catch (error) {
        console.error('Error deleting news entry', error);
        throw new Error('Failed to delete news entry');
    }
};

// Export the functions for use in other parts of the application
module.exports = {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews,
};
