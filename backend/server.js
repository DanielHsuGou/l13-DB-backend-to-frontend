const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const items = require("./routes/items.js");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const URI = process.env.URI;

// mongodb site to find the link of connection string URI
const client = new MongoClient(URI);
const flix = client.db("sample_mflix").collection("users");

app.use(cors());
app.use(express.json());
app.use("/items", items);

app.get("/", async (req, res) => {
  try {
    const data = await flix.find().limit(20).toArray();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

// app.get("/", async (req, res) => {
//   try {
//     const data = await flix.findOne({
//       _id: new ObjectId("59b99db4cfa9a34dcd7885b6"),
//     });
//     res.send(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.post("/post", async (req, res) => {
  try {
    const insert = await flix.insertOne(req.body);
    console.log(insert);
    res.send("received");
  } catch (err) {
    console.log(err);
  }
});

// // test post
// app.get("/", async (req, res) => {
//   const data = await flix.findOne({ item: 1 });
//   res.send(data);
// });

// added 668d1cd380c19a8742bc56ae

app.patch("/patch/:id", async (req, res) => {
  try {
    const update = await flix.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    console.log(update);
    res.send("updated");
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const deleteItem = await flix.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    console.log(deleteItem);
    res.send("deleted");
  } catch (err) {
    console.log(err);
  }
});

// deleted 668d4493064c699feb15130e

// // test patch or delete
// app.get("/", async (req, res) => {
//   const data = await flix.findOne({
//     _id: new ObjectId("668d4493064c699feb15130e"),
//   });
//   res.send(data);
// });

// last
app.listen(PORT, async () => {
  console.log(`Server is listening on: ${PORT}`);
  console.log("Connecting to database...");
  await client.connect();
});
