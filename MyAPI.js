var express = require("express");
var app = express();
var cors = require('cors');
const { db } = require("./config/admin");

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());

app.listen(5555, function () {
  console.log("Server is running...");
});

//Get all
app.get("/api/ShopDC", async (req, res) => {
  const courseRef = db.collection(`Categories`);
  try {
    courseRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(data);
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
//Get by id
app.get("/api/ShopDC/:id", async (req, res) => {
  const ref = db.collection(`Categories`);
  const id = req.params.id;
  console.log(id);
  try {
    ref.doc(id).get().then((snapshot) => {
      const data = snapshot.data();
      console.log(data);
      res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).send({ status: 'fail', msg: "error" });
  }

})
//create
app.post("/api/ShopDC", async (req, res) => {
  const ref = db.collection(`Categories`);
  const data = req.body;
  try {
    ref.add(data);
    return res.status(200).send({ status: 'success', msg: 'Data created' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'fail', msg: "error" });
  }
});
//put by id
app.put("/api/ShopDC/:id", async (req, res) => {
  const ref = db.collection(`Categories`);
  const id = req.params.id;
  console.log(id);
  const data = req.body;
  try {
    ref.doc(id).update(data);
    return res.status(200).send({ status: 'success', msg: 'Data update' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'fail', msg: "error" });
  }
});

//delete by id
app.delete("/api/ShopDC/:id", async (req, res) => {
  try {
    const reqDoc = db.collection("Categories").doc(req.params.id);
    await reqDoc.delete();
    return res.status(200).send({ status: 'success', msg: 'deleted' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'fail', msg: "error" });
  }
});