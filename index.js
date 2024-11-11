const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "3mb" }));

const authRoutes = require("./routers/authRoutes");

//End Point Call
app.use("/auth", authRoutes);

app.listen(5010, () => {
  console.log("Server is listing");
});
