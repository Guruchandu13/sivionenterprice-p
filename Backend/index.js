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

// BUG FIX 1: Fallback to localhost in dev when FRONTEND_URL is not set
// Previously: [] — which blocked ALL origins in development
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (server-to-server, curl, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  // BUG FIX 2: Explicitly allow methods and headers
  // Previously missing — caused preflight to reject POST/PUT with JSON body
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

// BUG FIX 3: Handle OPTIONS preflight requests explicitly
// Previously missing — caused "no Access-Control-Allow-Origin" on preflight
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

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
    await connectDB();
    await seedDefaultAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Allowed Origins (CORS): ${JSON.stringify(allowedOrigins)}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();