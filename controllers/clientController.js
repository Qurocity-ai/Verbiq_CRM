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
    const clients = await clientmodel.find({});

    res.status(200).json({ success: true, count: clients.length, clients });
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

module.exports = { createClient, getClient, getClientById };
