const mongoose = require('mongoose');

// Define the News schema
const newsSchema = new mongoose.Schema({
    // Define the "news_title" field
    news_title: {
        type: String,
        required: true, 
    },

    // Define the "news_content" field
    news_content: {
        type: String,
        required: true, // Make content required
    },
}, {
    collection: 'news', // Set collection name to "news"
    timestamps: false,  // Disable auto-created timestamps (createdAt, updatedAt)
});

// Export the News model
module.exports = mongoose.model('News', newsSchema);
