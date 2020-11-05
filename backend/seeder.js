import mongoose from "mongoose";
import products from "./data/products.js";
import users from "./data/users.js";
import dotenv from "dotenv";
import colors from "colors";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import connectDB from "./config/db.js";

// const mongoose = require("mongoose");
// const products = require("./data/products");
// const users = require("./data/users");
// const dotenv = require("dotenv");
// const colors = require("colors");
// const Order = require("./models/orderModel");
// const Product = require("./models/productModel");
// const User = require("./models/userModel");
// const connectDB = require("./config/db");

dotenv.config();

await connectDB();

const importData = async () => {
  console.log("importing");
  try {
    await Order.find({});
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    console.log(createdUsers);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts);
    console.log(`Data imported`.green.inverse);
    process.exit();
  } catch (error) {
    console.log("Error in importing data".red.bold);
    console.log(error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log(`Data destroyed`.green.inverse);
    process.exit();
  } catch (error) {
    console.log("Error in destroying data".red.bold);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
