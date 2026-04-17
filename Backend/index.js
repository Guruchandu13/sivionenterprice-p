
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");
const seedDefaultAdmin = require("./config/seedAdmin");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sivion EnterpriseTech Hub API is running",
  });
});

app.use("/api/auth", require("./routes/auth.router"));
app.use("/api/projects", require("./routes/project.router"));
app.use("/api/blogs", require("./routes/blog.router"));
app.use("/api/quotes", require("./routes/quote.router"));
app.use("/api/jobs", require("./routes/job.router"));
app.use("/api/applications", require("./routes/application.router"));
app.use("/api/subscribers", require("./routes/subscriber.router"));
app.use("/api/contacts", require("./routes/contact.router"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();        // wait for DB
    await seedDefaultAdmin(); // then seed admin

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔒 Allowed Origin (CORS): ${process.env.FRONTEND_URL}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();