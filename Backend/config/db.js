const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect to MongoDB Atlas using the Stable API configuration
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverApi: {
        version: "1", // Equivalent to ServerApiVersion.v1
        strict: true,
        deprecationErrors: true,
      }
    });

    // Send a ping to confirm a successful connection
    if (connection.connection.db) {
      await connection.connection.db.admin().command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }

    console.log(`MongoDB Atlas Host: ${connection.connection.host}`);
  } catch (error) {
    console.error(`\n❌ Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
