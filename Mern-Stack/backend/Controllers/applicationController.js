const Application  = require('../Model/Application'); // Import Mongoose model

  const getAllApplicationsController = async (req, res) => {
    try {
      const applications = await Application.find();
      res.status(200).json({ applications });
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  };

const insertApplicationController = async (req, res) => {
  const { user_id, application_description } = req.body;

  try {
    const response = await Application.create({ user_id, application_description });
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const getApplicationByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Application.findById(id); 
    if (!response) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const getApplicationStatusController = async (req, res) => {
  const { userId } = req.params;

  try {
    const application = await Application.findOne({ user_id: userId }); 

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({
      username: userId, 
      status: application.application_status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateApplicationController = async (req, res) => {
  const { id } = req.params;
  const { userId, applicationStatus, description } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const response = await Application.findByIdAndUpdate(
      id, 
      { user_id: userId, application_status: applicationStatus, application_description: description }, 
      { new: true } 
    );

    if (!response) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const deleteApplicationController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing application ID" });
  }

  try {
    const result = await Application.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

module.exports = {
  getAllApplicationsController,
  getApplicationByIdController,
  insertApplicationController,
  updateApplicationController,
  deleteApplicationController,
  getApplicationStatusController,
};
