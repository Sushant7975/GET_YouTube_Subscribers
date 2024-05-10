const express = require("express");
const app = express();
const path = require("path");
const subscriberModel = require("./models/subscribers");
// const subscribers = require("./models/subscribers");

//Middleware to parse JSON bodies
app.use(express.json());

// Display the written message on the homepage to the client.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// 1. Get an array of all subscribers from the database
app.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await subscriberModel.find().select("-__v");
    res.json(subscribers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/subscribers", async (req, res) => {
  try {
    const data = req.body;
    const newSubscriber = new subscriberModel(data);
    const response = await newSubscriber.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// 2. Get an array of subscriber's name and subscribed channel from the database
app.get("/subscribers/names", async (req, res) => {
  try {
    const subscribers = await subscriberModel
      .find()
      .select("-_id -subscribedDate -__v");
    res.json(subscribers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// 3. Get a particular subscriber from the database using _id
app.get("/subscribers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await subscriberModel
      .findById(id)
      .select("-__v")
      .then((data) => {
        if (!data) {
          // When the subscriber is not found for the given id.
          error = Error(`Subscriber Not Found with the given _id: ${id}.`);
          res.status(400).json({ message: error.message });
        } else {
          res.json(data);
        }
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Handles all the unwanted requests.
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
