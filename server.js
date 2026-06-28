require("dotenv").config();
const dns = require("dns");
// Render's default DNS resolver sometimes fails to resolve the SRV record
// required by mongodb+srv:// URIs ("querySrv ENOTFOUND _mongodb._tcp...").
// Forcing Node to use Google's public DNS servers fixes this reliably.
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


app.use("/api/menu", require("./routes/menu.routes"));
app.use("/api/reservations", require("./routes/reservation.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

app.use(notFound);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
