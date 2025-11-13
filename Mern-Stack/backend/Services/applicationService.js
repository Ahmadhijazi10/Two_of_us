const Application = require("../Model/Application");

/**
 * Create a new application.
 */
const createApplication = async (userId, description) => {
  try {
    const newApplication = new Application({
      user_id: userId,
      application_status: "pending", // Default status
      application_description: description,
    });

    const savedApplication = await newApplication.save();
    return savedApplication.toObject();
  } catch (error) {
    console.error("Error creating application:", error);
    throw new Error("Failed to create application");
  }
};

/**
 * Get all applications.
 */
const getAllApplications = async () => {
  try {
    const applications = await Application.find();
    return applications.map(app => app.toObject());
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw new Error("Failed to fetch applications");
  }
};

/**
 * Get an application by its ID.
 */
const getApplicationById = async (id) => {
  try {
    const application = await Application.findById(id);
    if (!application) {
      return "Application not found";
    }
    return application.toObject();
  } catch (error) {
    console.error("Error fetching application by ID:", error);
    throw new Error("Failed to fetch application");
  }
};

/**
 * Get application status by user ID.
 */
const getApplicationStatusByUserId = async (userId) => {
  try {
    const application = await Application.findOne({
      user_id: userId,
    }).select("application_status");

    if (!application) {
      return { status: "not found" };
    }

    return { status: application.application_status };
  } catch (error) {
    console.error("Error retrieving application status:", error);
    throw new Error("Error retrieving application status");
  }
};

/**
 * Update an existing application.
 */
const updateApplication = async (id, userId, applicationStatus, description) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      {
        user_id: userId,
        application_status: applicationStatus,
        application_description: description,
      },
      { new: true } // Return the updated document
    );

    if (!updatedApplication) {
      return "Application not found";
    }

    return updatedApplication.toObject();
  } catch (error) {
    console.error("Error updating application:", error);
    throw new Error("Failed to update application");
  }
};

/**
 * Delete an application by its ID.
 */
const deleteApplication = async (id) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(id);
    if (!deletedApplication) {
      return "Application not found";
    }

    return deletedApplication.toObject();
  } catch (error) {
    console.error("Error deleting application:", error);
    throw new Error("Failed to delete application");
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  getApplicationStatusByUserId,
  updateApplication,
  deleteApplication,
};
