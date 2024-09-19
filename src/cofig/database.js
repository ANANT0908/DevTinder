const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Anant:pXuJQJB6nkIoRjbT@namastenode.vinvs.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
