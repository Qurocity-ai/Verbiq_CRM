const clientmodel = require("../models/clientmodel");
const jobmodel = require("../models/jobmodel");

const createClient = async (req, res) => {
  try {
    const clients = req.body; // expect an array of client objects

    if (!Array.isArray(clients) || clients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body must be a non-empty array of clients",
      });
    }

    const created = await clientmodel.insertMany(clients);

    res.status(200).json({
      success: true,
      message: `${created.length} clients created successfully`,
      clients: created,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating clients",
      error: error.message,
    });
  }
};

const getClient = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const clients = await clientmodel.find({}).skip(skip).limit(limit);
    const totalClients = await clientmodel.countDocuments();

    res.status(200).json({
      totalClients,
      page,
      totalPages: Math.ceil(totalClients / limit),
      clients,
    });
  } catch (err) {
    console.log("Error fetching Client", err);
    res.status(500).json({ success: false, err: "Internal server error" });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await clientmodel.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.status(200).json({
      success: true,
      client,
    });
  } catch (err) {
    console.log("Error fetching Client", err);
    res.status(500).json({ success: false, err: "Internal server error" });
  }
};

const deleteClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await clientmodel.findById(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    //Deleting client

    await clientmodel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
      delectedClient: client,
    });
  } catch (err) {
    console.error("Error deleting client :", err);

    res.status(500).json({
      success: false,
      message: "Error while deleting client",
      error: err.message,
    });
  }
};

const updateClientById = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedClient = await clientmodel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // Return updated doc and validate input
    );

    if (!updatedClient) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      updatedClient,
    });
  } catch (err) {
    console.error("Error updating client:", err);
    res.status(500).json({
      success: false,
      message: "Error while updating client",
      error: err.message,
    });
  }
};

const createJobs = async (req, res) => {
  try {
    const job = new jobmodel(req.body);
    await job.save();
    res.status(200).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating Job",
      error: error.message,
    });
  }
};
const getJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const jobs = await jobmodel.find({}).skip(skip).limit(limit);
    const totalJobs = await jobmodel.countDocuments();

    res.status(200).json({
      totalJobs,
      page,
      totalPages: Math.ceil(totalJobs / limit),
      jobs,
    });
  } catch (err) {
    console.log("Error fetching Jobs", err);
    res.status(500).json({ success: false, err: "Internal server error" });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await jobmodel.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (err) {
    console.log("Error fetching Job", err);
    res.status(500).json({ success: false, err: "Internal server error" });
  }
};

const deleteJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await jobmodel.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    //Deleting client

    await jobmodel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      delectedClient: job,
    });
  } catch (err) {
    console.error("Error deleting Job :", err);

    res.status(500).json({
      success: false,
      message: "Error while deleting Job",
      error: err.message,
    });
  }
};

module.exports = {
  createClient,
  getClient,
  getClientById,
  deleteClientById,
  updateClientById,
  createJobs,
  getJobs,
  getJobById,
  deleteJobById,
};
