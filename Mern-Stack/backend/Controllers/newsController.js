const News = require('../Model/News');
// Import your Mongoose model


const getAllNewsController = async (req, res) => {
    try {
        const news = await News.find(); 
        res.status(200).json({ news });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const insertNewsController = async (req, res) => {
    console.log('News Model:', News); // Should NOT be undefined

    const { newsTitle, newsContent } = req.body;

    try {
        const response = await News.create({ news_title: newsTitle, news_content: newsContent });
        res.status(200).json({ response });
    } catch (error) {
        console.error('Error inserting news:', error);
        res.status(500).json({ error: error?.message });
    }
};

const getNewsByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await News.findById(id);
        if (!response) {
            return res.status(404).json({ message: "News entry not found" });
        }
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
};

const updateNewsController = async (req, res) => {
    const { newsId, newsTitle, newsContent } = req.body;

    if (!newsId) {
        return res.status(400).json({ message: "Missing news ID" });
    }

    try {
        const updatedNews = await News.findByIdAndUpdate(
            newsId, 
            { news_title: newsTitle, news_content: newsContent },
            { new: true } 
        );

        if (!updatedNews) {
            return res.status(404).json({ message: "News entry not found" });
        }

        res.status(200).json({ updatedNews });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
};

const deleteNewsController = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Missing news ID" });
    }

    try {
        const result = await News.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "News entry not found" });
        }

        res.status(200).json({ message: "News entry deleted successfully", result });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

module.exports = {
    getAllNewsController,
    getNewsByIdController,
    insertNewsController,
    updateNewsController,
    deleteNewsController,
};
