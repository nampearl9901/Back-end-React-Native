//khai báo  tên thư viện express đã cài

var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var cors = require("cors");
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { db } = require("./config/admin");

app.use(cors());

app.listen(5555, function () {
  console.log("Sever is running...");
});

//Get all
app.get("/api/ShopDC", async (req, res) => {
  const courseRef = db.collection(`minitest`);
  try {
    courseRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
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
  const ref = db.collection(`minitest`);
  const id = req.params.id;
  console.log(id);
  try {
    ref
      .doc(id)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        console.log(data);
        res.status(200).json(data);
      });
  } catch (error) {
    return res.status(500).send({ status: "fail", msg: "error" });
  }
});
//create
app.post("/api/ShopDC", async (req, res) => {
  const ref = db.collection(`minitest`);
  const data = req.body;
  try {
    ref.add(data);
    return res.status(200).send({ status: "success", msg: "Data created" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "fail", msg: "error" });
  }
});
//put by id
app.put("/api/ShopDC/:id", async (req, res) => {
  const ref = db.collection(`minitest`);
  const id = req.params.id;
  console.log(id);
  const data = req.body;
  try {
    ref.doc(id).update(data);
    return res.status(200).send({ status: "success", msg: "Data update" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "fail", msg: "error" });
  }
});

//delete by id
app.delete("/api/ShopDC/:id", async (req, res) => {
  try {
    const reqDoc = db.collection("minitest").doc(req.params.id);
    await reqDoc.delete();
    return res.status(200).send({ status: "success", msg: "deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "fail", msg: "error" });
  }
});
//Get all
app.get("/api/sanpham", async (req, res) => {
  const courseRef = db.collection(`Categories`);
  try {
    courseRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
//Get by id
app.get("/api/sanpham/:id", async (req, res) => {
  const ref = db.collection(`Categories`);
  const id = req.params.id;
  console.log(id);
  try {
    ref
      .doc(id)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        console.log(data);
        res.status(200).json(data);
      });
  } catch (error) {
    return res.status(500).send({ status: "fail", msg: "error" });
  }
});
