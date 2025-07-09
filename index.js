const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const loginRoutes = require("./routes/loginRoutes");
const RecruiterRoutes = require("./routes/RecruiterRoutes.js");
const clientRoutes = require("./routes/clientRoutes");
const candidateRoutes = require("./routes/candidateRoutes.js");
const filterRoutes = require("./routes/filterRoutes.js");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
  })
);
app.use(express.json());
app.use("/api", loginRoutes);
app.use("/api", RecruiterRoutes);
app.use("/api", clientRoutes);
app.use("/api", candidateRoutes);
app.use("/api", filterRoutes);

app.get("/", (req, res) => {
  res.send("server and db both are running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
