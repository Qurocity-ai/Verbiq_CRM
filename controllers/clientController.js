const clientmodel = require("../models/clientmodel");

const createClient = async (req, res) => {
  try {
    const client = new clientmodel(req.body);
    await client.save();
    res.status(200).json({
      success: true,
      message: "client requirement created successfully",
      client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating client requirement",
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

module.exports = {
  createClient,
  getClient,
  getClientById,
  deleteClientById,
  updateClientById,
};
