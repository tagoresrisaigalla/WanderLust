if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env" });
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;

// Debugging line to ensure the URL is loading
if (!dbUrl) {
  console.error("Error: ATLASDB_URL is not defined in .env file");
  process.exit(1);
}

main()
  .then(() => {
    console.log("connected to DB");
    // Only call initDB after the connection is successful
    return initDB();
  })
  .catch((err) => {
    console.log("Connection Error:", err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    // Process data to add owner and ensure geometry is present
    const updatedData = initData.data.map((obj) => ({
      ...obj,
      owner: "6963985bd4163b4a4dfe55dd",
    }));

    await Listing.insertMany(updatedData);
    console.log("Database initialized with sample data");

    // Close connection after finishing the script
    mongoose.connection.close();
  } catch (err) {
    console.log("Initialization Error:", err);
  }
};
